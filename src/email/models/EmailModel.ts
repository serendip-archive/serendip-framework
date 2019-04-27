
/**
 * @internal @module Email
 */
export interface EmailTemplateInterface {
  name: string;
  data?: any;
  source?: string;
  
}

export interface EmailAttachmentInterface {
  /**
   * path to read file from
   */
  path?: string;

  /**
   * mime type example : application/zip or image/jpeg
   */
  contentType?: string;

  content?: string;

  encoding?: string;

  /**
   * file name will renamed to this
   */
  filename?: string;

  headers?: any;
}

export class EmailModel {
  text?: string;

  subject: string;

  html?: string;

  /**
   *  example : "you <username@your-email.com>"
   */
  from: string;

  /*
   * example : someone@your-email.com, another@your-email.com
   */
  to: string;

  /*
   * example : someone@your-email.com, another@your-email.com
   */
  cc?: string;

  /**
   * array of attachments
   */
  attachments?: EmailAttachmentInterface[] | any;

  template?: EmailTemplateInterface;
}
