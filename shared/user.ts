export interface PublicUser {
  id: number;
  name: string;
  email: string;
  color: string | null;
  createdAt: Date;
}

export interface UserFriends {
  me: PublicUser | null;
  friends: PublicUser[];
}