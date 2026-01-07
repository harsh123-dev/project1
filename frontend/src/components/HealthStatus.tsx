import { useState, useEffect, useCallback } from 'react';
import { Activity, CheckCircle, RefreshCw, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { HealthResponse, ApiError } from '@/types/api';
import { mockHealth } from '@/services/mockData';
import api from '@/services/api';

// Toggle to use mock data
const USE_MOCK = true;

type HealthState = 'idle' | 'loading' | 'success' | 'error';

export function HealthStatus() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [state, setState] = useState<HealthState>('idle');
  const [error, setError] = useState<string | null>(null);

  const checkHealth = useCallback(async () => {
    setState('loading');
    setError(null);

    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setHealth({ ...mockHealth, timestamp: new Date().toISOString() });
      setState('success');
      return;
    }

    try {
      const response = await api.getHealth();
      setHealth(response.data);
      setState('success');
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Unable to reach API');
      setHealth(null);
      setState('error');
    }
  }, []);

  useEffect(() => {
    checkHealth();
  }, [checkHealth]);

  return (
    <div className={`flex items-center gap-3 rounded-lg border p-4 ${
      state === 'error' 
        ? 'border-destructive/50 bg-destructive/5' 
        : 'border-border bg-card'
    }`}>
      <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
        state === 'error' ? 'bg-destructive/10' : 'bg-muted'
      }`}>
        <Activity className={`h-5 w-5 ${
          state === 'error' ? 'text-destructive' : 'text-muted-foreground'
        }`} />
      </div>
      
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">API Status</span>
          {state === 'loading' ? (
            <RefreshCw className="h-4 w-4 animate-spin text-muted-foreground" />
          ) : state === 'success' ? (
            <CheckCircle className="h-4 w-4 text-green-500" />
          ) : state === 'error' ? (
            <AlertTriangle className="h-4 w-4 text-destructive" />
          ) : null}
        </div>
        <p className={`text-xs ${state === 'error' ? 'text-destructive' : 'text-muted-foreground'}`}>
          {state === 'loading' 
            ? 'Checking connection...' 
            : state === 'error'
              ? error
              : health 
                ? `Connected · Last checked: ${new Date(health.timestamp).toLocaleTimeString()}`
                : 'Not checked'
          }
        </p>
      </div>

      <Button 
        variant={state === 'error' ? 'destructive' : 'ghost'}
        size="sm" 
        onClick={checkHealth}
        disabled={state === 'loading'}
      >
        <RefreshCw className={`h-4 w-4 ${state === 'loading' ? 'animate-spin' : ''}`} />
        {state === 'error' && <span className="ml-2">Retry</span>}
      </Button>
    </div>
  );
}
