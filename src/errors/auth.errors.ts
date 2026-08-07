export class InvalidCredentialsError extends Error {
  statusCode: number;
  code: string;

  constructor(message: string, statusCode = 401, code = "INVALID_CREDENTIALS") {
    super(message);

    this.name = "InvalidCredentialsError";
    this.statusCode = statusCode;
    this.code = code;
  }
}