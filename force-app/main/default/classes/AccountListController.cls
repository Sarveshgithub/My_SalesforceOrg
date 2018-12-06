public class AccountListController {
    @AuraEnabled 
    public static List<Account> getAccounts(){
        return [Select Id , Name , Rating, Type , Phone from Account limit 5];  
    } 
}