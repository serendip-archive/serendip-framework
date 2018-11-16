export class UserModel {
  public _id: string;

  public registeredAt: number;
  public registeredByIp: string;
  public registeredByUseragent: string;

  public username: string;
  public password: string;
  public passwordSalt: string;

  public passwordChangedAt: number;
  public passwordChangedByIp: string;
  public passwordChangedByUseragent: string;

  public emailVerificationCode: string;
  public mobileVerificationCode: string;

  public email: string;
  public mobile: string;

  public emailVerified: boolean;
  public mobileVerified: boolean;

  public passwordResetToken: string;
  public passwordResetTokenIssueAt: number;
  public passwordResetTokenExpireAt: number;

  public groups: string[];

  public extra?: any;
}
