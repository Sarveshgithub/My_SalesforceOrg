public class Apex_Candidate_Class {
    
	@AuraEnabled
		public static void setSaveData(Cus_Candidate__c newObject)
		{
            system.debug('Inside Class!!!!!!');
           system.debug('>>>>>>>>>>>>>>'+newObject);
			insert newObject;
             
		}
}