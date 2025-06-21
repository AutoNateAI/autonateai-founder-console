
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    // Get initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!isMounted) return;
      
      console.log('Initial session:', !!session);
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        localStorage.setItem('supabase.auth.token', JSON.stringify(session));
        await checkAdminRole(session.user.id);
      } else {
        localStorage.removeItem('supabase.auth.token');
        setIsAdmin(false);
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!isMounted) return;
        
        console.log('Auth state change:', event, !!session);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          localStorage.setItem('supabase.auth.token', JSON.stringify(session));
          await checkAdminRole(session.user.id);
        } else {
          localStorage.removeItem('supabase.auth.token');
          setIsAdmin(false);
          setLoading(false);
        }
      }
    );

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const checkAdminRole = async (userId: string) => {
    try {
      console.log('Checking admin role for user:', userId);
      
      // First check if we have a cached admin status
      const cachedAdminStatus = localStorage.getItem('user.isAdmin');
      if (cachedAdminStatus === 'true') {
        setIsAdmin(true);
        console.log('User is admin (from cache)');
        setLoading(false);
        return;
      }
      
      // If not in cache or cache is false, check from the database
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .eq('role', 'admin')
        .maybeSingle();
      
      console.log('Admin role check result:', { data, error });
      
      if (!error && data) {
        setIsAdmin(true);
        // Store admin status in localStorage
        localStorage.setItem('user.isAdmin', 'true');
        console.log('User is admin');
      } else {
        setIsAdmin(false);
        // Clear admin status from localStorage
        localStorage.setItem('user.isAdmin', 'false');
        console.log('User is not admin');
      }
    } catch (error) {
      console.error('Error checking admin role:', error);
      setIsAdmin(false);
      localStorage.setItem('user.isAdmin', 'false');
    } finally {
      // Always set loading to false after checking admin role
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    localStorage.removeItem('supabase.auth.token');
    localStorage.removeItem('user.isAdmin'); // Clear admin status from localStorage
    setIsAdmin(false);
    
    if (error) throw error;
    navigate('/');
  };

  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });
    
    if (error) throw error;
  };

  const value = {
    user,
    session,
    loading,
    isAdmin,
    signIn,
    signOut,
    signUp,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
