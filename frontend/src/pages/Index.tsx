import { HealthStatus } from '@/components/HealthStatus';
import { TaskList } from '@/components/TaskList';
import { CreateTaskForm } from '@/components/CreateTaskForm';
import { ApiInfo } from '@/components/ApiInfo';
import { useTasks } from '@/hooks/useTasks';
import { ListTodo } from 'lucide-react';

const Index = () => {
  const { tasks, loading, createTask, toggleComplete, deleteTask } = useTasks();

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <ListTodo className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Task Manager</h1>
              <p className="text-xs text-muted-foreground">Organize your work efficiently</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="rounded-full bg-muted px-3 py-1">
              {completedCount}/{tasks.length} completed
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-3xl space-y-6">
          {/* Health Status */}
          <HealthStatus />

          {/* Tasks Section */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-medium text-foreground">Tasks</h2>
            </div>
            
            <div className="space-y-4">
              <CreateTaskForm 
                onSubmit={async (dto) => { await createTask(dto); }} 
                loading={loading} 
              />
              <TaskList 
                tasks={tasks} 
                onToggle={toggleComplete} 
                onDelete={deleteTask} 
              />
            </div>
          </section>

          {/* API Reference */}
          <section>
            <h2 className="mb-4 text-lg font-medium text-foreground">API Reference</h2>
            <ApiInfo />
          </section>

          {/* Usage Instructions */}
          <section className="rounded-lg border border-border bg-card p-6">
            <h2 className="mb-3 text-lg font-medium text-foreground">Configuration</h2>
            <ol className="list-inside list-decimal space-y-2 text-sm text-muted-foreground">
              <li>Set <code className="rounded bg-muted px-1.5 py-0.5 text-foreground">VITE_API_BASE_URL</code> to your API endpoint</li>
              <li>Toggle <code className="rounded bg-muted px-1.5 py-0.5 text-foreground">USE_MOCK = false</code> in hooks/useTasks.ts</li>
              <li>Ensure your API implements the endpoints listed above</li>
              <li>Test your integration!</li>
            </ol>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Index;
