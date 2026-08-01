import type { AuthService } from "./services/auth.type";
import type { UserService } from "./services/user.type";

export interface AppDependencies {
  userService: UserService;
  authService: AuthService;
}
