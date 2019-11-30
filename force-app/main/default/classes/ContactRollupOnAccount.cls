/**
 * \arg ClassName        : ContactRollupOnAccount
 * \arg CreatededBy      : Sarvesh
 * \arg Description      : custom contact rollup 
 */
global class ContactRollupOnAccount implements Database.Batchable<sObject>, Database.Stateful{
    global final Set<Id> AccountIds;
    global ContactRollupOnAccount(Set<ID> accountId){
        this.AccountIds = accountId;
    }
    global Database.QueryLocator start(Database.BatchableContext info){ 
        return Database.getQueryLocator('SELECT Number_of_Contacts__c,(SELECT id FROM Contacts) FROM Account WHERE id IN:AccountIds');
    }     
    global void execute(Database.BatchableContext info, List<Account> scope){
        List<Account> accUpdateList = new List<Account>();
        For(Account acc : scope){
            acc.Number_of_Contacts__c = acc.Contacts.size();
            accUpdateList.add(acc);
        }
        try{
            Database.update( accUpdateList,false);
        }Catch(Exception e){
            System.debug('Exception :'+e.getMessage());
        }
    }     
    global void finish(Database.BatchableContext info){     
    } 
}