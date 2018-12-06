/**
* @ClassName    : No_of_Class 
* @JIRATicket   :
* @CreatedOn    : 14/9/2017
* @CreatedBy    : Sarvesh Kumar
* @ModifiedBy   :
* @Description  : This Apex class is Handle the trigger on Contact object.
*/
public without sharing class No_of_Class{
    
    //Map is used for stored the account id with there contact id
    Map<Account,Integer> mapAccountId=new Map<Account,Integer>();     
    //Set used for stored the Account Id
    Set<Id> setAccId = new Set<ID>();      
    //List is used for stored the map key's value
    List<Account> lstAccount =new List<Account>();
    //List is stored the contact Id
    List<Id> contactId = new List<Id>();
    /**
    * @MethodName :   isAfterInsert
    * @param      :   LIST<Contact> lstContact	
    * @Description:   This method is used for count the contact Account custom field with API name is ContactName__c 
    **/
    
    public void isAfterInsert(LIST<Contact> lstContact){
        //Method is used for count the no of contact
        lstCountContact(lstContact);    
    }
    public void lstCountContact(LIST<Contact> lstContact)
    {
			for(Contact cont: lstContact)
			{
				setAccId.add(cont.accountID);
        	}
        	for(Account accId:[ select id ,
                                    (select id from Contacts)
                                    from Account where id in :setAccId])
        	{      
            	for(Contact conName:accId.contacts)
            	{
                	contactId.add(conName.Id);  
                }
            	mapAccountId.put(accId,contactId.size() );
        	}
       	   for(Account accId:mapAccountId.keySet())
        	{
            	Integer getMapvalue= mapAccountId.get(accId);
                accId.NoofContact__c = getMapvalue;
                lstAccount.add(accId);
        	}
      		update lstAccount;
    }
    
}