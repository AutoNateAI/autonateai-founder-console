
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Plus, Download, Edit, Trash2, Eye, Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Lead {
  lead_id: string;
  status: string;
  etsy_info: {
    shop_name: string;
    shop_url: string;
    total_sales: number;
    years_on_etsy: number;
    niche: string;
    average_price_point: number;
  };
  social_media: Array<{
    platform: string;
    handle: string;
    followers: number;
  }>;
  contact_points: Array<{
    name: string;
    role: string;
  }>;
  strategic_insights: {
    hypothesized_pain_points: string[];
    content_angle_for_demo: string;
    notes: string;
  };
}

const LeadManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isAddingLead, setIsAddingLead] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);

  // Load leads from localStorage on component mount
  useEffect(() => {
    const savedLeads = localStorage.getItem('leads');
    if (savedLeads) {
      try {
        const parsed = JSON.parse(savedLeads);
        setLeads(parsed);
      } catch (error) {
        console.error('Error parsing saved leads:', error);
      }
    }
  }, []);

  // Save leads to localStorage whenever leads change
  useEffect(() => {
    localStorage.setItem('leads', JSON.stringify(leads));
  }, [leads]);

  const handleAddLead = (leadData: Partial<Lead>) => {
    const newLead: Lead = {
      lead_id: `lead-${Date.now()}`,
      status: 'Prospect',
      etsy_info: {
        shop_name: leadData.etsy_info?.shop_name || '',
        shop_url: leadData.etsy_info?.shop_url || '',
        total_sales: leadData.etsy_info?.total_sales || 0,
        years_on_etsy: leadData.etsy_info?.years_on_etsy || 0,
        niche: leadData.etsy_info?.niche || '',
        average_price_point: leadData.etsy_info?.average_price_point || 0,
      },
      social_media: leadData.social_media || [],
      contact_points: leadData.contact_points || [],
      strategic_insights: {
        hypothesized_pain_points: leadData.strategic_insights?.hypothesized_pain_points || [],
        content_angle_for_demo: leadData.strategic_insights?.content_angle_for_demo || '',
        notes: leadData.strategic_insights?.notes || '',
      },
    };

    setLeads([...leads, newLead]);
    setIsAddingLead(false);
    toast({
      title: "Lead Added",
      description: `${newLead.etsy_info.shop_name} has been added to your pipeline.`,
    });
  };

  const handleDeleteLead = (leadId: string) => {
    setLeads(leads.filter(lead => lead.lead_id !== leadId));
    toast({
      title: "Lead Deleted",
      description: "Lead has been removed from your pipeline.",
    });
  };

  const handleExportLeads = () => {
    const dataStr = JSON.stringify({ leads, clients: [] }, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `leads-export-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();

    toast({
      title: "Export Complete",
      description: `${leads.length} leads exported successfully.`,
    });
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.etsy_info.shop_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.etsy_info.niche.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const LeadForm = ({ lead, onSave, onCancel }: { lead?: Lead; onSave: (data: Partial<Lead>) => void; onCancel: () => void }) => {
    const [formData, setFormData] = useState<Partial<Lead>>(lead || {
      etsy_info: {},
      social_media: [{ platform: 'Instagram', handle: '', followers: 0 }],
      contact_points: [{ name: '', role: 'Owner' }],
      strategic_insights: { hypothesized_pain_points: [], content_angle_for_demo: '', notes: '' }
    });

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="shop_name">Shop Name</Label>
            <Input
              id="shop_name"
              value={formData.etsy_info?.shop_name || ''}
              onChange={(e) => setFormData({
                ...formData,
                etsy_info: { ...formData.etsy_info, shop_name: e.target.value }
              })}
              className="bg-white/10 border-white/20 text-white"
            />
          </div>
          <div>
            <Label htmlFor="shop_url">Shop URL</Label>
            <Input
              id="shop_url"
              value={formData.etsy_info?.shop_url || ''}
              onChange={(e) => setFormData({
                ...formData,
                etsy_info: { ...formData.etsy_info, shop_url: e.target.value }
              })}
              className="bg-white/10 border-white/20 text-white"
            />
          </div>
          <div>
            <Label htmlFor="niche">Niche</Label>
            <Input
              id="niche"
              value={formData.etsy_info?.niche || ''}
              onChange={(e) => setFormData({
                ...formData,
                etsy_info: { ...formData.etsy_info, niche: e.target.value }
              })}
              className="bg-white/10 border-white/20 text-white"
            />
          </div>
          <div>
            <Label htmlFor="total_sales">Total Sales</Label>
            <Input
              id="total_sales"
              type="number"
              value={formData.etsy_info?.total_sales || ''}
              onChange={(e) => setFormData({
                ...formData,
                etsy_info: { ...formData.etsy_info, total_sales: parseInt(e.target.value) || 0 }
              })}
              className="bg-white/10 border-white/20 text-white"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="contact_name">Contact Name</Label>
          <Input
            id="contact_name"
            value={formData.contact_points?.[0]?.name || ''}
            onChange={(e) => {
              const contacts = formData.contact_points || [{ name: '', role: 'Owner' }];
              contacts[0] = { ...contacts[0], name: e.target.value };
              setFormData({ ...formData, contact_points: contacts });
            }}
            className="bg-white/10 border-white/20 text-white"
          />
        </div>

        <div>
          <Label htmlFor="instagram_handle">Instagram Handle</Label>
          <Input
            id="instagram_handle"
            value={formData.social_media?.[0]?.handle || ''}
            onChange={(e) => {
              const social = formData.social_media || [{ platform: 'Instagram', handle: '', followers: 0 }];
              social[0] = { ...social[0], handle: e.target.value };
              setFormData({ ...formData, social_media: social });
            }}
            className="bg-white/10 border-white/20 text-white"
            placeholder="@username"
          />
        </div>

        <div>
          <Label htmlFor="content_angle">Content Angle for Demo</Label>
          <Textarea
            id="content_angle"
            value={formData.strategic_insights?.content_angle_for_demo || ''}
            onChange={(e) => setFormData({
              ...formData,
              strategic_insights: {
                ...formData.strategic_insights,
                content_angle_for_demo: e.target.value
              }
            })}
            className="bg-white/10 border-white/20 text-white"
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="notes">Strategic Notes</Label>
          <Textarea
            id="notes"
            value={formData.strategic_insights?.notes || ''}
            onChange={(e) => setFormData({
              ...formData,
              strategic_insights: {
                ...formData.strategic_insights,
                notes: e.target.value
              }
            })}
            className="bg-white/10 border-white/20 text-white"
            rows={3}
          />
        </div>

        <div className="flex space-x-3">
          <Button
            onClick={() => onSave(formData)}
            className="bg-gradient-to-r from-green-500 to-emerald-500"
          >
            Save Lead
          </Button>
          <Button
            onClick={onCancel}
            variant="outline"
            className="border-white/20 bg-white/10 text-white hover:bg-white/20"
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <Button
            onClick={() => navigate('/dashboard')}
            variant="outline"
            className="border-white/20 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Lead Management</h1>
              <p className="text-gray-300">Track and manage your sales pipeline</p>
            </div>
            <div className="flex space-x-3">
              <Button
                onClick={handleExportLeads}
                className="bg-gradient-to-r from-blue-500 to-cyan-500"
              >
                <Download className="w-4 h-4 mr-2" />
                Export JSON
              </Button>
              <Button
                onClick={() => setIsAddingLead(true)}
                className="bg-gradient-to-r from-green-500 to-emerald-500"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Lead
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/10 border-white/20 text-white pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Prospect">Prospect</SelectItem>
                <SelectItem value="Contacted">Contacted</SelectItem>
                <SelectItem value="In Conversation">In Conversation</SelectItem>
                <SelectItem value="Demo Scheduled">Demo Scheduled</SelectItem>
                <SelectItem value="Closed-Won">Closed-Won</SelectItem>
                <SelectItem value="Closed-Lost">Closed-Lost</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Leads Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLeads.map((lead) => (
            <Card 
              key={lead.lead_id}
              className="backdrop-blur-xl bg-white/10 border-white/20 hover:bg-white/15 transition-all duration-300"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white text-lg">
                    {lead.etsy_info.shop_name}
                  </CardTitle>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    lead.status === 'Closed-Won' ? 'bg-green-500/20 text-green-300' :
                    lead.status === 'In Conversation' ? 'bg-blue-500/20 text-blue-300' :
                    lead.status === 'Contacted' ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-gray-500/20 text-gray-300'
                  }`}>
                    {lead.status}
                  </span>
                </div>
                <CardDescription className="text-gray-300">
                  {lead.etsy_info.niche} • {lead.etsy_info.total_sales} sales
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm text-gray-300">
                    <strong>Contact:</strong> {lead.contact_points[0]?.name || 'N/A'}
                  </div>
                  {lead.social_media[0]?.handle && (
                    <div className="text-sm text-gray-300">
                      <strong>Instagram:</strong> {lead.social_media[0].handle}
                    </div>
                  )}
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={() => setSelectedLead(lead)}
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 flex-1"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => setEditingLead(lead)}
                      className="bg-gradient-to-r from-purple-500 to-pink-500"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleDeleteLead(lead.lead_id)}
                      className="bg-gradient-to-r from-red-500 to-pink-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {leads.length === 0 && (
          <Card className="backdrop-blur-xl bg-white/10 border-white/20 text-center py-12">
            <CardContent>
              <div className="text-gray-300">
                <Plus className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">No leads yet</h3>
                <p className="mb-4">Start building your pipeline by adding your first lead.</p>
                <Button
                  onClick={() => setIsAddingLead(true)}
                  className="bg-gradient-to-r from-green-500 to-emerald-500"
                >
                  Add Your First Lead
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Add Lead Dialog */}
        <Dialog open={isAddingLead} onOpenChange={setIsAddingLead}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto backdrop-blur-xl bg-slate-900/90 border-white/20 text-white">
            <DialogHeader>
              <DialogTitle>Add New Lead</DialogTitle>
              <DialogDescription className="text-gray-300">
                Add a new potential client to your pipeline
              </DialogDescription>
            </DialogHeader>
            <LeadForm 
              onSave={handleAddLead}
              onCancel={() => setIsAddingLead(false)}
            />
          </DialogContent>
        </Dialog>

        {/* Edit Lead Dialog */}
        <Dialog open={!!editingLead} onOpenChange={() => setEditingLead(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto backdrop-blur-xl bg-slate-900/90 border-white/20 text-white">
            <DialogHeader>
              <DialogTitle>Edit Lead</DialogTitle>
              <DialogDescription className="text-gray-300">
                Update lead information
              </DialogDescription>
            </DialogHeader>
            {editingLead && (
              <LeadForm 
                lead={editingLead}
                onSave={(data) => {
                  const updatedLeads = leads.map(lead => 
                    lead.lead_id === editingLead.lead_id 
                      ? { ...lead, ...data } as Lead
                      : lead
                  );
                  setLeads(updatedLeads);
                  setEditingLead(null);
                  toast({
                    title: "Lead Updated",
                    description: "Lead information has been updated successfully.",
                  });
                }}
                onCancel={() => setEditingLead(null)}
              />
            )}
          </DialogContent>
        </Dialog>

        {/* View Lead Dialog */}
        <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto backdrop-blur-xl bg-slate-900/90 border-white/20 text-white">
            <DialogHeader>
              <DialogTitle>{selectedLead?.etsy_info.shop_name}</DialogTitle>
              <DialogDescription className="text-gray-300">
                Complete lead profile and insights
              </DialogDescription>
            </DialogHeader>
            {selectedLead && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-200 mb-2">Etsy Information</h4>
                    <div className="space-y-1 text-sm text-gray-300">
                      <p><strong>Shop:</strong> {selectedLead.etsy_info.shop_name}</p>
                      <p><strong>Niche:</strong> {selectedLead.etsy_info.niche}</p>
                      <p><strong>Sales:</strong> {selectedLead.etsy_info.total_sales}</p>
                      <p><strong>Years on Etsy:</strong> {selectedLead.etsy_info.years_on_etsy}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-200 mb-2">Contact Information</h4>
                    <div className="space-y-1 text-sm text-gray-300">
                      <p><strong>Name:</strong> {selectedLead.contact_points[0]?.name || 'N/A'}</p>
                      <p><strong>Role:</strong> {selectedLead.contact_points[0]?.role || 'N/A'}</p>
                      {selectedLead.social_media[0]?.handle && (
                        <p><strong>Instagram:</strong> {selectedLead.social_media[0].handle}</p>
                      )}
                    </div>
                  </div>
                </div>
                {selectedLead.strategic_insights.content_angle_for_demo && (
                  <div>
                    <h4 className="font-semibold text-gray-200 mb-2">Content Angle</h4>
                    <p className="text-sm text-gray-300">{selectedLead.strategic_insights.content_angle_for_demo}</p>
                  </div>
                )}
                {selectedLead.strategic_insights.notes && (
                  <div>
                    <h4 className="font-semibold text-gray-200 mb-2">Strategic Notes</h4>
                    <p className="text-sm text-gray-300">{selectedLead.strategic_insights.notes}</p>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default LeadManagement;
