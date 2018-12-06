({
    loadChevron : function(component, event, helper) {
        //console.log('======helper value========',selectedStore);
        //var action=component.get('c.updateData');
        var action = component.get('c.getChevronData');
        var txt_recordId = component.get("v.recordId");
        console.log("========helper record id=====",txt_recordId);
        var txt_FieldName = component.get("v.fieldName");
        console.log("=========field name=======",txt_FieldName);
        action.setParams({
            recId : txt_recordId,
            fieldName : txt_FieldName 
           //newvalue:selectedStore  
        });
        action.setStorable();        
        action.setCallback(this, function(res) { 
            helper.handleCallback(component, event, helper,res); 
        }); 
        $A.enqueueAction(action); 
        
    },
    updateData : function(component, event, helper,selectedStore) {
        console.log('======update value from helper=========',selectedStore);
        //  =selectedStore;
        var action=component.get("c.updateData");  
        var txt_recordId = component.get("v.recordId");
        var txt_FieldName = component.get("v.fieldName");
        var newVal = JSON.stringify(selectedStore);
        var val=JSON.parse(newVal);
        var val2=val.val;
        // console.log('==============update  value newVal=======',newVal);
        // console.log('======update value from helper val=========',val);
        console.log('======update value from helper val2=========',val2);
        //;
        
        // var myObj=JSON.Parse('{"val"}');
        // console.log('======update value from helper frtghtfhr=========',myObj);
        
        // var txt_recordId = component.get("v.recordId");
        // console.log('======update value from helper frtghtfhr=========',newVal);
         
        action.setParams({
            //console.log('======update value from helper setparameter=========',selectedStore);
            //recId : txt_recordId,
            "recId" :txt_recordId,
            "newValue" : val2,
            "fieldName":txt_FieldName
            
            
        });
         
        //$A.enqueueAction(action); 
        $A.enqueueAction(action);
        // 
    },
    updateState:function(component,event,helper,response)
    {
        	action.setStorable(); 
            action.setCallback(this, function(res) { 
            //if (res.getState() === 'SUCCESS') { 
            var retJSON = JSON.parse(res.getReturnValue());  
            component.set("v.records",retJSON);
       // }
        });
        $A.enqueueAction(action);
    },
    handleCallback : function(component, event, helper,res){
        if (res.getState() === 'SUCCESS') { 
            var retJSON = JSON.parse(res.getReturnValue());  
            component.set("v.records",retJSON);
        }
    }
})