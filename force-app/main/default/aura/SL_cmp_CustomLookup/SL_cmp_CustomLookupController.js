({
    selectRecord : function(component, event, helper){      
        var getSelectRecord = component.get("v.objRecord");
        var compEvent = component.getEvent("objSelectedRecordEvent");
        compEvent.setParams({"recordByEvent" : getSelectRecord });
        console.log('==============Icon Value====',component.get('v.strIcon'));
        compEvent.fire();
    },
})