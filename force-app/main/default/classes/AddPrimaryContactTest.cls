@isTest
public with sharing class AddPrimaryContactTest {
    @testSetup
    static void createData(){
        List<Account> lstAcc = new List<Account>();
        for(Integer i=0 ; i<100;i++){
            Account obj = new Account();
            obj.Name = 'Test'+i;
            obj.BillingState = i < 50 ? 'CA' : 'NY';
            lstAcc.add(obj);
        }
        insert lstAcc;
    }
    @isTest
    static void testPrimaryContact(){
        Contact con = new Contact(FirstName = 'Queueable', LastName = 'Apex');
        insert con;
        String state = 'CA';
        Test.startTest();
        AddPrimaryContact primContact = new AddPrimaryContact(con, state);
        System.enqueueJob(primContact);
        Test.stopTest();
        System.assertEquals(50, [SELECT count() FROM Contact Where accountID IN (SELECT id FROM Account WHERE BillingState = :state)]);
    }
}