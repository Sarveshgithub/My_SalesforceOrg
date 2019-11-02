@isTest
public class AccountProcessorTest {
    @IsTest
    private static void testCountNoContact() {
        Account objAcc = new Account(Name = 'TestAccount');
        insert objAcc;
        Contact objCon = new Contact(Lastname = 'TestName',AccountId = objAcc.ID);
        insert objCon;
        Test.startTest();
        AccountProcessor.countContacts(new List<ID>{objAcc.Id});
        Test.stopTest();
        List<Account> getAcc = [Select Id,Number_of_Contacts__c From Account Where ID = : objAcc.ID Limit 1];
        System.assertEquals(1, getAcc[0].Number_of_Contacts__c);
    }
}