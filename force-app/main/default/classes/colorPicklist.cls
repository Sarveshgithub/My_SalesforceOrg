public class colorPicklist {
@AuraEnabled
    public static List<Contact> fetchContact()
    {
        List<Contact> contactDetail =new List<Contact>();
        for(Contact con:[select FirstName,LastName,LeadSource from Contact limit 10])
        {
            contactDetail.add(con);
           // system.debug('========='+contactDetail);
        }
        return contactDetail;
    }  
}