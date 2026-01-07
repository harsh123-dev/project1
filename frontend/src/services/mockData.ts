import type { Task, HealthResponse } from '@/types/api';

// Mock data for development when backend is not available
export const mockHealth: HealthResponse = {
  status: 'OK',
  timestamp: new Date().toISOString(),
  version: '1.0.0',
};

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Review Q4 sales report',
    description: 'Analyze quarterly performance metrics and prepare summary for stakeholders',
    completed: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T14:30:00Z',
  },
  {
    id: '2',
    title: 'Schedule team sync meeting',
    description: 'Coordinate with team leads to find a suitable time slot for weekly standup',
    completed: false,
    createdAt: '2024-01-15T11:00:00Z',
    updatedAt: '2024-01-15T11:00:00Z',
  },
  {
    id: '3',
    title: 'Update project documentation',
    description: 'Revise onboarding guides and ensure all procedures are current',
    completed: false,
    createdAt: '2024-01-15T12:00:00Z',
    updatedAt: '2024-01-15T12:00:00Z',
  },
];

// Helper to generate unique IDs for mock operations
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
