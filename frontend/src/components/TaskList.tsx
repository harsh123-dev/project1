import { CheckCircle2, Circle, Trash2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Task } from '@/types/api';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-4 rounded-full bg-muted p-4">
          <Clock className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-foreground">No tasks yet</h3>
        <p className="text-sm text-muted-foreground">Create your first task to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {tasks.map(task => (
        <div 
          key={task.id}
          className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent/50"
        >
          <button
            onClick={() => onToggle(task.id)}
            className="mt-0.5 flex-shrink-0 text-muted-foreground transition-colors hover:text-primary"
          >
            {task.completed ? (
              <CheckCircle2 className="h-5 w-5 text-primary" />
            ) : (
              <Circle className="h-5 w-5" />
            )}
          </button>
          
          <div className="flex-1 min-w-0">
            <h4 className={`font-medium ${task.completed ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
              {task.title}
            </h4>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
              {task.description}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              {new Date(task.createdAt).toLocaleDateString()}
            </p>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(task.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}
