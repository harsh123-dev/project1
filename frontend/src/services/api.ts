import type { 
  ApiResponse, 
  HealthResponse, 
  Task, 
  CreateTaskDto, 
  UpdateTaskDto,
  ApiError 
} from '@/types/api';

// Configure your backend URL via environment variable
const API_BASE_URL = "/api";

// Request timeout in milliseconds
const REQUEST_TIMEOUT = 10000;

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const defaultHeaders: HeadersInit = {
      'Content-Type': 'application/json',
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...defaultHeaders,
          ...options.headers,
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const error: ApiError = {
          status: response.status,
          message: getErrorMessage(response.status),
        };
        throw error;
      }

      const data = await response.json();
      return {
        data,
        status: response.status,
      };
    } catch (error) {
      clearTimeout(timeoutId);

      if ((error as ApiError).status) {
        throw error;
      }

      if ((error as Error).name === 'AbortError') {
        throw {
          status: 408,
          message: 'Request timed out. Please check your connection and try again.',
        } as ApiError;
      }

      throw {
        status: 0,
        message: 'Unable to connect. Please verify the API is running and try again.',
      } as ApiError;
    }
  }

  // Health Endpoint
  async getHealth(): Promise<ApiResponse<HealthResponse>> {
    return this.request<HealthResponse>('/health');
  }

  // Tasks CRUD
  async getTasks(): Promise<ApiResponse<Task[]>> {
    return this.request<Task[]>('/tasks');
  }

  async getTask(id: string): Promise<ApiResponse<Task>> {
    return this.request<Task>(`/tasks/${id}`);
  }

  async createTask(task: CreateTaskDto): Promise<ApiResponse<Task>> {
    return this.request<Task>('/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
    });
  }

  async updateTask(id: string, task: UpdateTaskDto): Promise<ApiResponse<Task>> {
    return this.request<Task>(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(task),
    });
  }

  async deleteTask(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/tasks/${id}`, {
      method: 'DELETE',
    });
  }
}

function getErrorMessage(status: number): string {
  if (status >= 500) {
    return 'Server error. The API is temporarily unavailable. Please try again later.';
  }
  if (status === 404) {
    return 'Resource not found.';
  }
  if (status === 403) {
    return 'Access denied.';
  }
  if (status === 400) {
    return 'Invalid request. Please check your input.';
  }
  return 'An unexpected error occurred.';
}

export const api = new ApiService(API_BASE_URL);
export default api;
