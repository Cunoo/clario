// src/types/User.ts
export interface UserCreate {
  username: string;
  password: string;
}

export interface UserResponse {
  id: number;
  username: string;
}
