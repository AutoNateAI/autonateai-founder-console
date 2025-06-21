
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TeamTimeline = () => {
  const navigate = useNavigate();

  const milestones = [
    {
      id: 1,
      title: 'MVP Development Complete',
      description: 'Core AI content generation system and Telegram bot integration',
      date: '2025-01-15',
      status: 'completed',
      team: 'Engineering',
      progress: 100
    },
    {
      id: 2,
      title: 'Beta Client Onboarding',
      description: 'First 10 beta clients testing the service',
      date: '2025-02-01',
      status: 'completed',
      team: 'Sales & Support',
      progress: 100
    },
    {
      id: 3,
      title: 'eRank Integration',
      description: 'Deep integration with eRank for Etsy market analysis',
      date: '2025-02-15',
      status: 'in-progress',
      team: 'Engineering',
      progress: 75
    },
    {
      id: 4,
      title: 'Automated Outreach System',
      description: 'Instagram automation for lead generation',
      date: '2025-03-01',
      status: 'in-progress',
      team: 'Marketing Tech',
      progress: 45
    },
    {
      id: 5,
      title: 'First Revenue Milestone',
      description: 'Achieve $25,000 MRR with 50+ clients',
      date: '2025-03-15',
      status: 'upcoming',
      team: 'Business',
      progress: 0
    },
    {
      id: 6,
      title: 'Team Expansion',
      description: 'Hire Account Manager and Content Strategist',
      date: '2025-04-01',
      status: 'upcoming',
      team: 'HR',
      progress: 0
    },
    {
      id: 7,
      title: 'Platform Expansion',
      description: 'Add TikTok and Pinterest content generation',
      date: '2025-04-15',
      status: 'upcoming',
      team: 'Product',
      progress: 0
    },
    {
      id: 8,
      title: 'Scale to 100 Clients',
      description: 'Reach 100 recurring clients and $70K MRR',
      date: '2025-05-30',
      status: 'upcoming',
      team: 'Business',
      progress: 0
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-yellow-400" />;
      case 'upcoming':
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-green-400';
      case 'in-progress':
        return 'border-yellow-400';
      case 'upcoming':
        return 'border-gray-400';
      default:
        return 'border-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <Button
            onClick={() => navigate('/dashboard')}
            variant="outline"
            className="border-white/20 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-white mb-2">Team Timeline</h1>
          <p className="text-gray-300">Project milestones and team coordination</p>
        </div>

        {/* Timeline Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="backdrop-blur-xl bg-white/10 border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Completed</p>
                  <p className="text-2xl font-bold text-green-400">2</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-white/10 border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">In Progress</p>
                  <p className="text-2xl font-bold text-yellow-400">2</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-white/10 border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Upcoming</p>
                  <p className="text-2xl font-bold text-gray-400">4</p>
                </div>
                <AlertCircle className="w-8 h-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-white/10 border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">On Track</p>
                  <p className="text-2xl font-bold text-blue-400">87%</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Timeline */}
        <Card className="backdrop-blur-xl bg-white/10 border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Project Timeline</CardTitle>
            <CardDescription className="text-gray-300">
              Key milestones and deliverables for AutoNateAI development
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-400 to-cyan-400 opacity-50"></div>
              
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={milestone.id} className="relative flex items-start space-x-6">
                    {/* Timeline Node */}
                    <div className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-2 ${getStatusColor(milestone.status)} bg-slate-900/80 backdrop-blur-sm`}>
                      {getStatusIcon(milestone.status)}
                    </div>

                    {/* Milestone Content */}
                    <div className="flex-1 min-w-0">
                      <Card className="backdrop-blur-xl bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-white mb-1">
                                {milestone.title}
                              </h3>
                              <p className="text-gray-300 text-sm mb-2">
                                {milestone.description}
                              </p>
                              <div className="flex items-center space-x-4 text-xs text-gray-400">
                                <span className="flex items-center">
                                  <Calendar className="w-3 h-3 mr-1" />
                                  {milestone.date}
                                </span>
                                <span className="px-2 py-1 bg-white/10 rounded-full">
                                  {milestone.team}
                                </span>
                              </div>
                            </div>
                            <div className="text-right ml-4">
                              <div className="text-sm font-medium text-white mb-1">
                                {milestone.progress}%
                              </div>
                              <div className="w-20 h-2 bg-white/20 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-purple-400 to-cyan-400 transition-all duration-500"
                                  style={{ width: `${milestone.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>

                          {milestone.status === 'in-progress' && (
                            <div className="border-t border-white/10 pt-4">
                              <div className="text-xs text-gray-400 mb-2">Current Focus:</div>
                              <div className="text-sm text-gray-300">
                                {milestone.id === 3 && "Finalizing API endpoints and data parsing algorithms"}
                                {milestone.id === 4 && "Building Instagram engagement automation and compliance systems"}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Assignments */}
        <Card className="backdrop-blur-xl bg-white/10 border-white/20 mt-8">
          <CardHeader>
            <CardTitle className="text-white">Team Assignments</CardTitle>
            <CardDescription className="text-gray-300">
              Current workload and responsibilities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  team: 'Engineering',
                  lead: 'Alex Chen',
                  active: 2,
                  upcoming: 1,
                  focus: 'eRank Integration & Platform Development'
                },
                {
                  team: 'Sales & Support',
                  lead: 'Sarah Johnson',
                  active: 1,
                  upcoming: 0,
                  focus: 'Client Success & Beta Feedback'
                },
                {
                  team: 'Marketing Tech',
                  lead: 'Mike Rodriguez',
                  active: 1,
                  upcoming: 0,
                  focus: 'Instagram Automation System'
                },
                {
                  team: 'Business',
                  lead: 'Founder',
                  active: 0,
                  upcoming: 2,
                  focus: 'Revenue Growth & Strategic Planning'
                },
                {
                  team: 'Product',
                  lead: 'TBD',
                  active: 0,
                  upcoming: 1,
                  focus: 'Multi-Platform Content Strategy'
                },
                {
                  team: 'HR',
                  lead: 'Founder',
                  active: 0,
                  upcoming: 1,
                  focus: 'Team Expansion & Onboarding'
                }
              ].map((team, index) => (
                <Card key={index} className="backdrop-blur-xl bg-white/5 border-white/10">
                  <CardContent className="p-4">
                    <h4 className="text-white font-semibold mb-2">{team.team}</h4>
                    <p className="text-gray-400 text-sm mb-3">Lead: {team.lead}</p>
                    <div className="flex items-center space-x-4 text-xs mb-3">
                      <span className="text-yellow-400">Active: {team.active}</span>
                      <span className="text-gray-400">Upcoming: {team.upcoming}</span>
                    </div>
                    <p className="text-gray-300 text-xs">{team.focus}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeamTimeline;
