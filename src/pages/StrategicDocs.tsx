
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText, Eye, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MarkdownRenderer from '@/components/MarkdownRenderer';

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

This pricing is structured to be a no-brainer for businesses earning revenue on Etsy. The value is in the research and strategy, not just the image output. All payments are processed via Stripe.

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
      id: 'ai-augmented-team',
      title: 'AI-Augmented Team Strategy',
      description: 'Founder-led recruitment strategy for building an AI-powered team',
      category: 'HR',
      lastUpdated: '2025-06-21',
      content: `# The AI-Augmented Team: A Founder-Led Recruitment Strategy

## 1. The Philosophy: Hire for Drive, Train for Skill, Win with AI

This is not a traditional recruitment plan. We are not hiring employees; we are onboarding **founding partners** who will execute, innovate, and grow with the company from day one. Our competitive advantage is not a large payroll, but a suite of powerful, AI-augmented workflows that you have built.

This allows us to fundamentally change the hiring equation:

- **We hire for mindset, not credentials.** We value hunger, curiosity, coachability, and a relentless drive to solve problems over a prestigious degree or a long resume.
- **We empower, not manage.** We provide our team with powerful tools and clear workflows, giving them the leverage to produce outcomes that were once reserved for highly-paid specialists.
- **We build loyalty through opportunity.** We offer a ground-floor opportunity with significant upside.

Our strategy is to find raw talent, arm them with AI-powered sledgehammers, and let them build an empire with us.

## 2. The Universal "Founder" Profile: Signals to Look For

Across all roles, every candidate must be evaluated against these core traits. These are non-negotiable.

- **Signal: Proactive Problem-Solving.**
  - **What it looks like:** They don't just identify problems; they suggest solutions. In conversation, they say "What if we tried..." instead of "That won't work because...". They have personal projects or a history of starting things, even if they failed.
  - **How to test for it:** Give them a hypothetical roadblock (e.g., "eRank's API is down, how do we find leads today?"). A great candidate will immediately start brainstorming alternatives (manual search, other tools, social media hashtags), while a poor one will just say "I guess we wait."

- **Signal: High Curiosity & Fast Learning.**
  - **What it looks like:** They ask thoughtful, clarifying questions. They are genuinely excited by new tools and ideas. They can quickly grasp a new concept you explain and ask a follow-up question that shows they're already thinking two steps ahead.
  - **How to test for it:** Briefly explain a complex concept (like your graph theory model of markets). See if they can explain it back to you in their own words. A+ candidates will not only explain it but also ask a question like, "So, could we use that to predict which niche will be hot next quarter?"

## 3. The AI-Augmented Roles & Key Signals

### Role 1: Market Intelligence Analyst

- **Mission:** To be the engine of lead generation, using our AI-augmented tools to identify and analyze high-potential Etsy sellers, turning raw data into actionable strategic insights.
- **Key Workflows:**
  - Using eRank to discover promising Etsy shops.
  - Using ChatGPT/Claude with our PROSPECT_ANALYSIS_TEMPLATE to perform deep analysis on a shop's data, brand, and social presence.
  - Generating reports that form the basis of our hyper-personalized pitches.
  - Maintaining and updating the LEAD_MANAGEMENT_SYSTEM.md JSON database.
- **Specific Signals to Look For:**
  - **Pattern Recognition:** They naturally see connections and patterns in data. They might have a passion for puzzles, strategy games, or analytics.
  - **Digital Native Intuition:** They have a good gut feeling for what makes a brand's social media presence strong or weak.
  - **Detail-Oriented:** They are meticulous and enjoy the process of digging for information and organizing it cleanly.

### Role 2: Content & Engagement Specialist

- **Mission:** To execute our direct-to-prospect marketing strategy by creating and distributing hyper-personalized content, managing our niche social media accounts, and fostering initial engagement.
- **Key Workflows:**
  - Taking the insights from the Market Intelligence Analyst to create personalized memes/reels for target accounts.
  - Posting content to our niche Instagram accounts and correctly tagging prospects.
  - Writing engaging, non-salesy comments on prospect's posts to build rapport.
  - Monitoring for follow-backs and handing off engaged leads to the Sales Specialist.
- **Specific Signals to Look For:**
  - **Socially Savvy & "Terminally Online":** They understand internet culture, humor, and the nuances of different platforms. They know what a good meme looks like.
  - **Creative & Witty:** They have a knack for writing short, punchy copy and can think on their feet.
  - **Resilient & Thick-Skinned:** They are not afraid of putting content out there and understand that not every post will be a home run.

### Role 3: Sales & Onboarding Specialist

- **Mission:** To convert warm, engaged leads into loyal clients by masterfully delivering our hyper-personalized pitch and ensuring a seamless, exciting onboarding experience.
- **Key Workflows:**
  - Taking over the DM conversation after a follow-back.
  - Using the AI_PITCH_GENERATION_PROMPT to generate the final pitch.
  - Getting on pitch calls and enthusiastically presenting the pre-built demo.
  - Closing the deal and handling the Stripe payment link.
  - Spinning up the client's private Telegram channel/group and welcoming them.
- **Specific Signals to Look For:**
  - **High Emotional Intelligence (EQ):** They are great listeners and can read a room, even a virtual one. They build rapport effortlessly.
  - **Infectious Enthusiasm:** They are genuinely excited about the service and can transfer that excitement to the prospect.
  - **Fearless & Confident:** They are not afraid to ask for the sale. They are comfortable talking about money and value.

## 4. The Recruitment & Compensation Model

1. **Source from Your Network First:** Tap into your network of professionals who are eager to contribute. Look for the signals above.
2. **The "Founder's Trial":** Bring them on for a 2-4 week trial period on a specific project. This is a real-world audition. Compensate them for the trial with a flat project fee or a simple contract.
3. **The Offer:** For those who excel, the offer is not a job, but a partnership.`
    },
    {
      id: 'team-structure',
      title: 'Team Structure & Hiring Plan',
      description: 'Detailed team structure and hiring timeline for scaling operations',
      category: 'HR',
      lastUpdated: '2025-06-21',
      content: `# AutoNateAI Team Structure & Hiring Plan

## Overview

This document outlines the essential roles needed to scale the AutoNateAI Social Media Content Service efficiently. Each position has been strategically identified to support our growth from beta phase through the first 100+ clients and beyond.

## Core Team Structure

### Phase 1 (1-50 Clients)
- Technical Lead (Founder/You)
- Customer Success Specialist (First Hire)
- Part-time Sales Representative (Second Hire)

### Phase 2 (51-100 Clients)
- Full-time Account Manager
- Technical Support Specialist
- Sales Manager

### Phase 3 (101+ Clients)
- Operations Manager
- Content Quality Assurance Specialist
- Additional Account Managers (1 per 30-40 clients)

## Key Position Descriptions

### 1. Customer Success Specialist

**Role Overview:** Primary point of contact for clients during onboarding and ongoing support, responsible for ensuring clients achieve maximum value from the service.

**Responsibilities:**
- Guide new clients through the onboarding process
- Configure audience parameters in the system
- Provide training on creating effective story prompts
- Monitor client satisfaction and usage patterns
- Gather feedback for service improvements
- Resolve basic technical issues

**Requirements:**
- 2+ years in customer success or account management
- Experience with SaaS products
- Understanding of social media marketing
- Excellent communication skills
- Basic technical aptitude
- Problem-solving mindset

**Compensation:**
- Base: $45,000-$55,000
- Performance Bonus: Up to $15,000 (retention-based)
- Equity: 0.5-1% (optional)

### 2. Technical Support Specialist

**Role Overview:** Manages the technical infrastructure of the service, including bot deployment, prompt engineering, and ensuring system stability.

**Responsibilities:**
- Set up and configure new client Telegram bots
- Troubleshoot technical issues
- Optimize prompt configurations
- Monitor system performance
- Implement improvements to automation workflow
- Documentation of technical processes

**Requirements:**
- Experience with Python
- Understanding of API integrations
- Knowledge of AI/ML concepts
- Experience with Telegram bots or similar
- Problem-solving abilities
- Technical documentation skills

**Compensation:**
- Base: $65,000-$85,000
- Performance Bonus: Up to $10,000
- Equity: 0.5-1.5% (optional)

### 3. Account Manager

**Role Overview:** Manages relationships with established clients, focusing on retention, upselling, and ensuring continued value delivery.

**Responsibilities:**
- Regular client check-ins and relationship building
- Identifying upsell opportunities
- Gathering client testimonials and case studies
- Training clients on advanced features
- Usage optimization recommendations
- Renewal management

**Requirements:**
- 3+ years in account management
- Experience in SaaS or marketing services
- Strong relationship-building skills
- Data-driven approach to client management
- Understanding of social media marketing metrics
- Presentation and communication skills

**Compensation:**
- Base: $50,000-$65,000
- Commission: Up to $30,000 (retention & upsell)
- Equity: 0.25-0.75% (optional)

## Success Metrics by Role

### Customer Success Specialist
- Client retention rate (>90%)
- Onboarding completion time (<5 days)
- Client satisfaction score (>8/10)
- Feature adoption rate

### Technical Support Specialist
- System uptime (>99.5%)
- Issue resolution time (<4 hours)
- Bot deployment time (<24 hours)
- Technical documentation completeness

### Account Manager
- Retention rate (>95%)
- Upsell rate (>20% of accounts)
- Client expansion revenue
- Referrals generated

## Hiring Timeline

- **Month 1-2**: Customer Success Specialist (part-time)
- **Month 3-4**: Technical Support Specialist (part-time to full-time)
- **Month 5**: Sales Representative (commission-based)
- **Month 6**: Account Manager (as client base grows)
- **Month 8+**: Additional specialists based on growth

## Remote Work Policy

AutoNateAI embraces a "remote-first" approach with:
- Quarterly in-person team events
- Daily virtual stand-ups
- Collaboration tools (Slack, Notion, etc.)
- Results-based performance measurement
- Flexible hours with core availability windows`
    },
    {
      id: 'founding-presentation',
      title: 'Founding Partners Presentation',
      description: 'Presentation script for recruiting founding team members',
      category: 'HR',
      lastUpdated: '2025-06-21',
      content: `# Presentation: Join the AI-Powered Content Revolution

**Title:** Beyond the Hype: Building a Real Business with AI

**Audience:** 10-20 potential founding partners, hungry for a ground-floor opportunity.

**Presenter:** You (AutoNate)

## Part 1: The Introduction - A Generational Shift

"Hey everyone, thank you so much for being here. I know your time is valuable, so I appreciate you spending the next hour with me.

My name is Nate, and for the past few years, I've been deep in the trenches of software development, AI research, and prompt engineering. And I can tell you with 100% certainty: we are living through one of the biggest technological shifts since the invention of the internet.

But most people are just playing with the shiny toys. They're asking AI to write a poem or make a funny picture. They're not asking the right question.

The right question is: **How can we use this incredible new leverage to solve real, painful business problems?**

That's what we're going to talk about today. And more importantly, I'm going to show you how you can be a part of the team that's building a real, profitable answer to that question."

## Part 2: The Problem - The Content Creation Hamster Wheel

"Let's talk about small businesses, creators, Etsy sellers... the lifeblood of our economy. They are passionate, talented people who are amazing at what they do—whether it's crafting handmade jewelry or providing a local service.

But they all share one, universal problem: **Marketing is a nightmare.**

They are trapped on a hamster wheel of content creation. They're told they need to post on Instagram, TikTok, LinkedIn... every single day. They spend countless hours staring at a blank screen, fighting with clunky editing software, and throwing content into the void, hoping something sticks.

It's exhausting. It pulls them away from their actual business. And worst of all, most of the time, it doesn't even work. It's disconnected from real business results."

## Part 3: Our Solution - The AI-Augmented Agency

"So, what's the solution? The old model was to hire an expensive marketing agency that uses the same tired playbook for every client. That model is broken.

We've built something new. Something smarter.

We are an **AI-Powered Market Research and Content Strategy Service.**

That's a mouthful, so let me break down what it means. We don't just create content. We create the *right* content. We've built a system that:

1. **Starts with Data:** We analyze a client's specific market to understand what their customers *actually* care about.
2. **Generates Strategy:** We use that data to generate unique strategic insights and compelling stories for their brand.
3. **Creates Content Effortlessly:** Our AI-powered workflows then take those stories and instantly turn them into a flood of high-impact social media content—memes, graphics, carousels, you name it.

We've built a machine that connects real market intelligence directly to the content that gets posted. We give our clients a powerful, data-driven marketing department for a fraction of the cost."

## Part 4: The Opportunity - Why I Need You

"And here's why I've invited you all here today. This isn't just a theory anymore.

**The market is already asking for this.** I have real businesses, right now, asking for this service. The demand is there. The system I've built works.

But I've hit a limit. I can't do it alone. This is too big of an opportunity to tackle by myself.

I'm not looking to hire employees. I'm looking for **founding partners.** I'm looking for a small, elite team of driven individuals to come in on the ground floor and build this company with me.

This is a chance to get in early on something special. To be part of the core team that shapes our culture, our strategy, and shares in our success."

## Part 5: The Roles - Who We're Looking For

"We believe in hiring for **drive, curiosity, and coachability**, not for a fancy resume. We've built the tools; we need smart, hungry people to run them.

Here are the founding roles we're looking to fill:

- **The Market Intelligence Analyst:** You're a detective. You love digging for information, finding patterns, and turning raw data into 'aha!' moments. You'll be the one uncovering the insights that fuel our entire strategy.

- **The Content & Engagement Specialist:** You're a creator at heart. You get internet culture. You'll be the one taking our strategic insights and turning them into clever, engaging content that grabs attention and starts conversations.

- **The Sales & Onboarding Specialist:** You're a people person. You're a great listener who loves building relationships. You'll be the one showing potential clients the magic we've created for them and welcoming them into our world.

- **The Content & Community Strategist:** You're a storyteller and a connector. You'll be the one building our brand's voice in the market and nurturing our growing community of clients, turning them into raving fans.

Notice, none of these roles require you to be a coder or an AI expert. They require you to be sharp, creative, and relentless. We'll teach you how to use the tools."

## Part 6: The Vision & The Ask

"My vision is to build a new kind of company. One that's small, smart, and highly leveraged. A place where every single person has a massive impact and is rewarded accordingly.

We're going to build a powerhouse that helps hundreds, then thousands, of small businesses win.

So, my ask today is simple. If anything I've said has sparked something in you... If you're tired of the old way and excited about building the future... If you're ready to bet on yourself and be part of a founding team... then I want to talk to you.

In a moment, I'll share a link to a short form. If you're interested, fill it out, and I'll schedule a one-on-one chat with each of you to talk more about the vision, the roles, and how we can win, together.

Thank you."`
    },
    {
      id: 'application-form',
      title: 'Founding Partner Application Template',
      description: 'Application form template for potential founding team members',
      category: 'HR',
      lastUpdated: '2025-06-21',
      content: `# Template for Founding Partner Application Form

**Form Title:** AutoNateAI - Founding Partner Application

**Form Description:** Thank you for your interest in joining our mission. This isn't a typical job application. We're looking for founding partners, and this form is the first step in our conversation. Please answer thoughtfully. We read every single word.

## Section 1: The Basics

1. **Full Name:** (Short Text)

2. **Email Address:** (Short Text - Email Validation)

3. **Link to Your Work:** (Short Text - URL)
   - *Helper Text:* Please provide a link to your LinkedIn, personal website, GitHub, portfolio, or any project you're proud of. We want to see what you build, create, or write.

## Section 2: Your Interest & Drive

4. **Which of the founding roles resonates with you the most?** (Multiple Choice)
   - Market Intelligence Analyst (The Detective)
   - Content & Engagement Specialist (The Creator)
   - Sales & Onboarding Specialist (The People Person)
   - Content & Community Strategist (The Storyteller)
   - I'm not sure yet, but I'm driven to contribute.

5. **Why did that role jump out at you?** (Paragraph Text)
   - *Helper Text:* Tell us a bit about what excites you about that mission. What past experiences make you feel it's a great fit?

## Section 3: The Founder Signals

**(These questions are designed to test for the core traits we value most.)**

6. **The "Proactive Problem-Solving" Question:**
   - **Prompt:** Describe a time you started something on your own, big or small. It could be a personal project, a new process at work, a community group, anything. What was it, and what was the most important lesson you learned from it? (Paragraph Text)
   - *Purpose:* This tests for the "innate drive" and "proactive problem-solving" signal. We're looking for people who take initiative.

7. **The "High Curiosity" Question:**
   - **Prompt:** What's a new topic, tool, or skill you've been learning about recently just because you were curious? What excites you about it? (Paragraph Text)
   - *Purpose:* This tests for the "high curiosity & fast learning" signal. We want people who are intrinsically motivated to learn.

## Section 4: The Final Pitch

8. **Why this opportunity? Why now?** (Paragraph Text)
   - *Helper Text:* In your own words, why are you interested in this specific mission of building an AI-augmented agency? Why is now the right time in your career for a ground-floor opportunity like this? This is your space to make your case.

**Submission Confirmation Message:**

"Thank you. We've received your application. We are personally reviewing every submission and will be in touch within 3-5 business days to schedule a one-on-one chat if we see a potential fit. We appreciate you taking the time to share your story with us."`
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
              <MarkdownRenderer content={selectedDoc.content} />
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
