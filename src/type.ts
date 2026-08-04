import type { UserService } from "./services/user.service.type";
import type { AuthService } from "./services/auth.service.type";
import type { TokenService } from "./services/token.type";

export interface AppDependencies {
  userService: UserService;
  authService: AuthService;
  tokenService: TokenService;
}
