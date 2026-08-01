export interface User {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  created_at: string;
}

export interface UserService {
  registerUser(name: string, email: string, password: string): Promise<User>;
  getUserById(id: number): User;
}

export interface UserRepository {
  createUser(name: string, email: string, passwordHash: string): User;
  findUserByEmail(email: string): User | undefined;
  findUserById(id: number): User | undefined;
}
