import { Code } from 'lucide-react';

export function ApiInfo() {
  const endpoints = [
    { method: 'GET', path: '/health', description: 'Health check' },
    { method: 'GET', path: '/tasks', description: 'List all tasks' },
    { method: 'POST', path: '/tasks', description: 'Create task' },
    { method: 'GET', path: '/tasks/:id', description: 'Get task by ID' },
    { method: 'PUT', path: '/tasks/:id', description: 'Update task' },
    { method: 'DELETE', path: '/tasks/:id', description: 'Delete task' },
  ];

  const methodColors: Record<string, string> = {
    GET: 'bg-emerald-100 text-emerald-700',
    POST: 'bg-blue-100 text-blue-700',
    PUT: 'bg-amber-100 text-amber-700',
    DELETE: 'bg-red-100 text-red-700',
  };

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="mb-4 flex items-center gap-2">
        <Code className="h-5 w-5 text-muted-foreground" />
        <h3 className="font-medium text-foreground">Expected API Endpoints</h3>
      </div>
      
      <div className="space-y-2">
        {endpoints.map(({ method, path, description }) => (
          <div key={`${method}-${path}`} className="flex items-center gap-3 text-sm">
            <span className={`rounded px-2 py-0.5 text-xs font-mono font-medium ${methodColors[method]}`}>
              {method}
            </span>
            <code className="text-muted-foreground font-mono">{path}</code>
            <span className="text-muted-foreground">— {description}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-lg bg-muted/50 p-3">
        <p className="text-xs text-muted-foreground">
          <strong>Configuration:</strong> Set <code className="text-foreground">VITE_API_BASE_URL</code> environment variable
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Default: <code className="text-foreground">/api</code> (relative to current host)
        </p>
      </div>
    </div>
  );
}
