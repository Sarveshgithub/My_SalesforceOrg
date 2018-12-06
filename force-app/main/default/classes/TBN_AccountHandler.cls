/**
* @ClassName    : TBN_AccountHandler 
* @JIRATicket   :
* @CreatedOn    : 12/9/2017
* @CreatedBy    : Sarvesh Kumar
* @ModifiedBy   :
* @Description  : This Apex class is Handle the trigger on Contact object.
*/
public without sharing class TBN_AccountHandler{
    
    //Map is used for stored the account id with there contact name
    Map<Account,String> mapAccountId=new Map<Account,String>();
        
    //Set used for stored the Account Id
    Set<Id> setAccId = new Set<ID>();
        
    //List is used for stored the map key's value
    List<Account> lstAccount =new List<Account>();
    
    /**
    * @MethodName :   isBeforeInsert
    * @param      :   LIST<Contact> lstContact	
    * @Description:   This method is used for validate First name field of contact 
    **/
    
    public void isBeforeInsert(LIST<Contact> lstContact){

        for(Contact conName: lstContact)
            {																					
                if(conName.FirstName==null)
                {
                   conName.addError('Please enter First Name');
                }
            }
    }
    
    /**
    * @MethodName :   isAfterInsert
    * @param      :   LIST<Contact> lstContact	
    * @Description:   This method is used for insert and update the Account custom field with API name is ContactName__c 
    **/
    
    public void isAfterInsert(LIST<Contact> lstContact){
		methodConInsertUpdate(lstContact);	  
    }
    public void isAfterUpdate(LIST<Contact> lstContact,LIST<Contact> lstContactOld){
        methodConInsertUpdate(lstContact);	        
    }
    public void isAfterDelete(List<Contact> lstContact){
      	methodConInsertUpdate(lstContact);
    }
    /**
    * @MethodName : isAfterDelete  
    * @param      : List<Contact> lstContact  
    * @Description: This method is used for delete the contact name from the custom field 
    * **/ 
    public void methodConInsertUpdate(List<Contact> lstContact){
       for(Contact cont: lstContact)
			{
        		//Get All AccountId
				setAccId.add(cont.accountID);
        	}
        	for(Account accId:[ select id ,
                                    (select name from Contacts)
                                    from Account where id in :setAccId])
        	{
           	 	String strConcat ='';
            	for(Contact conName:accId.contacts)
            	{
                	strConcat= strConcat+conName.name+';';   
                }
            	mapAccountId.put(accId, strConcat);
        	}
        
        	for(Account accId:mapAccountId.keySet())
        	{
                String conName= mapAccountId.get(accId);
                accId.ContactName__c = conName;
                lstAccount.add(accId);
        	}
      		update lstAccount; 
    }
}