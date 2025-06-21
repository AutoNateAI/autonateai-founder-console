
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Plus, Edit, Trash2, GripVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  assignee?: string;
  createdAt: string;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
  color: string;
}

const KanbanBoard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [columns, setColumns] = useState<Column[]>([]);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<string>('');
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [draggedFromColumn, setDraggedFromColumn] = useState<string>('');

  // Initialize with default columns and sample tasks
  useEffect(() => {
    const savedBoard = localStorage.getItem('kanbanBoard');
    if (savedBoard) {
      try {
        setColumns(JSON.parse(savedBoard));
      } catch (error) {
        console.error('Error loading kanban board:', error);
        initializeDefaultBoard();
      }
    } else {
      initializeDefaultBoard();
    }
  }, []);

  // Save to localStorage whenever columns change
  useEffect(() => {
    localStorage.setItem('kanbanBoard', JSON.stringify(columns));
  }, [columns]);

  const initializeDefaultBoard = () => {
    const defaultColumns: Column[] = [
      {
        id: 'todo',
        title: 'To Do',
        color: 'from-gray-500 to-gray-600',
        tasks: [
          {
            id: 'task-1',
            title: 'Complete eRank API Integration Testing',
            description: 'Thoroughly test all API endpoints and error handling',
            priority: 'high',
            assignee: 'Engineering Team',
            createdAt: new Date().toISOString()
          },
          {
            id: 'task-2',
            title: 'Design Instagram Bot Compliance Framework',
            description: 'Ensure all automation follows Instagram TOS',
            priority: 'high',
            assignee: 'Marketing Tech',
            createdAt: new Date().toISOString()
          },
          {
            id: 'task-3',
            title: 'Create Client Onboarding Checklist',
            description: 'Streamline the new client setup process',
            priority: 'medium',
            assignee: 'Support Team',
            createdAt: new Date().toISOString()
          }
        ]
      },
      {
        id: 'in-progress',
        title: 'In Progress',
        color: 'from-yellow-500 to-orange-500',
        tasks: [
          {
            id: 'task-4',
            title: 'Beta Client Feedback Analysis',
            description: 'Analyze feedback from first 10 beta clients',
            priority: 'high',
            assignee: 'Product Team',
            createdAt: new Date().toISOString()
          },
          {
            id: 'task-5',
            title: 'Referral Program Strategy',
            description: 'Design incentive structure for client referrals',
            priority: 'medium',
            assignee: 'Business Dev',
            createdAt: new Date().toISOString()
          }
        ]
      },
      {
        id: 'done',
        title: 'Done',
        color: 'from-green-500 to-emerald-500',
        tasks: [
          {
            id: 'task-6',
            title: 'MVP Telegram Bot Development',
            description: 'Core content generation and delivery system',
            priority: 'high',
            assignee: 'Engineering Team',
            createdAt: new Date().toISOString()
          },
          {
            id: 'task-7',
            title: 'Initial Market Research',
            description: 'Comprehensive analysis of Etsy seller market',
            priority: 'medium',
            assignee: 'Strategy Team',
            createdAt: new Date().toISOString()
          }
        ]
      }
    ];
    setColumns(defaultColumns);
  };

  const handleAddTask = (taskData: Partial<Task>) => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: taskData.title || '',
      description: taskData.description || '',
      priority: taskData.priority || 'medium',
      assignee: taskData.assignee || '',
      createdAt: new Date().toISOString()
    };

    setColumns(prev => prev.map(col => 
      col.id === selectedColumn 
        ? { ...col, tasks: [...col.tasks, newTask] }
        : col
    ));

    setIsAddingTask(false);
    toast({
      title: "Task Added",
      description: `"${newTask.title}" has been added to ${columns.find(c => c.id === selectedColumn)?.title}.`,
    });
  };

  const handleDeleteTask = (taskId: string, columnId: string) => {
    setColumns(prev => prev.map(col => 
      col.id === columnId 
        ? { ...col, tasks: col.tasks.filter(task => task.id !== taskId) }
        : col
    ));

    toast({
      title: "Task Deleted",
      description: "Task has been removed from the board.",
    });
  };

  const handleDragStart = (task: Task, columnId: string) => {
    setDraggedTask(task);
    setDraggedFromColumn(columnId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();
    if (!draggedTask || !draggedFromColumn) return;

    if (draggedFromColumn !== targetColumnId) {
      setColumns(prev => prev.map(col => {
        if (col.id === draggedFromColumn) {
          return { ...col, tasks: col.tasks.filter(task => task.id !== draggedTask.id) };
        }
        if (col.id === targetColumnId) {
          return { ...col, tasks: [...col.tasks, draggedTask] };
        }
        return col;
      }));

      toast({
        title: "Task Moved",
        description: `"${draggedTask.title}" moved to ${columns.find(c => c.id === targetColumnId)?.title}.`,
      });
    }

    setDraggedTask(null);
    setDraggedFromColumn('');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500';
      case 'medium':
        return 'border-l-yellow-500';
      case 'low':
        return 'border-l-green-500';
      default:
        return 'border-l-gray-500';
    }
  };

  const TaskCard = ({ task, columnId }: { task: Task; columnId: string }) => (
    <Card 
      className={`backdrop-blur-xl bg-white/10 border-white/20 hover:bg-white/15 transition-all duration-300 cursor-move border-l-4 ${getPriorityColor(task.priority)}`}
      draggable
      onDragStart={() => handleDragStart(task, columnId)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h4 className="text-white font-medium text-sm leading-tight">{task.title}</h4>
          <div className="flex items-center space-x-1 ml-2">
            <GripVertical className="w-4 h-4 text-gray-400" />
            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleDeleteTask(task.id, columnId)}
              className="w-6 h-6 p-0 hover:bg-red-500/20 hover:text-red-400"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </div>
        {task.description && (
          <p className="text-gray-300 text-xs mb-3 line-clamp-2">{task.description}</p>
        )}
        <div className="flex items-center justify-between">
          {task.assignee && (
            <span className="text-xs px-2 py-1 bg-white/20 text-gray-200 rounded-full">
              {task.assignee}
            </span>
          )}
          <span className={`text-xs px-2 py-1 rounded-full ${
            task.priority === 'high' ? 'bg-red-500/20 text-red-300' :
            task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
            'bg-green-500/20 text-green-300'
          }`}>
            {task.priority}
          </span>
        </div>
      </CardContent>
    </Card>
  );

  const TaskForm = ({ onSave, onCancel }: { onSave: (data: Partial<Task>) => void; onCancel: () => void }) => {
    const [formData, setFormData] = useState<Partial<Task>>({
      title: '',
      description: '',
      priority: 'medium',
      assignee: ''
    });

    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">Task Title</label>
          <Input
            value={formData.title || ''}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="bg-white/10 border-white/20 text-white"
            placeholder="Enter task title..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">Description</label>
          <Textarea
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="bg-white/10 border-white/20 text-white"
            placeholder="Enter task description..."
            rows={3}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Priority</label>
            <select
              value={formData.priority || 'medium'}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value as Task['priority'] })}
              className="w-full bg-white/10 border border-white/20 text-white rounded-md px-3 py-2"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Assignee</label>
            <Input
              value={formData.assignee || ''}
              onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
              className="bg-white/10 border-white/20 text-white"
              placeholder="Assign to..."
            />
          </div>
        </div>
        <div className="flex space-x-3">
          <Button
            onClick={() => onSave(formData)}
            className="bg-gradient-to-r from-green-500 to-emerald-500"
            disabled={!formData.title?.trim()}
          >
            Add Task
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Kanban Board</h1>
              <p className="text-gray-300">Task management and workflow organization</p>
            </div>
            <Button
              onClick={() => setIsAddingTask(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-500"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </Button>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map(column => (
            <div key={column.id} className="space-y-4">
              {/* Column Header */}
              <Card className="backdrop-blur-xl bg-white/10 border-white/20">
                <CardHeader className="pb-3">
                  <CardTitle className={`text-white flex items-center justify-between`}>
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${column.color}`}></div>
                      <span>{column.title}</span>
                    </div>
                    <span className="text-sm bg-white/20 px-2 py-1 rounded-full">
                      {column.tasks.length}
                    </span>
                  </CardTitle>
                </CardHeader>
              </Card>

              {/* Drop Zone */}
              <div 
                className="min-h-96 space-y-3"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, column.id)}
              >
                {column.tasks.map(task => (
                  <TaskCard key={task.id} task={task} columnId={column.id} />
                ))}
                
                {/* Add Task Button */}
                <Button
                  onClick={() => {
                    setSelectedColumn(column.id);
                    setIsAddingTask(true);
                  }}
                  variant="outline"
                  className="w-full border-white/20 bg-white/5 text-white hover:bg-white/10 border-dashed"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Task
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Task Dialog */}
        <Dialog open={isAddingTask} onOpenChange={setIsAddingTask}>
          <DialogContent className="max-w-lg backdrop-blur-xl bg-slate-900/90 border-white/20 text-white">
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
              <DialogDescription className="text-gray-300">
                {selectedColumn && `Add a new task to ${columns.find(c => c.id === selectedColumn)?.title}`}
              </DialogDescription>
            </DialogHeader>
            <TaskForm 
              onSave={handleAddTask}
              onCancel={() => setIsAddingTask(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default KanbanBoard;
