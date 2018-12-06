({
	fireComponentEvent : function(component, event, helper) {
        //var appEvent = $A.get("e.c:My_AppEvent");
        var getvalue=component.get('v.strValue');
        console.log(getvalue);
        
        var cmpEvent1 = component.getEvent("cmpEvent1");
        //var cmpEvent  = component.getEvent('cmpEvent');
         
        cmpEvent1.setParams({
            strMessage : getvalue,
        });
        //console.log('>>>>>>>cmpEvent1>>>',cmpEvent1);
        
        
       /* cmpEvent.setParams({
            strapp : "An application event fired me. " +
            "It all happened so fast. Now, I'm everywhere!" ,        
        });*/
        
		cmpEvent1.fire();
       // cmpEvent.fire();
        
        
	}
})