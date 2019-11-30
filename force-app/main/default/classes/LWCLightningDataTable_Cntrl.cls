/**
 * \arg ClassName        : LWCLightningDataTable_Cntrl
 * \arg CreatededBy      : Sarvesh
 * \arg Description      : controller of data table 
 */
public with sharing class LWCLightningDataTable_Cntrl {
    @AuraEnabled(cacheable=true)
    public static List<Account> fetchAccountDetails(){
        return [Select Id,Name,Industry,Phone From Account Order By CreatedDate Desc Limit 10];
    }
}