export class ClientModel {
  _id: string;
  url: string;

  redirectUrl: string;

  // owner
  owner: string;

  // name of the client
  name: string;

  // Hashed secret using secretSalt
  secret: string;

  secretSalt: string;
}
