public class AccountProcessor {
    @future
    public static void countContacts(List<Id> lstAccountId){
        List<Account> accountListToUpdate = new List<Account>();
        for(Account acc : [Select id ,Name, Number_of_Contacts__c, (Select id, Name From Contacts) from Account Where id in:lstAccountId]){
            acc.Number_of_Contacts__c = acc.Contacts.size();
            accountListToUpdate.add(acc);
        }
        if(!accountListToUpdate.isEmpty())
            update accountListToUpdate;
    }
}