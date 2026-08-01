import type { AuthService } from "./auth.type.js";
import type { TokenService } from "./token.type.js";
import type { UserService } from "./user.type.js";

export interface AppDependencies {
  userService: UserService;
  authService: AuthService;
  tokenService: TokenService;
}
