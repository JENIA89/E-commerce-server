export interface ResponseError extends Error {
  status?: number;
  message: string;
}
