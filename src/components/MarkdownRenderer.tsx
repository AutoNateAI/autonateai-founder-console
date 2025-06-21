
import React, { useState } from 'react';
import { Check, CheckSquare, Square, TrendingUp, Users, Target, DollarSign, Calendar, Award, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from 'recharts';

interface MarkdownRendererProps {
  content: string;
}

interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
}

interface StatCard {
  title: string;
  value: string;
  icon: string;
  color: string;
}

interface TableData {
  headers: string[];
  rows: string[][];
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);

  React.useEffect(() => {
    // Parse content for checklist items
    const lines = content.split('\n');
    const newChecklist: ChecklistItem[] = [];
    
    lines.forEach((line, index) => {
      if (line.match(/^[\s]*[-*]\s/) && !line.includes('|')) {
        const checklistId = `check-${index}`;
        const text = line.replace(/^[\s]*[-*]\s/, '');
        newChecklist.push({
          id: checklistId,
          text,
          checked: false
        });
      }
    });
    
    setChecklist(newChecklist);
  }, [content]);

  const toggleChecklistItem = (id: string) => {
    setChecklist(prev => prev.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const getIconForStat = (title: string) => {
    const iconMap: { [key: string]: any } = {
      'revenue': DollarSign,
      'growth': TrendingUp,
      'clients': Users,
      'conversion': Target,
      'monthly': Calendar,
      'tier': Award,
      'default': Zap
    };
    
    const key = Object.keys(iconMap).find(k => title.toLowerCase().includes(k)) || 'default';
    return iconMap[key];
  };

  const parseStatCards = (text: string): StatCard[] => {
    const statPattern = /\*\*([^*]+)\*\*[:\s]*([^,\n]+)/g;
    const stats: StatCard[] = [];
    let match;
    
    while ((match = statPattern.exec(text)) !== null) {
      const title = match[1];
      const value = match[2].trim();
      
      if (value.includes('$') || value.includes('%') || value.match(/\d/)) {
        stats.push({
          title,
          value,
          icon: title.toLowerCase(),
          color: `from-${['blue', 'green', 'purple', 'orange', 'cyan'][stats.length % 5]}-500 to-${['cyan', 'emerald', 'pink', 'red', 'blue'][stats.length % 5]}-500`
        });
      }
    }
    
    return stats;
  };

  const parseTable = (text: string): TableData | null => {
    const lines = text.split('\n').filter(line => line.includes('|'));
    if (lines.length < 2) return null;
    
    const headers = lines[0].split('|').map(h => h.trim()).filter(h => h);
    const rows = lines.slice(2).map(line => 
      line.split('|').map(cell => cell.trim()).filter(cell => cell)
    ).filter(row => row.length > 0);
    
    return { headers, rows };
  };

  const generateChartData = (sectionTitle: string) => {
    if (sectionTitle.toLowerCase().includes('profit') || sectionTitle.toLowerCase().includes('revenue')) {
      return [
        { month: 'Month 1', revenue: 4500, profit: 2000 },
        { month: 'Month 2', revenue: 8000, profit: 4500 },
        { month: 'Month 3', revenue: 25000, profit: 15000 },
        { month: 'Month 4', revenue: 35000, profit: 22000 },
        { month: 'Month 5', revenue: 70000, profit: 47000 },
        { month: 'Month 6', revenue: 85000, profit: 58000 }
      ];
    } else if (sectionTitle.toLowerCase().includes('tier') || sectionTitle.toLowerCase().includes('pricing')) {
      return [
        { name: 'Starter', value: 40, color: '#8B5CF6' },
        { name: 'Growth', value: 40, color: '#06B6D4' },
        { name: 'Scale', value: 20, color: '#10B981' }
      ];
    } else if (sectionTitle.toLowerCase().includes('team') || sectionTitle.toLowerCase().includes('hiring')) {
      return [
        { phase: 'Phase 1', count: 3 },
        { phase: 'Phase 2', count: 6 },
        { phase: 'Phase 3', count: 12 }
      ];
    }
    return null;
  };

  const renderChart = (data: any[], sectionTitle: string) => {
    if (sectionTitle.toLowerCase().includes('profit') || sectionTitle.toLowerCase().includes('revenue')) {
      return (
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <ChartTooltip />
            <Line type="monotone" dataKey="revenue" stroke="#06B6D4" strokeWidth={2} />
            <Line type="monotone" dataKey="profit" stroke="#10B981" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      );
    } else if (sectionTitle.toLowerCase().includes('tier') || sectionTitle.toLowerCase().includes('pricing')) {
      return (
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={60}
              fill="#8884d8"
              dataKey="value"
              label={({ name, value }) => `${name}: ${value}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <ChartTooltip />
          </PieChart>
        </ResponsiveContainer>
      );
    } else if (sectionTitle.toLowerCase().includes('team') || sectionTitle.toLowerCase().includes('hiring')) {
      return (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data}>
            <XAxis dataKey="phase" />
            <YAxis />
            <ChartTooltip />
            <Bar dataKey="count" fill="#8B5CF6" />
          </BarChart>
        </ResponsiveContainer>
      );
    }
    return null;
  };

  const renderContent = () => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let currentSection = '';
    let checklistIndex = 0;
    
    // Check for overall stats first
    const stats = parseStatCards(content);
    if (stats.length > 0) {
      elements.push(
        <div key="global-stats" className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
          {stats.slice(0, 6).map((stat, index) => {
            const IconComponent = getIconForStat(stat.title);
            return (
              <Card key={index} className="bg-white/5 border-white/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-300 text-sm">{stat.title}</p>
                      <p className="text-xl font-bold text-white">{stat.value}</p>
                    </div>
                    <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      );
    }

    // Check for tables
    const tableData = parseTable(content);
    if (tableData) {
      elements.push(
        <Card key="global-table" className="my-8 bg-white/5 border-white/20">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  {tableData.headers.map((header, index) => (
                    <TableHead key={index} className="text-gray-200">{header}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableData.rows.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <TableCell key={cellIndex} className="text-gray-300">{cell}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      );
    }

    lines.forEach((line, index) => {
      // Handle headers
      if (line.startsWith('# ')) {
        elements.push(
          <div key={index} className="my-8">
            <h1 className="text-4xl font-bold text-white mb-4">{line.replace('# ', '')}</h1>
          </div>
        );
      } else if (line.startsWith('## ')) {
        currentSection = line.replace('## ', '');
        
        // Add chart for this section if applicable
        const chartData = generateChartData(currentSection);
        if (chartData) {
          elements.push(
            <Card key={`chart-${index}`} className="my-6 bg-white/5 border-white/20">
              <CardHeader>
                <CardTitle className="text-white">{currentSection} Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                {renderChart(chartData, currentSection)}
              </CardContent>
            </Card>
          );
        }
        
        elements.push(
          <div key={index} className="my-6">
            <h2 className="text-3xl font-semibold text-white mb-4 pb-2 border-b border-white/20">{currentSection}</h2>
          </div>
        );
      } else if (line.startsWith('### ')) {
        elements.push(
          <div key={index} className="my-4">
            <h3 className="text-2xl font-semibold text-white mb-3">{line.replace('### ', '')}</h3>
          </div>
        );
      }
      // Handle bold text
      else if (line.includes('**')) {
        const parts = line.split(/(\*\*.*?\*\*)/g);
        elements.push(
          <p key={index} className="text-gray-200 mb-3 leading-relaxed text-lg">
            {parts.map((part, i) => 
              part.startsWith('**') && part.endsWith('**') ? (
                <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>
              ) : (
                part
              )
            )}
          </p>
        );
      }
      // Handle bullet points as checklist items
      else if (line.match(/^[\s]*[-*]\s/) && !line.includes('|')) {
        const checkItem = checklist[checklistIndex];
        if (checkItem) {
          elements.push(
            <div key={index} className="flex items-center space-x-3 my-3 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                 onClick={() => toggleChecklistItem(checkItem.id)}>
              {checkItem.checked ? (
                <CheckSquare className="w-5 h-5 text-green-400 flex-shrink-0" />
              ) : (
                <Square className="w-5 h-5 text-gray-400 flex-shrink-0" />
              )}
              <span className={`${checkItem.checked ? 'line-through text-gray-400' : 'text-gray-200'} text-lg`}>
                {checkItem.text}
              </span>
            </div>
          );
          checklistIndex++;
        }
      }
      // Handle empty lines
      else if (line.trim() === '') {
        elements.push(<div key={index} className="h-4"></div>);
      }
      // Regular paragraphs
      else if (line.trim() && !line.includes('|')) {
        elements.push(
          <p key={index} className="text-gray-200 mb-3 leading-relaxed text-lg">
            {line}
          </p>
        );
      }
    });

    return elements;
  };

  return (
    <div className="space-y-6">
      {renderContent()}
      
      {checklist.length > 0 && (
        <Card className="mt-8 bg-white/5 border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-white flex items-center">
                <Check className="w-5 h-5 mr-2 text-green-400" />
                Progress Tracker
              </h4>
              <span className="text-sm text-gray-300">
                {checklist.filter(item => item.checked).length}/{checklist.length} completed
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
              <div 
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${checklist.length > 0 ? (checklist.filter(item => item.checked).length / checklist.length) * 100 : 0}%` 
                }}
              ></div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MarkdownRenderer;
