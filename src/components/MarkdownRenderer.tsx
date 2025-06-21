
import React, { useState } from 'react';
import { Check, ChevronDown, ChevronRight, CheckSquare, Square } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';

interface MarkdownRendererProps {
  content: string;
}

interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
}

interface Section {
  id: string;
  title: string;
  content: string;
  expanded: boolean;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [sections, setSections] = useState<Section[]>([]);

  React.useEffect(() => {
    // Parse content for interactive elements
    const lines = content.split('\n');
    const newSections: Section[] = [];
    const newChecklist: ChecklistItem[] = [];
    
    let currentSection: Section | null = null;
    let sectionContent: string[] = [];
    
    lines.forEach((line, index) => {
      // Handle headers
      if (line.startsWith('## ')) {
        if (currentSection) {
          currentSection.content = sectionContent.join('\n');
          newSections.push(currentSection);
        }
        currentSection = {
          id: `section-${index}`,
          title: line.replace('## ', ''),
          content: '',
          expanded: index < 3 // First 3 sections expanded by default
        };
        sectionContent = [];
      } else if (line.startsWith('### ')) {
        if (currentSection) {
          currentSection.content = sectionContent.join('\n');
          newSections.push(currentSection);
        }
        currentSection = {
          id: `section-${index}`,
          title: line.replace('### ', ''),
          content: '',
          expanded: false
        };
        sectionContent = [];
      } else if (line.match(/^[\s]*[-*]\s/)) {
        // Handle checklist items
        const checklistId = `check-${index}`;
        const text = line.replace(/^[\s]*[-*]\s/, '');
        newChecklist.push({
          id: checklistId,
          text,
          checked: false
        });
        sectionContent.push(`CHECKLIST_ITEM:${checklistId}`);
      } else {
        sectionContent.push(line);
      }
    });
    
    if (currentSection) {
      currentSection.content = sectionContent.join('\n');
      newSections.push(currentSection);
    }
    
    setSections(newSections);
    setChecklist(newChecklist);
  }, [content]);

  const toggleChecklistItem = (id: string) => {
    setChecklist(prev => prev.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const toggleSection = (id: string) => {
    setSections(prev => prev.map(section => 
      section.id === id ? { ...section, expanded: !section.expanded } : section
    ));
  };

  const renderContent = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, index) => {
      // Handle checklist items
      if (line.startsWith('CHECKLIST_ITEM:')) {
        const checkId = line.replace('CHECKLIST_ITEM:', '');
        const checkItem = checklist.find(item => item.id === checkId);
        if (!checkItem) return null;
        
        return (
          <div key={index} className="flex items-center space-x-3 my-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
               onClick={() => toggleChecklistItem(checkId)}>
            {checkItem.checked ? (
              <CheckSquare className="w-5 h-5 text-green-400 flex-shrink-0" />
            ) : (
              <Square className="w-5 h-5 text-gray-400 flex-shrink-0" />
            )}
            <span className={`${checkItem.checked ? 'line-through text-gray-400' : 'text-gray-200'}`}>
              {checkItem.text}
            </span>
          </div>
        );
      }
      
      // Handle headers
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-3xl font-bold text-white mb-4 mt-6">{line.replace('# ', '')}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-2xl font-semibold text-white mb-3 mt-5">{line.replace('## ', '')}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-xl font-semibold text-white mb-2 mt-4">{line.replace('### ', '')}</h3>;
      }
      
      // Handle bold text
      if (line.includes('**')) {
        const parts = line.split(/(\*\*.*?\*\*)/g);
        return (
          <p key={index} className="text-gray-200 mb-2 leading-relaxed">
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
      
      // Handle bullet points
      if (line.match(/^[\s]*[-*]\s/) && !line.startsWith('CHECKLIST_ITEM:')) {
        return (
          <div key={index} className="flex items-start space-x-2 ml-4 mb-1">
            <span className="text-cyan-400 mt-2">•</span>
            <span className="text-gray-200">{line.replace(/^[\s]*[-*]\s/, '')}</span>
          </div>
        );
      }
      
      // Handle empty lines
      if (line.trim() === '') {
        return <div key={index} className="h-2"></div>;
      }
      
      // Regular paragraphs
      return <p key={index} className="text-gray-200 mb-2 leading-relaxed">{line}</p>;
    });
  };

  if (sections.length === 0) {
    // Fallback for simple content without sections
    return (
      <div className="prose prose-invert max-w-none">
        {renderContent(content)}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sections.map((section) => (
        <Collapsible
          key={section.id}
          open={section.expanded}
          onOpenChange={() => toggleSection(section.id)}
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-between p-4 h-auto text-left hover:bg-white/10 border border-white/20 rounded-lg"
            >
              <h3 className="text-lg font-semibold text-white">{section.title}</h3>
              {section.expanded ? (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-400" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4 pl-4 pr-4 pb-2">
            <div className="prose prose-invert max-w-none">
              {renderContent(section.content)}
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
      
      {checklist.length > 0 && (
        <div className="mt-8 p-4 bg-white/5 rounded-lg border border-white/20">
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
        </div>
      )}
    </div>
  );
};

export default MarkdownRenderer;
