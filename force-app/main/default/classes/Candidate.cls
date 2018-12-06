public class Candidate {
    @AuraEnabled
    //List<Cus_Candidate__c> l=new List<Cus_Candidate__c>();
    public static Id setSaveData(Cus_Candidate__c newObject)
    {
        system.debug('Inside Class!!!!!!');
        system.debug('>>>>>>>>>>>>>>'+newObject);
        insert newObject;  
        
    	return newObject.ID  ;   
    }
}