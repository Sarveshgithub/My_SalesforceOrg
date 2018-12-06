@isTest
public class changeLeadOwnerTest {
    
    @testSetup static void testSetup() {
        Profile objProfile = [SELECT Id FROM Profile WHERE Name = 'System Administrator' Limit 1];  
        User objUser = new User(Alias = 'trekt', 
                                Email = 'trekbin-test@trekbin.com', 
                                EmailEncodingKey = 'UTF-8', 
                                LastName = 'Test',
                                LocaleSidKey = 'en_US', 
                                LanguageLocaleKey='en_US', 
                                ProfileId = objProfile.Id, 
                                TimeZoneSidKey = 'America/Los_Angeles', 
                                UserName = 'trekbin-test@trekbin.com');
        insert objUser;
        insert new Lead(LastName = 'TestL', 
                        Company = 'TestC', 
                        Status = 'Open - Not Contacted', 
                        OwnerId =objUser.Id);       
    }
    
    private static testMethod void changeLeadOwnerTestMethod() {
        Test.startTest(); 
        List<Lead> lstLead = [SELECT OwnerId FROM Lead WHERE LastName = 'TestL' Limit 1];
        List<User> lstUser = [SELECT Id FROM User WHERE LastName = 'Test'];
        Test.setCurrentPage(Page.changeLeadOwner);
        ApexPages.StandardSetController stdSetController = new ApexPages.StandardSetController(lstLead);
        stdSetController.setSelected(lstLead);
        changeLeadOwner objCLO = new changeLeadOwner(stdSetController);
        objCLO.cancelAction();
        objCLO.objLead = new Lead(OwnerId = lstUser[0].Id); 
        objCLO.updateLeadOwnerAction();
        Test.stopTest();
    }
}