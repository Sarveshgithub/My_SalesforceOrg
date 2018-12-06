public class hierarchy {
@AuraEnabled 
    public static List<Contact> getData()
    {
       return [SELECT Id, NAME FROM Contact Limit 10]; 
    }
    
}