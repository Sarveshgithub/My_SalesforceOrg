public class SL_customLookUpController {
    @AuraEnabled
    public static List<sObject> fetchLookUpValues(String searchKeyWord, String objName) {
        system.debug('ObjectName-->' + objName);
        String searchKey = searchKeyWord + '%';
        List<sObject> lstSobject = new List<sObject>();
        String sQuery = 'select id, Name from '+objName +' where Name LIKE: searchKey order by createdDate DESC limit 5';
        List<sObject> lstOfRecords = Database.query(sQuery);
        for (sObject obj: lstOfRecords) {
            lstSobject.add(obj);
        }
        return lstSobject;
    }
}