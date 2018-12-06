/**
* \arg ClassName        : Test_BannerLightningController
* \arg JIRATicket       : SLCOMMUNIT-272
* \arg CreatedOn        : 01/Oct/2016
* \arg LastModifiedOn   : 15/Jun/2017
* \arg CreatededBy      : Nilesh 
* \arg ModifiedBy       : Nilesh
* \arg Description      : Test class for IntranetBannerLightningController 
*/
@isTest
private class Test_BannerLightningController { 

    @isTest 
    static void bannerUnitTest() {
        IntranetBannerLightningController.getBannerDocuments(UserInfo.getUserId());
        IntranetBannerLightningController.urlWrapper obj = IntranetBannerLightningController.fetchUrlDetails();
        System.assertEquals(obj.strOrgId, UserInfo.getOrganizationId());
        System.assertEquals(obj.strBaseUrl, String.valueof(URL.getSalesforceBaseUrl().toExternalForm()));
    }
}