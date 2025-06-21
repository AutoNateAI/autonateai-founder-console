
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText, Eye, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Document {
  id: string;
  title: string;
  description: string;
  category: string;
  lastUpdated: string;
  content: string;
}

const StrategicDocs = () => {
  const navigate = useNavigate();
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

  const documents: Document[] = [
    {
      id: 'business-model',
      title: 'AutoNateAI Business Model',
      description: 'Core business model and value proposition for AI-powered content service',
      category: 'Strategy',
      lastUpdated: '2025-06-21',
      content: `# AutoNateAI Social Media Content Service - Business Model

## Executive Summary

AutoNateAI offers an AI-powered, Telegram-based content creation service that generates custom memes, graphics, and social media assets with matching captions for businesses. The service leverages language models and image generation to transform simple story prompts into batches of engaging, audience-targeted visual content delivered directly to clients via dedicated Telegram channels.

## Value Proposition

### Problem We Solve
- Content creation is time-consuming and expensive
- Social media requires consistent, high-volume posting
- Businesses struggle to create content that resonates with specific audiences
- Traditional content creation involves multiple tools and complex workflows

### Our Solution
- **Automated Content Factory**: Turn brief story prompts into dozens of ready-to-post memes and captions
- **Audience-Optimized**: Customized to target specific demographic and psychographic profiles
- **Frictionless Delivery**: Content delivered directly to Telegram - no dashboards or new tools to learn
- **Scale Without Overhead**: Create 100s of posts without expanding internal teams
- **Platform-Specific Formatting**: Captions optimized for different social networks (Instagram, LinkedIn)

## Target Market Analysis

### Primary Targets (First 6 Months)
1. **Marketing Agencies ($697-$1,997/month)**
   - *Pain Point*: Need scalable content solutions for multiple clients
   - *Opportunity*: 10,000+ small-mid agencies in US alone
   - *Acquisition Strategy*: Direct outreach, agency-specific case studies

2. **E-Commerce Brands ($297-$697/month)**
   - *Pain Point*: Require constant fresh content across multiple platforms
   - *Opportunity*: 2.5 million e-commerce companies in US
   - *Acquisition Strategy*: Partnerships with e-commerce platforms, targeted ads

## 6-Month Profit Projections

### Month 5-6 (Scaling Phase)
- **Clients**: 75-100 paying customers
- **Revenue**: ~$70,000/month
- **Total Profit**: ~$47,000/month
- **Focus**: Process optimization, upselling, referral program`
    },
    {
      id: 'etsy-gtm',
      title: 'Etsy Seller GTM Strategy',
      description: 'Complete go-to-market strategy for targeting Etsy sellers',
      category: 'GTM',
      lastUpdated: '2025-06-20',
      content: `# The Etsy Seller GTM Masterpiece: From eRank Data to Recurring Revenue

## 1. Executive Summary: The New Value Proposition

We are not a meme generator. We are an **AI-Powered Market Research & Content Strategy Service** exclusively for Etsy sellers. 

Our core value proposition is simple: We turn your market's data into content that sells. We use **eRank analytics** and our proprietary **graph-theory market models** to understand the trends, conversations, and pain points within your specific niche.

## 2. Pricing & Service Tiers for Etsy Sellers

| Tier | Price/Month | Target Seller | Core Features |
| :--- | :--- | :--- | :--- |
| **Content Spark** | **$397/mo** | Emerging Sellers ($1k-$5k/mo revenue) | Foundational Market Analysis |
| **Growth Engine** | **$797/mo** | Established Sellers ($5k-$20k/mo revenue) | Deep Market Analysis |
| **Market Dominator** | **$1,497/mo** | Top Sellers ($20k+/mo revenue) | Full Spectrum Analysis |

## 3. Roadmap to 100 Recurring Clients

### Phase 1: The Foundation (Months 1-2) - Goal: 10 Clients
- Set up 3 niche Instagram accounts
- Use eRank to identify your first 20 ideal prospects
- Focus on perfecting the script, demo, and onboarding process

### Phase 2: Systematization (Months 3-5) - Goal: 40 Clients
- Refine & Batch process
- Hire a VA for initial data pulling
- Build content engine from client work

### Phase 3: Acceleration (Months 6-12) - Goal: 100+ Clients
- Scale outreach with dedicated specialist
- Expand to 3-5 more niche Instagram accounts
- Build referral engine with existing clients`
    },
    {
      id: 'lead-management',
      title: 'Lead Management System',
      description: 'Comprehensive system for tracking and managing leads',
      category: 'Operations',
      lastUpdated: '2025-06-19',
      content: `# The Market Matrix: A Data-Driven Lead & Client Management System

## 1. The Philosophy: From Leads to a Living Market Graph

Every interaction, every piece of data from eRank, and every strategic insight is captured. By maintaining this structured data, we can:

1. **Map Attention Flows**: See exactly which outreach strategies lead to conversions
2. **Identify Influence Nodes**: Discover which Etsy sellers are central connectors
3. **Model Market Formations**: Analyze clusters of similar shops
4. **Train Future AI**: This structured data becomes perfect training data

## 2. The JSON Data Structure

### Master JSON Structure

\`\`\`json
{
  "leads": [
    // Array of lead objects
  ],
  "clients": [
    // Array of client objects
  ]
}
\`\`\`

### Key Fields
- **lead_id**: Unique identifier
- **status**: Current stage in funnel
- **etsy_info**: All eRank and shop data
- **social_media**: Multi-platform presence
- **engagement_log**: Timestamped interactions
- **strategic_insights**: Analysis and planning`
    },
    {
      id: 'sales-deck',
      title: 'Etsy Sales Presentation',
      description: 'Complete sales deck template for Etsy seller presentations',
      category: 'Sales',
      lastUpdated: '2025-06-18',
      content: `# The Etsy Content Machine: A Presentation for [Shop Name]

**Goal:** To make them feel seen, understood, and excited by a new way to grow their business.

## Slide Structure

### Slide 1: The Title
"Hi [Prospect's Name], thank you for taking the time to chat. I am a huge fan of what you're doing with [Shop Name]."

### Slide 2: The Reality of Being an Etsy Seller
"You're a creator. An artist. An entrepreneur. But running a business means you're also expected to be a full-time marketer."

### Slide 3: The Deeper Problem
"The real problem isn't just the time it takes. It's the guesswork."

### Slide 4: The Big Question
"What if your social media content was as strategic as your Etsy keyword strategy?"

### Slide 5: Introducing AutoNateAI
"We are an **AI-Powered Market Research and Content Strategy Service**, designed specifically for Etsy sellers like you."

## The Process

1. **Step 1: We Start with Data** - Market analysis and competitor research
2. **Step 2: We Generate Your Story** - AI creates compelling narratives
3. **Step 3: We Create Your Content** - Instant, ready-to-post materials

## Partnership Tiers
- **Starter Tier ($297/mo)**: Core content engine
- **Growth Tier ($997/mo)**: More content, platforms, strategy
- **Scale Tier ($1997/mo)**: Full marketing department experience`
    },
    {
      id: 'recruitment-plan',
      title: 'Team Recruitment Plan',
      description: 'Strategic plan for building the AutoNateAI team',
      category: 'HR',
      lastUpdated: '2025-06-17',
      content: `# AutoNateAI Team Recruitment Plan

## Phase 1: Foundation Team (Months 1-3)

### Priority Hires
1. **Technical Support Specialist**
   - Role: Handle client onboarding and technical issues
   - Skills: Customer service, basic technical troubleshooting
   - Timeline: Month 2
   - Budget: $3,000-4,000/month

2. **Virtual Assistant**
   - Role: Data gathering, prospect research, administrative tasks
   - Skills: eRank proficiency, data entry, basic analysis
   - Timeline: Month 2
   - Budget: $1,500-2,500/month

## Phase 2: Growth Team (Months 4-6)

### Expansion Roles
1. **Account Manager**
   - Role: Client relationship management and upselling
   - Skills: Sales, customer success, communication
   - Timeline: Month 4
   - Budget: $4,000-6,000/month + commission

2. **Content Strategist**
   - Role: Refine AI prompts and content quality
   - Skills: Marketing, content creation, AI prompt engineering
   - Timeline: Month 5
   - Budget: $4,500-6,500/month

## Phase 3: Scale Team (Months 7-12)

### Leadership Roles
1. **Sales Manager**
   - Role: Lead outreach team and optimize conversion
   - Skills: B2B sales, team management, process optimization
   - Timeline: Month 8
   - Budget: $6,000-8,000/month + equity

## Hiring Strategy
- Start with freelancers and contractors
- Convert best performers to full-time
- Use trial projects to assess fit
- Prioritize cultural alignment and growth mindset`
    }
  ];

  if (selectedDoc) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="mb-6">
            <Button
              onClick={() => setSelectedDoc(null)}
              variant="outline"
              className="border-white/20 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Documents
            </Button>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{selectedDoc.title}</h1>
                <div className="flex items-center space-x-4 text-gray-300">
                  <span className="px-2 py-1 bg-white/20 rounded text-xs">{selectedDoc.category}</span>
                  <span className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    {selectedDoc.lastUpdated}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Card className="backdrop-blur-xl bg-white/10 border-white/20">
            <CardContent className="p-8">
              <div className="prose prose-invert max-w-none">
                <pre className="whitespace-pre-wrap text-gray-200 leading-relaxed">
                  {selectedDoc.content}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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
          <h1 className="text-3xl font-bold text-white mb-2">Strategic Documents</h1>
          <p className="text-gray-300">Core business plans, strategies, and operational documentation</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <Card 
              key={doc.id}
              className="backdrop-blur-xl bg-white/10 border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 cursor-pointer group"
              onClick={() => setSelectedDoc(doc)}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs px-2 py-1 bg-white/20 text-gray-200 rounded-full">
                    {doc.category}
                  </span>
                </div>
                <CardTitle className="text-white group-hover:text-gray-200 transition-colors">
                  {doc.title}
                </CardTitle>
                <CardDescription className="text-gray-300">
                  {doc.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-400 text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    {doc.lastUpdated}
                  </div>
                  <Button 
                    size="sm"
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90 text-white border-0"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StrategicDocs;
