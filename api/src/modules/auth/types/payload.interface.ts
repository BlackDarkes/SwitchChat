export interface IPayload {
  id: string;
  email: string;
  tag: string;
  iat?: number;
  exp?: number;
}