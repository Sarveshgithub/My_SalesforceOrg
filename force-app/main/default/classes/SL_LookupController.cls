public class SL_LookupController {
    
    @AuraEnabled
    public static List < sObject > fetchLookUpValues(String strObjName) {
        system.debug('ObjectName-->' + strObjName);
        
        List < sObject > returnList = new List < sObject > ();
        String sQuery =  'select id, Name from ' +strObjName;
        List < sObject > lstOfRecords = Database.query(sQuery);
        
        System.debug('============list of Record======'+lstOfRecords);
        for (sObject obj: lstOfRecords) {
            returnList.add(obj);
        }
        return returnList;
    }
}