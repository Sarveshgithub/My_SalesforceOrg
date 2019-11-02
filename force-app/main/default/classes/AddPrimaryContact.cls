public class AddPrimaryContact implements Queueable{
    private Contact ContactObj;
    private String State;
    
    public AddPrimaryContact(Contact ContactObj, String State) {
        this.ContactObj = ContactObj;
        this.State = State;
    }
    
    public void execute(QueueableContext context) {
        List<Contact> lstContact = new List<Contact>();
        for (Account account : [SELECT Id FROM Account WHERE BillingState =:State LIMIT 200]) {
            Contact con = ContactObj.clone(false, false, false,false);
            con.AccountId = account.Id;
            lstContact.add(con);
        }
        if(!lstContact.isEmpty())
            INSERT lstContact;
    }    
}