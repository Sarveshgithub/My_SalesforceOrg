({
    loadContactList: function(component, event, helper) {
        helper.onLoad(component, event, 'Name');
    },
    
    sortFirstName: function(component, event, helper) {     
        component.set("v.selectedTabsoft", 'AccountNumber');
        helper.sortHelper(component, event, 'AccountNumber');
    },
    
    sortLastName: function(component, event, helper) {
        // set current selected header field on selectedTabsoft attribute.    
        component.set("v.selectedTabsoft", 'Phone');
        // call the helper function with pass sortField Name  
        helper.sortHelper(component, event, 'Phone');
    },
    
    sortDepartment: function(component, event, helper) {
        // set current selected header field on selectedTabsoft attribute.        
        component.set("v.selectedTabsoft", 'Type');
        // call the helper function with pass sortField Name      
        helper.sortHelper(component, event, 'Type');
    },
    createRecord: function(component, event, helper)
    {
        var createRecordEvent = $A.get("e.force:createRecord");
      createRecordEvent.setParams({
         'entityApiName': 'Account' // using account standard object for this sample
      });
      createRecordEvent.fire();
    },
    getCurrentStage: function(component, event, helper)
    {
        var currentValueSelect=event.getSource().get('v.value');
        console.log('====on change===',currentValueSelect);
    }
})