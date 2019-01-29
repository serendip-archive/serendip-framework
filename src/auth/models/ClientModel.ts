// This client will be used to keep data for client authorization mechanism
// as reminder: OAuth 2.0 Authorization Code Grant The Authorization Code grant type is used by confidential and public clients to exchange an authorization code for an access token. After the user returns to the client via the redirect URL, the application will get the authorization code from the URL and use it to request an access token.

export class ClientModel {
  _id: string;

  // url for showing to user on SSO page
  url: string;

  // redirect_uri
  // If the redirect URI was included in the initial authorization request, the service must require it in the token request as well. The redirect URI in the token request must be an exact match of the redirect URI that was used when generating the authorization code. The service must reject the request otherwise.
  redirectUrl: string;

  // base64 logo image
  logo: string;

  // description for this client
  description: string;

  // userId who created this client
  owner: string;

  // name of the client
  name: string;

  // Hashed secret using secretSalt
  secret: string;

  secretSalt: string;

  // Possible scopes for this client to grant access to
  scopes: string[];
}
