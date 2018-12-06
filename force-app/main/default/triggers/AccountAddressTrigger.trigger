trigger AccountAddressTrigger on Account (after insert, after update) {
    if(Trigger.isInsert) {
        if(Trigger.isAfter) { 
            for(Account objAcc : Trigger.New) {
                if(objAcc.BillingPostalCode != null && objAcc.Match_Billing_Address__c == true) {
                    objAcc.ShippingPostalCode = objAcc.BillingPostalCode;
                }
            }
                
            
        }
        if(Trigger.isBefore) {
            
        }
    }
    if(Trigger.isUpdate) {
        
    }
}