type PresenceUser = {
  userId: number;
  name: string;
  email: string;
  connectedAt: Date;
};

class PresenceManager {
  private users = new Map<string, PresenceUser>();

  add(connectionId: string, user: PresenceUser) {
    this.users.set(connectionId, user);
  }

  remove(connectionId: string) {
    this.users.delete(connectionId);
  }

  getActiveUsers() {
    return Array.from(this.users.values());
  }
}

export const presenceManager = new PresenceManager();
