declare namespace Express {
  export interface Request {
    user?: Record<string, string | number>;
  }
}
