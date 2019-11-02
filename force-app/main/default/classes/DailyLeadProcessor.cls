global class DailyLeadProcessor implements Schedulable {   
    global void execute(SchedulableContext ctx) {
        List<Lead> updateLeadSource = new List<Lead>();
        for(Lead lead : [SELECT Id, LeadSource FROM Lead  WHERE LeadSource != null LIMIT 200 ]){
            lead.LeadSource = 'Dreamforce';
            updateLeadSource.add(lead);
        }
        if(!updateLeadSource.isEmpty())
            update updateLeadSource;
    }
}