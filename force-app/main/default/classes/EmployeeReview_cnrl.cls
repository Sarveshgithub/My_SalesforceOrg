public with sharing class EmployeeReview_cnrl {
    @AuraEnabled 
    public static user fetchUserDetail(){
        return [Select id,Name,SmallPhotoUrl, FullPhotoUrl
                From User
                Where Id =: Userinfo.getUserId()];
    }
    @AuraEnabled
    public static List<Assignment__c> getEmployeeDetails(Id projectId){
        return [Select Id,Employee__r.Name,Employee__r.Employee_Role__r.Name From Assignment__c where Project__c =: projectId];
    }
}