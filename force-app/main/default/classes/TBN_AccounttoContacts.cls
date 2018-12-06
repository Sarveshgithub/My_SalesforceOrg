/**
* @ClassName    : TBN_AccounttoContacts
* @JIRATicket   :  
* @CreatedOn    : 16/9/2017   
* @Description  : This is handler class of visual page to show the conctacts related with account 
*/
public class TBN_AccounttoContacts{
    List<wrapperclass> lstTempWrapper = new List<wrapperclass>();
    //All local and global variable declaration
    
    public List<wrapperclass> lstWrapper     {get;set;} 
    public Id strAccountId					 {get;set;}
    public String conId						 {get;set;}
    public Id delCon					 	 {get;set;}
    public Contact objContact1               {get;set;}
    public Boolean isnewRow=false;
    
    /*******WRAPPER CLASS****/
    Public class wrapperclass{
    public Boolean isSave                    {get;set;}
    public Boolean isEdit                    {get;set;}
    public Boolean isDelete                  {get;set;}
    public Contact objContact                {get;set;}
        
        public wrapperclass( boolean isSavee,Boolean isEditt ,Contact objCon){
            isSave = isSavee;
            isEdit = isEditt;
           // isDelete=isDelete;
            //isDelete = isDelete;
            objContact = objCon;
        }
    }
    /*
    @MethodName : TBN_AccounttoContacts constructor
    @param      : 
    @Description: This constructor will call the two method.
    */ 
    public TBN_AccounttoContacts(){
        initialise();
        fetchAccountRelatedContacts();
        //delContact();
    }
    /*
    @MethodName : initialise 
    @param      : no parameter
    @Description: this method will declared the two list
    */
    private void initialise(){
       // lstContact = new List<Contact>();
        lstWrapper = new List<wrapperclass>();
        conId='';
        //strAccountId = '';
    }
    /*
    @MethodName : fetchAccountRelatedContacts
    @param      : no parameter
    @Description: onBeforeInsert method called on on Before Insert of Account record
    */
    private void fetchAccountRelatedContacts()
    {
         strAccountId = Apexpages.currentPage().getParameters().get('AccId');	
         //system.debug('value===>>>>'+strAccountId); 
         for(Contact objCon :[select Id,FirstName, LastName,Email,Title 
                                    from Contact
                                    where Account.Id=:strAccountId]){
                                       // system.debug('>>'+objCon.FirstName);
                                       // system.debug('>>'+objCon.LastName);
                                       // system.debug('>>'+objCon.Email);
                                       // system.debug('>>'+objCon.Title);
            //  lstContact.add(objCon); 
              wrapperclass objWrapper = new wrapperclass(false, true,objCon);
              lstWrapper.add(objWrapper);
        }  
    }  
     /*
    @MethodName : saveAcc
    @param      : no parameter
    @Description: this method call from vf page on click the save action
    */
    public void onEditSave(){
        //system.debug('========strContact=======>>>>'+conId);
        
        
        
        for(wrapperclass objWrapper : lstWrapper){
           // system.debug('========conId=======>>>>'+conId);
           // system.debug('========isEdit=======>>>>'+objWrapper.isEdit);
           // system.debug('========isSave=======>>>>'+objWrapper.isSave);
           // system.debug('========objContact=======>>>>'+objWrapper.objContact); 
            
            //if(isnewRow==true)
           // {
            //  contact updateContact=new contact( AccountId= Apexpages.currentPage().getParameters().get('AccId') ,
             /*       					         FirstName= objWrapper.objContact.FirstName,
                                      		     LastName=objWrapper.objContact.LastName,
                                      		     Email=objWrapper.objContact.Email,
                                      		     Title=objWrapper.objContact.Title 
                								 );
             insert updateContact;
           }*/
            if (conId == objWrapper.objContact.Id){
                objWrapper.isEdit = objWrapper.isEdit ? false : true;
                objWrapper.isSave = objWrapper.isSave ? false : true;
                  //  objWrapper.isDelete=objWrapper.isDelete? false:true;
                  // system.debug('========insideelse=======>>>>');
                  // Contact conDelete = [Select id from Contact where id = :conID];
                  //    delete conDelete;
                  // contact updateContact=new contact(Id=conID,
                    					  //      FirstName= objWrapper.objContact.FirstName,
                                      	  //    LastName=objWrapper.objContact.LastName,
                                      	  //     Email=objWrapper.objContact.Email,
                                      	  //    Title=objWrapper.objContact.Title 
                						  //	 );
                    //  update updateContact;
                    //lstContact.add(updateContact);
                   //update lstContact;
                   // system.debug('========updateContact=======>>>>'+updateContact);
            }
            //insert lstContact;
            //add in a temp variable;
            //lstTempWrapper.add(objWrapper);
        }
      //  lstWrapper.clear();
      //  lstWrapper.addAll(lstTempWrapper);
       // lstTempWrapper.clear();
    }
    /*
    @MethodName : delContact
    @param      : no parameter
    @Description: this method call from vf page, onlick on delete action 
    */
    public void delContact()
    {
        //system.debug('>>>>>>>deleteID>>>>>>'+delCon);
        Contact con = [Select id from Contact where id = :delCon];
        delete con;
        lstWrapper.clear();
        fetchAccountRelatedContacts();
    }
    /*
    @MethodName : AddRow
    @param      : no parameter
    @Description: this method call from vf page for add a row into the table
    */
    public void AddRow()
    {
        system.debug('getAddRow called');
        //isnewRow=true;
		contact newobjContact=new contact();
        //Contact objContact = new Contact(AccountId = strAccountId);
        lstWrapper.add(new wrapperclass(true,false,newobjContact ));
       // lstContact.add(newobjContact);
        //wrapperclass objWrapper=new wrapperclass(true,false, new contact(AccountId=strAccountId, FirstName=' yjh',  LastName=' yjh') );
        //system.debug(lstWrapper.objContact.AccountId); 
    }
    public void cancelRecord()
    {
        initialise();
        fetchAccountRelatedContacts();
    }
    public void saveContact()
    {
        String strAccId = Apexpages.currentPage().getParameters().get('AccId');
       // List<Contact> lstContact = new List<Contact>();
        for(WrapperClass objWrapper : lstWrapper){
           system.debug('========objWrapper.objContact.AccountId=======>>>>'+objWrapper.objContact);
            Contact objContactNew = new Contact(Id= objWrapper.objContact.Id, 
                                                    FirstName      = objWrapper.objContact.FirstName,
                                                    LastName       = objWrapper.objContact.LastName,
                                                    Email          = objWrapper.objContact.Email,
                                                    Title          = objWrapper.objContact.Title,
                                                    AccountId      = strAccId);
                                                  
            upsert objContactNew;
           // lstContact.add(objContactNew); 
        }
        //system.debug('========lstContact=======>>>>'+lstContact);
        initialise();  
        fetchAccountRelatedContacts();
    }
}