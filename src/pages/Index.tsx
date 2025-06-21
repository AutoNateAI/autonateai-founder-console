
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-4 md:p-8">
      <div className="max-w-4xl w-full bg-black/30 backdrop-blur-md rounded-xl p-6 md:p-10 border border-white/10 shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">AutoNateAI</h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-white/80 mb-2">Founder's Console</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            AI-Powered Content Strategy Management Platform
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <FeatureCard 
            title="Content Strategy" 
            description="AI-driven content plans tailored to your audience and business goals" 
            icon="📊" 
          />
          <FeatureCard 
            title="Performance Analytics" 
            description="Track engagement metrics and optimize your content strategy in real-time" 
            icon="📈" 
          />
          <FeatureCard 
            title="Client Management" 
            description="Seamless client onboarding and collaboration tools" 
            icon="👥" 
          />
        </div>
        
        <div className="flex flex-col items-center justify-center space-y-4">
          <Link to="/login">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-8 py-6 text-lg rounded-md">
              Login to Console
            </Button>
          </Link>
          <p className="text-white/60 text-sm">
            Access your dashboard to manage clients and content strategies
          </p>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ title, description, icon }: { title: string; description: string; icon: string }) => (
  <div className="bg-white/5 rounded-lg p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:bg-white/10">
    <div className="text-3xl mb-3">{icon}</div>
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-white/70 text-sm leading-relaxed">{description}</p>
  </div>
);

export default Index;
