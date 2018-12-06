({
    loadData : function(component, event, helper) {
        var action = component.get('c.fetchRecordData');
        var strRecordId = component.get("v.recordId");
        console.log("========helper record id=====",strRecordId);
        action.setParams({
            //objName : 'Contact',
            strRecordId : strRecordId
        });
        action.setCallback(this, function(res) { 
            helper.handleCallback(component, event, helper,res); 
        }); 
        $A.enqueueAction(action);
    },
    
    handleCallback : function(component, event, helper,res){
        if (res.getState() === 'SUCCESS') { 
            var retJSON = res.getReturnValue();  
            console.log("============retJSON.lstFields====",retJSON.lstFields); 
            for(var i=0;i<retJSON.lstFields.length;i++)
            {
                console.log('>>>>>>>>>>>>>>return array>>>>>>',retJSON.lstFields[i]);
            }
            var objSObject = retJSON.lstSObject[0];
            console.log("============objSObject ====",retJSON.lstSObject);
            component.set("v.objSObject",objSObject);
            component.set("v.lstFieldset",retJSON.lstFields);
            
            
        }
    },
    
    onSubmit:function(component,event,helper)
    {
        var sobject= component.get('v.objSObject');
        var action = component.get('c.updateField');
        var strRecordId = component.get("v.recordId");
        var obj=JSON.stringify(sobject);
        console.log("========helper record id=====",obj);
        console.log("========helper record id=====",JSON.parse(obj));
        action.setParams({
            strObjRecord : JSON.stringify(sobject),
            strRecordId : strRecordId
        });
        $A.enqueueAction(action);
      
    }
    
})