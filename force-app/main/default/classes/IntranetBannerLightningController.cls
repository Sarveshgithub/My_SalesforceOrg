/**
* \arg ClassName        : IntranetBannerLightningController 
* \arg JIRATicket       : SLCOMMUNIT-272
* \arg CreatedOn        : 01/Oct/2016
* \arg LastModifiedOn   : 15/Jun/2017
* \arg CreatededBy      : Nilesh 
* \arg ModifiedBy       : Nilesh
* \arg Description      : Controller class for IntranetBanner Lightning component 
*/
public with sharing class IntranetBannerLightningController {
    
    /**
        @MethodName     : getBannerDocuments
        @Param          : document folder id
        @Description    : This method used to get the documents uploaded in the provided folder
    **/
    @AuraEnabled
    public static List<Document> getBannerDocuments(String targetFolderId) {
        
        Schema.SObjectType targetTypeDocument = Schema.getGlobalDescribe().get('Document');
        Schema.DescribeSObjectResult sobjResultForDocument = targetTypeDocument.getDescribe();
                
        Map<String, Schema.SObjectField> fieldMap = sobjResultForDocument.fields.getMap();
        for (String key : fieldMap.keySet()) {

        Schema.DescribeFieldResult descField = fieldMap.get(key).getDescribe();
        if(!descField.isaccessible() && (descField.getName() == 'Name' || descField.getName() == 'Id' || descField.getName() == 'Description' || descField.getName() == 'folderid' || descField.getName() == 'Type'))
            return null;
        }

        List<Document> lstDocuments = [Select Name, Id,Description, folderid From Document where folderid=:(Id)targetFolderId AND (Type ='jpeg' OR Type ='jpg' OR Type='png' OR Type='gif') ORDER BY Name];
        return lstDocuments;
    }
    
    /* Start - urlWrapper class */
    public class urlWrapper {
        @AuraEnabled
        public String strBaseUrl        {get;set;}
        @AuraEnabled
        public String strOrgId          {get;set;}
        @AuraEnabled
        public String strSitePrefix     {get;set;}
        
        public urlWrapper(String strBaseUrl, String strOrgId, String strSitePrefix) {
            this.strBaseUrl = strBaseUrl;
            this.strOrgId = strOrgId;
            this.strSitePrefix = strSitePrefix;
        }
    }
    /* End - urlWrapper class */
    
    /**
        @MethodName     : fetchUrlDetails
        @Param          : NA
        @Description    : This method used to get the url information
    **/
    @AuraEnabled
    public static urlWrapper fetchUrlDetails() {
        return new urlWrapper(String.valueof(URL.getSalesforceBaseUrl().toExternalForm()), UserInfo.getOrganizationId(), Site.getPathPrefix().removeEnd('/s'));
    }
    /* End */
}
/* End */