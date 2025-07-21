export interface User {
  name: string;
  email?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

