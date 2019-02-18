export class TokenModel {
  _id?: string;

  userId?: string;

  // Request
  grant_type:
    | string
    | "password"
    | "client_credentials"
    | "refresh_token"
    | "authorization_code";

  useragent: string;
  // bearer
  token_type: string | "bearer";

  issue_at : number;
  expires_in: number;
  expires_at: number;
  refresh_token: string;
  access_token: string;

  username?: string;

  hasPassword? :boolean;
  groups?: string[];
}
