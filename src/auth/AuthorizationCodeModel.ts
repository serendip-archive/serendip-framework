export class AuthorizationCodeModel {
  codeSign?: string;
  codeHash?: string;
  codeSalt?: string;
  redirectUri?: string;
  _id?: string;
  userId?: string;
  tokenId?: string;

  clientId?: string;
  used?: number;

  date?: number;
}
