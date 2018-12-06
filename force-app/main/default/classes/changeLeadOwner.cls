/**
* @ClassName     :  changeLeadOwner 
* @Created By    :  Trekbin Devs
* @Description   :  This class used for changing Lead owners in bulk from Lead list view - a feature that's not available in Lightning.
*/

public class changeLeadOwner {

    public Lead objLead {get;set;}
    public List<Lead> lstSelectedLeads {get;set;}
    public Boolean boolSendEmailOptionchk {get;set;}
    ApexPages.StandardSetController stdSetCtlr;
    String strPageRef;
    
    public changeLeadOwner(ApexPages.StandardSetController controller) {
        boolSendEmailOptionchk = false;
        stdSetCtlr = controller;
        objLead = new Lead(); 
        lstSelectedLeads = new List<Lead>();
        if(UserInfo.getUiThemeDisplayed() == 'Theme4d') {
            strPageRef = '/one/one.app?source=aloha#/sObject/Lead/list?filterName='+stdSetCtlr.getFilterId();
        }
        else {
            strPageRef = '/00Q?fcf='+stdSetCtlr.getFilterId();
        }
        
    }

    public pageReference updateLeadOwnerAction() {

        for (Lead l : (Lead[])stdSetCtlr.getSelected()) {
            Lead objL = new Lead(Id = l.Id,
                                 OwnerId = objLead.OwnerId);
            lstSelectedLeads.add(objL);
        }
        
        Database.DMLOptions dlo = new Database.DMLOptions();
        dlo.EmailHeader.triggerAutoResponseEmail = boolSendEmailOptionchk;
        dlo.EmailHeader.triggerUserEmail = boolSendEmailOptionchk;
        Database.update(lstSelectedLeads, dlo);
        return new Pagereference(strPageRef);
    }
    
    public pageReference cancelAction() {
        return new Pagereference(strPageRef);
    }
}