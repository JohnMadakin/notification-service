export default class NotificationService {
  private accessKey: string;

  constructor(apiKey: string) {
    this.accessKey = apiKey;
  }

  public sendEmail(emailData = {}): any {
    return emailData;
  }

  public sendSMS(smsData = {}): any {
    return smsData;
  }

  public sendWhatsapp(whatsappData = {}): any {
    return whatsappData;
  }

  public sendMesage(messageData = {}): any {
    return messageData;
  }
}
