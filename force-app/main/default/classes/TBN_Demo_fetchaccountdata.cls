public class TBN_Demo_fetchaccountdata {
    @AuraEnabled
    public static List<Contact> fetchaccout()
    {
        List<Contact> lstCon = new List<Contact>();
        for(Contact objCon: [Select FirstName,Email from Contact limit 10]){
            lstCon.add(objCon);
            
        }
        return lstCon;
        
    }

}