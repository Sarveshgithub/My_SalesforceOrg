({
    loadData : function(component, event, helper) {
        var action = component.get('c.fetchLookUpValues');
        var strObjectName = component.get("v.strObjName");
        console.log("========helper object Name=====",strObjectName);
        action.setParams({
            strObjName : strObjectName
        });
        action.setCallback(this, function(res) { 
            helper.handleCallback(component, event, helper,res); 
        }); 
        $A.enqueueAction(action);
    },
    
        
    handleCallback : function(component, event, helper,res){
        if (res.getState() === 'SUCCESS') { 
            var returnList = res.getReturnValue();  
            console.log("============returnList====",returnList); 
            component.set("v.lstLookupVal",returnList);
        }
    }
})