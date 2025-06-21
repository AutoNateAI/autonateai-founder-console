
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Users, 
  Network, 
  Calendar, 
  Kanban, 
  LogOut, 
  TrendingUp, 
  Target,
  Zap,
  BarChart3
} from 'lucide-react';

interface DashboardModule {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  path: string;
  color: string;
  stats?: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/');
      return;
    }

    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('loginTime');
    navigate('/');
  };

  const modules: DashboardModule[] = [
    {
      id: 'strategic-docs',
      title: 'Strategic Documents',
      description: 'Core business plans, GTM strategies, and operational docs',
      icon: FileText,
      path: '/strategic-docs',
      color: 'from-blue-500 to-cyan-500',
      stats: '5 Documents'
    },
    {
      id: 'lead-management',
      title: 'Lead Management',
      description: 'Track, manage, and analyze potential clients',
      icon: Users,
      path: '/lead-management',
      color: 'from-green-500 to-emerald-500',
      stats: 'Pipeline Active'
    },
    {
      id: 'network-map',
      title: 'Network Map',
      description: 'Visual representation of client and lead relationships',
      icon: Network,
      path: '/network-map',
      color: 'from-purple-500 to-pink-500',
      stats: 'Beta Version'
    },
    {
      id: 'team-timeline',
      title: 'Team Timeline',
      description: 'Project milestones and team coordination',
      icon: Calendar,
      path: '/team-timeline',
      color: 'from-orange-500 to-red-500',
      stats: 'On Track'
    },
    {
      id: 'kanban-board',
      title: 'Kanban Board',
      description: 'Task management and workflow organization',
      icon: Kanban,
      path: '/kanban-board',
      color: 'from-violet-500 to-purple-500',
      stats: 'Active Board'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      {/* Header */}
      <div className="backdrop-blur-xl bg-white/5 border-b border-white/10 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-cyan-400 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">AutoNateAI Console</h1>
                <p className="text-gray-300 text-sm">Founder's Command Center</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-white font-medium">Welcome, Admin</p>
                <p className="text-gray-300 text-sm">
                  {currentTime.toLocaleDateString()} • {currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </p>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-white/20 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { icon: TrendingUp, label: 'Monthly Growth', value: '+127%', color: 'text-green-400' },
            { icon: Users, label: 'Active Leads', value: '23', color: 'text-blue-400' },
            { icon: Target, label: 'Conversion Rate', value: '34%', color: 'text-purple-400' },
            { icon: BarChart3, label: 'Revenue Pipeline', value: '$45K', color: 'text-cyan-400' }
          ].map((stat, index) => (
            <Card key={index} className="backdrop-blur-xl bg-white/10 border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">{stat.label}</p>
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Module Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <Card 
              key={module.id} 
              className="backdrop-blur-xl bg-white/10 border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 cursor-pointer group"
              onClick={() => navigate(module.path)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 bg-gradient-to-br ${module.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <module.icon className="w-6 h-6 text-white" />
                  </div>
                  {module.stats && (
                    <span className="text-xs px-2 py-1 bg-white/20 text-gray-200 rounded-full">
                      {module.stats}
                    </span>
                  )}
                </div>
                <CardTitle className="text-white group-hover:text-gray-200 transition-colors">
                  {module.title}
                </CardTitle>
                <CardDescription className="text-gray-300">
                  {module.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className={`w-full bg-gradient-to-r ${module.color} hover:opacity-90 text-white border-0 shadow-lg transition-all duration-300`}
                >
                  Access Module
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <Card className="mt-8 backdrop-blur-xl bg-white/10 border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
            <CardDescription className="text-gray-300">
              Latest updates across all modules
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: 'New lead added', module: 'Lead Management', time: '2 hours ago', color: 'text-green-400' },
                { action: 'Strategic doc updated', module: 'Documents', time: '4 hours ago', color: 'text-blue-400' },
                { action: 'Kanban board modified', module: 'Project Management', time: '1 day ago', color: 'text-purple-400' },
                { action: 'Timeline milestone reached', module: 'Team Timeline', time: '2 days ago', color: 'text-orange-400' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-white/10 last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${activity.color.replace('text-', 'bg-')}`}></div>
                    <div>
                      <p className="text-white text-sm">{activity.action}</p>
                      <p className="text-gray-400 text-xs">{activity.module}</p>
                    </div>
                  </div>
                  <span className="text-gray-400 text-xs">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
