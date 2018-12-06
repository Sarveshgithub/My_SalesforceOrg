public class SL_AccountSortingController {
    
    @AuraEnabled
    public static list < Account > fetchAccount(String sortField, boolean isAsc) {
        String sSoql = 'SELECT Name, AccountNumber, Phone, Type ';
        sSoql += 'From Account';
        system.debug('sortField-->' + sortField);
        
        if (sortField != '') {
            sSoql += ' order by ' + sortField;
            
            // if isAsc is equal tp ture then set 'asc' order otherwise set 'desc' order.
            if (isAsc) {
                sSoql += ' asc';
            } else {
                sSoql += ' desc';
            }
        }
        // set record limit to query 
        sSoql += ' LIMIT 20';
        
        System.debug('@Developer -->sSoql:' + sSoql);
        list <Account> lstResult;
        try {
            system.debug('The query is' + sSoql);
            lstResult = Database.query(sSoql);
            List < Account > returnList = new List < Account > ();
            
            for (Account c: lstResult) {
                returnList.add(c);
            }
            return returnList;
        } 
        catch (Exception ex) {
            // for handle Exception
            return null;
        }
    }
    
    @AuraEnabled
    public static List<ListView> getListViews() {
        List<ListView> listviews = 
            [SELECT Id, Name FROM ListView WHERE SobjectType = 'Account' limit 5];
        return listviews;
    }
    
}