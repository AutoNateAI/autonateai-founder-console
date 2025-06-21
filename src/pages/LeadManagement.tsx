
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Plus, Download, Edit, Trash2, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

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
  const [showForm, setShowForm] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);

  const [formData, setFormData] = useState({
    shop_name: '',
    shop_url: '',
    total_sales: 0,
    years_on_etsy: 0,
    niche: '',
    average_price_point: 0,
    platform: '',
    handle: '',
    followers: 0,
    contact_name: '',
    contact_role: '',
    pain_points: '',
    content_angle: '',
    notes: ''
  });

  useEffect(() => {
    const savedLeads = localStorage.getItem('leads');
    if (savedLeads) {
      setLeads(JSON.parse(savedLeads));
    }
  }, []);

  const saveLeads = (newLeads: Lead[]) => {
    setLeads(newLeads);
    localStorage.setItem('leads', JSON.stringify(newLeads));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newLead: Lead = {
      lead_id: editingLead?.lead_id || `etsy-${formData.shop_name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
      status: 'Prospect',
      etsy_info: {
        shop_name: formData.shop_name,
        shop_url: formData.shop_url,
        total_sales: formData.total_sales,
        years_on_etsy: formData.years_on_etsy,
        niche: formData.niche,
        average_price_point: formData.average_price_point,
      },
      social_media: [{
        platform: formData.platform,
        handle: formData.handle,
        followers: formData.followers,
      }],
      contact_points: [{
        name: formData.contact_name,
        role: formData.contact_role,
      }],
      strategic_insights: {
        hypothesized_pain_points: formData.pain_points.split(',').map(p => p.trim()),
        content_angle_for_demo: formData.content_angle,
        notes: formData.notes,
      },
    };

    if (editingLead) {
      const updatedLeads = leads.map(lead => 
        lead.lead_id === editingLead.lead_id ? newLead : lead
      );
      saveLeads(updatedLeads);
      toast({
        title: "Lead Updated",
        description: "Lead information has been successfully updated.",
      });
    } else {
      saveLeads([...leads, newLead]);
      toast({
        title: "Lead Added",
        description: "New lead has been successfully added to the pipeline.",
      });
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      shop_name: '',
      shop_url: '',
      total_sales: 0,
      years_on_etsy: 0,
      niche: '',
      average_price_point: 0,
      platform: '',
      handle: '',
      followers: 0,
      contact_name: '',
      contact_role: '',
      pain_points: '',
      content_angle: '',
      notes: ''
    });
    setShowForm(false);
    setEditingLead(null);
  };

  const handleEdit = (lead: Lead) => {
    setEditingLead(lead);
    setFormData({
      shop_name: lead.etsy_info.shop_name,
      shop_url: lead.etsy_info.shop_url,
      total_sales: lead.etsy_info.total_sales,
      years_on_etsy: lead.etsy_info.years_on_etsy,
      niche: lead.etsy_info.niche,
      average_price_point: lead.etsy_info.average_price_point,
      platform: lead.social_media[0]?.platform || '',
      handle: lead.social_media[0]?.handle || '',
      followers: lead.social_media[0]?.followers || 0,
      contact_name: lead.contact_points[0]?.name || '',
      contact_role: lead.contact_points[0]?.role || '',
      pain_points: lead.strategic_insights.hypothesized_pain_points.join(', '),
      content_angle: lead.strategic_insights.content_angle_for_demo,
      notes: lead.strategic_insights.notes
    });
    setShowForm(true);
  };

  const handleDelete = (leadId: string) => {
    const updatedLeads = leads.filter(lead => lead.lead_id !== leadId);
    saveLeads(updatedLeads);
    toast({
      title: "Lead Deleted",
      description: "Lead has been removed from the pipeline.",
    });
  };

  const downloadJSON = () => {
    const dataStr = JSON.stringify({ leads }, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `leads-export-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast({
      title: "Export Complete",
      description: "Leads data has been downloaded as JSON file.",
    });
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
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Lead Management</h1>
              <p className="text-gray-300">Track and manage your sales pipeline</p>
            </div>
            <div className="flex space-x-4">
              <Button
                onClick={downloadJSON}
                variant="outline"
                className="border-green-400/50 bg-green-400/10 text-green-300 hover:bg-green-400/20"
              >
                <Download className="w-4 h-4 mr-2" />
                Export JSON
              </Button>
              <Button
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Lead
              </Button>
            </div>
          </div>
        </div>

        {showForm && (
          <Card className="backdrop-blur-xl bg-white/10 border-white/20 mb-8">
            <CardHeader>
              <CardTitle className="text-white">
                {editingLead ? 'Edit Lead' : 'Add New Lead'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-200">Shop Name</Label>
                    <Input
                      value={formData.shop_name}
                      onChange={(e) => setFormData({...formData, shop_name: e.target.value})}
                      className="bg-white/10 border-white/20 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-gray-200">Shop URL</Label>
                    <Input
                      value={formData.shop_url}
                      onChange={(e) => setFormData({...formData, shop_url: e.target.value})}
                      className="bg-white/10 border-white/20 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-gray-200">Total Sales</Label>
                    <Input
                      type="number"
                      value={formData.total_sales}
                      onChange={(e) => setFormData({...formData, total_sales: parseInt(e.target.value) || 0})}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-200">Years on Etsy</Label>
                    <Input
                      type="number"
                      value={formData.years_on_etsy}
                      onChange={(e) => setFormData({...formData, years_on_etsy: parseInt(e.target.value) || 0})}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-200">Niche</Label>
                    <Input
                      value={formData.niche}
                      onChange={(e) => setFormData({...formData, niche: e.target.value})}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-200">Average Price Point</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.average_price_point}
                      onChange={(e) => setFormData({...formData, average_price_point: parseFloat(e.target.value) || 0})}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-gray-200">Social Platform</Label>
                    <Input
                      value={formData.platform}
                      onChange={(e) => setFormData({...formData, platform: e.target.value})}
                      className="bg-white/10 border-white/20 text-white"
                      placeholder="Instagram"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-200">Handle</Label>
                    <Input
                      value={formData.handle}
                      onChange={(e) => setFormData({...formData, handle: e.target.value})}
                      className="bg-white/10 border-white/20 text-white"
                      placeholder="@username"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-200">Followers</Label>
                    <Input
                      type="number"
                      value={formData.followers}
                      onChange={(e) => setFormData({...formData, followers: parseInt(e.target.value) || 0})}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-200">Contact Name</Label>
                    <Input
                      value={formData.contact_name}
                      onChange={(e) => setFormData({...formData, contact_name: e.target.value})}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-200">Contact Role</Label>
                    <Input
                      value={formData.contact_role}
                      onChange={(e) => setFormData({...formData, contact_role: e.target.value})}
                      className="bg-white/10 border-white/20 text-white"
                      placeholder="Owner/Creator"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-gray-200">Pain Points (comma-separated)</Label>
                  <Textarea
                    value={formData.pain_points}
                    onChange={(e) => setFormData({...formData, pain_points: e.target.value})}
                    className="bg-white/10 border-white/20 text-white"
                    rows={3}
                  />
                </div>

                <div>
                  <Label className="text-gray-200">Content Angle for Demo</Label>
                  <Textarea
                    value={formData.content_angle}
                    onChange={(e) => setFormData({...formData, content_angle: e.target.value})}
                    className="bg-white/10 border-white/20 text-white"
                    rows={3}
                  />
                </div>

                <div>
                  <Label className="text-gray-200">Notes</Label>
                  <Textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    className="bg-white/10 border-white/20 text-white"
                    rows={3}
                  />
                </div>

                <div className="flex space-x-4">
                  <Button type="submit" className="bg-gradient-to-r from-green-500 to-emerald-500">
                    {editingLead ? 'Update Lead' : 'Add Lead'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetForm}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {leads.map((lead) => (
            <Card key={lead.lead_id} className="backdrop-blur-xl bg-white/10 border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs px-2 py-1 bg-white/20 text-gray-200 rounded-full">
                    {lead.status}
                  </span>
                </div>
                <CardTitle className="text-white">{lead.etsy_info.shop_name}</CardTitle>
                <CardDescription className="text-gray-300">
                  {lead.etsy_info.niche} • {lead.etsy_info.total_sales} sales
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-300 mb-4">
                  <p><strong>Years on Etsy:</strong> {lead.etsy_info.years_on_etsy}</p>
                  <p><strong>Avg Price:</strong> ${lead.etsy_info.average_price_point}</p>
                  <p><strong>Social:</strong> {lead.social_media[0]?.platform} ({lead.social_media[0]?.followers} followers)</p>
                  <p><strong>Contact:</strong> {lead.contact_points[0]?.name}</p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    onClick={() => handleEdit(lead)}
                    className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border-blue-400/50"
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleDelete(lead.lead_id)}
                    className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-300 border-red-400/50"
                  >
                    <Trash2 className="w-3 h-3 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {leads.length === 0 && !showForm && (
          <Card className="backdrop-blur-xl bg-white/10 border-white/20">
            <CardContent className="text-center py-12">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Leads Yet</h3>
              <p className="text-gray-300 mb-6">Start building your pipeline by adding your first lead</p>
              <Button
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-green-500 to-emerald-500"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add First Lead
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default LeadManagement;
