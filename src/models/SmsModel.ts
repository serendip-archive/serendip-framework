export enum SmsStatusTypes{

    SENT,
    RECEIVED


}

export class SmsModel{


   from : string;
   to : string;

   senderUserId : string;

   recipientContactId : string;


}