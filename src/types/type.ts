import type { AuthService } from "./auth.type";
import type { TokenService } from "./token.type";
import type { UserService } from "./user.type";

export interface AppDependencies {
  userService: UserService;
  authService: AuthService;
  tokenService: TokenService;
}
