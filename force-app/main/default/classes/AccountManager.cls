@RestResource(urlMapping='/Accounts/*/contacts')
global with sharing class AccountManager {
    @httpGet
    global static Account getAccount(){
        String aa;
        RestRequest request = RestContext.request;
        String accountId = request.requestURI.substringBetween('Accounts/','/contacts');
        Account objAcc =  [SELECT ID, Name , (SELECT ID, Name FROM Contacts) FROM Account Where Id =: accountId limit 1];
        return objAcc;
    }
}