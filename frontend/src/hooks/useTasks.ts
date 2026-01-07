import { useState, useCallback } from 'react';
import type { Task, CreateTaskDto, UpdateTaskDto, ApiError } from '@/types/api';
import { mockTasks, generateId } from '@/services/mockData';
import api from '@/services/api';
import { toast } from '@/hooks/use-toast';

// Toggle this to use real API vs mock data
const USE_MOCK = true;

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const showError = useCallback((message: string) => {
    setError(message);
    toast({
      variant: 'destructive',
      title: 'Error',
      description: message,
    });
  }, []);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    if (USE_MOCK) {
      setTasks(mockTasks);
      setLoading(false);
      return;
    }

    try {
      const response = await api.getTasks();
      setTasks(response.data);
    } catch (err) {
      const apiError = err as ApiError;
      showError(apiError.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, [showError]);

  const createTask = useCallback(async (dto: CreateTaskDto) => {
    setLoading(true);
    setError(null);

    if (USE_MOCK) {
      const newTask: Task = {
        id: generateId(),
        ...dto,
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setTasks(prev => [...prev, newTask]);
      setLoading(false);
      toast({ title: 'Task created', description: dto.title });
      return newTask;
    }

    try {
      const response = await api.createTask(dto);
      setTasks(prev => [...prev, response.data]);
      toast({ title: 'Task created', description: dto.title });
      return response.data;
    } catch (err) {
      const apiError = err as ApiError;
      showError(apiError.message || 'Failed to create task');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [showError]);

  const updateTask = useCallback(async (id: string, dto: UpdateTaskDto) => {
    setLoading(true);
    setError(null);

    if (USE_MOCK) {
      setTasks(prev => prev.map(task => 
        task.id === id 
          ? { ...task, ...dto, updatedAt: new Date().toISOString() }
          : task
      ));
      setLoading(false);
      return;
    }

    try {
      const response = await api.updateTask(id, dto);
      setTasks(prev => prev.map(task => 
        task.id === id ? response.data : task
      ));
    } catch (err) {
      const apiError = err as ApiError;
      showError(apiError.message || 'Failed to update task');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [showError]);

  const deleteTask = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);

    if (USE_MOCK) {
      setTasks(prev => prev.filter(task => task.id !== id));
      setLoading(false);
      toast({ title: 'Task deleted' });
      return;
    }

    try {
      await api.deleteTask(id);
      setTasks(prev => prev.filter(task => task.id !== id));
      toast({ title: 'Task deleted' });
    } catch (err) {
      const apiError = err as ApiError;
      showError(apiError.message || 'Failed to delete task');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [showError]);

  const toggleComplete = useCallback(async (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      await updateTask(id, { completed: !task.completed });
    }
  }, [tasks, updateTask]);

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleComplete,
  };
}
