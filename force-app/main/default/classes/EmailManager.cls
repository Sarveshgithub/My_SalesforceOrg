public class EmailManager {

    public static void sendMail( String Address,string subject, string body)
    {
       Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
       string [] toaddress = new string[]{address};
       
       mail.setToAddresses(toaddress);

        //Avoid to hit the max number of emails
        mail.saveAsActivity = false;
        //mail.setTargetObjectId(userId);
    
       mail.setSubject(subject);
       mail.setPlainTextBody(body);

       Messaging.sendEmail( new Messaging.SingleEmailMessage[] { mail } );
    }
}