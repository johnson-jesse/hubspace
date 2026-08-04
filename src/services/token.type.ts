export interface TokenPayload {
  userId: number;
  email: string;
}

export interface TokenService {
  sign(payload: TokenPayload): string;
  verify(token: string): TokenPayload;
}
