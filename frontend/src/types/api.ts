// API Response Types
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface HealthResponse {
  status: 'OK' | 'ERROR';
  timestamp: string;
  version?: string;
}

// Task Entity
export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskDto {
  title: string;
  description: string;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  completed?: boolean;
}

// API Error
export interface ApiError {
  status: number;
  message: string;
  details?: string;
}
