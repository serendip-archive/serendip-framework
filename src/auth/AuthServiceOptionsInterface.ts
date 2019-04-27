/**
 * @internal @module Auth
 */
export interface AuthServiceOptionsInterface {
  /**
   * in milliseconds
   */
  tokenExpireIn?: number;
  /**
   * maximum token count per user
   */
  maxTokenCount?: number;
  mobileConfirmationRequired?: boolean;
  emailConfirmationRequired?: boolean;
  smsProvider?: string;
  emailProvider?: string;
  defaultMobileCountryCode?: string;
}
