@isTest
public class AccountManagerTest {
    @isTest 
    static void testGetMethod() {
        Account acc = new Account(Name = 'Test Account');
        insert acc;
        Contact con = new Contact(AccountId = acc.Id, LastName = 'Test Contact');
        insert con;
        // Set up a test request
        RestRequest request = new RestRequest();
        request.requestUri ='https://mass-edit-lookup-dev-ed.my.salesforce.com/services/Accounts/'+acc.Id+'/contacts';
        request.httpMethod = 'GET';
        RestContext.request = request;
        // Call the method to test
        Account objAcc = AccountManager.getAccount();
        System.assert(objAcc.Name != null);
    }
}