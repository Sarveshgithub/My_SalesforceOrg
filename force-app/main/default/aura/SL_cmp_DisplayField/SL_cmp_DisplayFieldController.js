({
    doInit : function(component, event, helper) {
        
        var objSObject = component.get('v.objSObject');
        var strFieldAPIName = component.get('v.strFieldAPIName');
        var fieldData = objSObject[strFieldAPIName];
        component.set('v.fieldData', fieldData);
        component.set('v.strfieldData',fieldData);
    },
    update:function(component,event,helper)
    {
         
        var inputfieldValue = component.get('v.fieldData');
        var objSObject = component.get('v.objSObject');
        var strFieldAPIName = component.get('v.strFieldAPIName');
        console.log('=======when updated ==',inputfieldValue);
        objSObject[strFieldAPIName]=inputfieldValue;
    }
})