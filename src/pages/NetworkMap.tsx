
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Network, Users, TrendingUp, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NetworkMap = () => {
  const navigate = useNavigate();

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
          <h1 className="text-3xl font-bold text-white mb-2">Network Map</h1>
          <p className="text-gray-300">Visual representation of client and lead relationships</p>
        </div>

        {/* Network Visualization */}
        <Card className="backdrop-blur-xl bg-white/10 border-white/20 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Network className="w-6 h-6 mr-2" />
              Market Relationship Graph
            </CardTitle>
            <CardDescription className="text-gray-300">
              Interactive visualization of your Etsy seller network
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative h-96 bg-gradient-to-br from-slate-800/50 to-purple-800/50 rounded-lg overflow-hidden border border-white/10">
              {/* SVG Network Mockup */}
              <svg className="w-full h-full" viewBox="0 0 800 400">
                {/* Connection Lines */}
                <defs>
                  <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.6" />
                  </linearGradient>
                </defs>
                
                {/* Main hub connections */}
                <line x1="400" y1="200" x2="200" y2="100" stroke="url(#connectionGradient)" strokeWidth="2" />
                <line x1="400" y1="200" x2="600" y2="100" stroke="url(#connectionGradient)" strokeWidth="2" />
                <line x1="400" y1="200" x2="150" y2="250" stroke="url(#connectionGradient)" strokeWidth="2" />
                <line x1="400" y1="200" x2="650" y2="250" stroke="url(#connectionGradient)" strokeWidth="2" />
                <line x1="400" y1="200" x2="300" y2="320" stroke="url(#connectionGradient)" strokeWidth="2" />
                <line x1="400" y1="200" x2="500" y2="320" stroke="url(#connectionGradient)" strokeWidth="2" />
                
                {/* Secondary connections */}
                <line x1="200" y1="100" x2="150" y2="250" stroke="url(#connectionGradient)" strokeWidth="1" opacity="0.4" />
                <line x1="600" y1="100" x2="650" y2="250" stroke="url(#connectionGradient)" strokeWidth="1" opacity="0.4" />
                <line x1="300" y1="320" x2="500" y2="320" stroke="url(#connectionGradient)" strokeWidth="1" opacity="0.4" />

                {/* Central Hub Node */}
                <circle cx="400" cy="200" r="20" fill="url(#connectionGradient)" className="animate-pulse" />
                <text x="400" y="230" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                  AutoNateAI
                </text>

                {/* Client Nodes */}
                <circle cx="200" cy="100" r="12" fill="#10B981" />
                <text x="200" y="85" textAnchor="middle" fill="#10B981" fontSize="10">
                  BohoDecor
                </text>

                <circle cx="600" cy="100" r="12" fill="#10B981" />
                <text x="600" y="85" textAnchor="middle" fill="#10B981" fontSize="10">
                  VintageJewels
                </text>

                <circle cx="150" cy="250" r="10" fill="#F59E0B" />
                <text x="150" y="270" textAnchor="middle" fill="#F59E0B" fontSize="10">
                  CraftedHome
                </text>

                <circle cx="650" cy="250" r="10" fill="#F59E0B" />
                <text x="650" y="270" textAnchor="middle" fill="#F59E0B" fontSize="10">
                  ArtisanWood
                </text>

                {/* Prospect Nodes */}
                <circle cx="300" cy="320" r="8" fill="#6B7280" />
                <text x="300" y="340" textAnchor="middle" fill="#6B7280" fontSize="9">
                  ModernCraft
                </text>

                <circle cx="500" cy="320" r="8" fill="#6B7280" />
                <text x="500" y="340" textAnchor="middle" fill="#6B7280" fontSize="9">
                  NaturalLiving
                </text>

                {/* Influence indicators */}
                <circle cx="200" cy="100" r="25" fill="none" stroke="#10B981" strokeWidth="1" opacity="0.3" className="animate-pulse" />
                <circle cx="600" cy="100" r="25" fill="none" stroke="#10B981" strokeWidth="1" opacity="0.3" className="animate-pulse" />
              </svg>

              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-3 text-xs">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-white">Active Clients</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-white">Qualified Leads</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                    <span className="text-white">Prospects</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Network Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="backdrop-blur-xl bg-white/10 border-white/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center text-lg">
                <Users className="w-5 h-5 mr-2 text-blue-400" />
                Network Size
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-400 mb-1">47</div>
              <p className="text-gray-300 text-sm">Total connections</p>
              <div className="text-xs text-gray-400 mt-2">
                12 clients • 18 leads • 17 prospects
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-white/10 border-white/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center text-lg">
                <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                Influence Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400 mb-1">8.7</div>
              <p className="text-gray-300 text-sm">Network influence rating</p>
              <div className="text-xs text-gray-400 mt-2">
                Based on referral potential
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-white/10 border-white/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center text-lg">
                <Target className="w-5 h-5 mr-2 text-purple-400" />
                Conversion Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-400 mb-1">34%</div>
              <p className="text-gray-300 text-sm">Lead to client conversion</p>
              <div className="text-xs text-gray-400 mt-2">
                Above industry average
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Network Analysis */}
        <Card className="backdrop-blur-xl bg-white/10 border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Network Analysis</CardTitle>
            <CardDescription className="text-gray-300">
              Key insights from your relationship mapping
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-semibold mb-3">High-Value Connectors</h4>
                  <div className="space-y-2">
                    {[
                      { name: 'BohoDecor', influence: 'High', referrals: 3 },
                      { name: 'VintageJewels', influence: 'Medium', referrals: 2 },
                      { name: 'CraftedHome', influence: 'Medium', referrals: 1 }
                    ].map((connector, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div>
                          <p className="text-white text-sm font-medium">{connector.name}</p>
                          <p className="text-gray-400 text-xs">Influence: {connector.influence}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-cyan-400 text-sm font-medium">{connector.referrals}</p>
                          <p className="text-gray-400 text-xs">referrals</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-3">Network Opportunities</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-white/5 rounded-lg">
                      <p className="text-white text-sm mb-1">Cross-niche Expansion</p>
                      <p className="text-gray-400 text-xs">Identify connections between home decor and jewelry niches</p>
                    </div>
                    <div className="p-3 bg-white/5 rounded-lg">
                      <p className="text-white text-sm mb-1">Referral Program</p>
                      <p className="text-gray-400 text-xs">Implement structured referral incentives for high-influence clients</p>
                    </div>
                    <div className="p-3 bg-white/5 rounded-lg">
                      <p className="text-white text-sm mb-1">Community Building</p>
                      <p className="text-gray-400 text-xs">Create exclusive events for top-tier network members</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4">
                <p className="text-gray-300 text-sm">
                  <strong>Beta Version:</strong> This network map is a conceptual visualization. 
                  Future versions will include real-time data integration, interactive filtering, 
                  and advanced relationship analytics.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NetworkMap;
