trigger Trigger_Account on Account (after insert, after update, after delete, before insert, before update, before delete) {
    if(Trigger.isInsert) {  
    List<Opportunity> oppList = new List<Opportunity>();
    Map<Id, Account> mapAccount = new Map<Id, Account>([select Id,(select Id from Opportunities) from Account where Id in :Trigger.New]);
    for(Account a : Trigger.New) {
        if(mapAccount.get(a.Id).Opportunities.size() == 0) {
            oppList.add(new Opportunity(Name=a.Name + ' Opportunity',
                                       StageName='Prospecting',
                                       CloseDate=System.today().addMonths(1),
                                       AccountId=a.Id));
        }
    }
    if (oppList.size() > 0) {
        insert oppList;
    }
   }
   
    if(Trigger.isdelete){ 
        if(Trigger.isBefore) {
            for(Account a:[SELECT Id FROM Account
                     WHERE Id IN (SELECT AccountId FROM Opportunity) AND
                     Id IN :Trigger.old]) {
                         
                Trigger.oldMap.get(a.Id).addError('Cannot delete account with related opportunities.');
            }
        }
    }
}