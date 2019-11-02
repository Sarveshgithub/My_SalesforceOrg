global class LeadProcessor implements Database.Batchable<sObject> {
    global Database.QueryLocator start(Database.BatchableContext bc) {
        return Database.getQueryLocator(
            'SELECT ID,LeadSource FROM Lead'
        );
    }
    global void execute(Database.BatchableContext bc, List<Lead> scope){
        // process each batch of records
        List<Lead> lstLead = new List<Lead>();
        for(Lead obj : scope){
            obj.LeadSource = 'Dreamforce';
            lstLead.add(obj);
        }
        if(!lstLead.isEmpty())
            update lstLead;
    }    
    global void finish(Database.BatchableContext bc){
        // execute any post-processing operations
    }    
}