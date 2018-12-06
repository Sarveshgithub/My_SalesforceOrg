({
    newRecord : function(component, event, helper,newObj) 
    {
        var newObj=component.get("v.CanObject");
        //var newObject1;
        //  console.log("==============Helper class be called======");
        console.log(newObj);
        component.set("v.CanObject",newObj);
        // var newObject;
        // var testObj=component.get("v.CanObject");
        //console.log('GETTING OBJECT'+testObj.FirstName__c);
        
        var action = component.get("c.setSaveData");
        
        action.setParams({            
            "newObject": newObj
        });
        action.setCallback(this, function(a)
                           {
                               var toastEvent = $A.get("e.force:showToast");
                               toastEvent.setParams({
                                   "title": "Success!",
                                   "message": "The record has been created successfull."
                               });
                               toastEvent.fire();
                               //console.log('=====a.getReturnValue()==========>>', a.getReturnValue());
                               var dir=a.getReturnValue();
                               var urlEvent = $A.get("e.force:navigateToURL");
                               urlEvent.setParams({
                                   "url": 'https://sarveshkumar-trekbin-dev-ed.lightning.force.com/one/one.app#/sObject/'+dir+'/view'
                               });
                               urlEvent.fire();
                               /*var evt = $A.get("e.force:navigateToComponent");
                               evt.setParams({
                                  // componentDef : "c:myComponent",
                                   componentAttributes: {
                                       contactName : a.getReturnValue
                                   }
                               });
                               evt.fire();*/
                               //window.location="https://sarveshkumar-trekbin-dev-ed.lightning.force.com/one/one.app#/sObject/"+dir+"/view"
                               
                           });
        
        $A.enqueueAction(action);
        /*showToast : function(component, event, helper) {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": "Success!",
                "message": "The record has been updated successfully."
            });
            toastEvent.fire();*/
    }
}
 })