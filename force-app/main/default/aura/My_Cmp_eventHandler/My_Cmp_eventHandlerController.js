({
	handleApplicationEvent : function(component, event, helper) {
         var message = event.getParam("strMessage");
        component.set('v.strDisplay',message);
		console.log('Event Message secound',message);
        // set the handler attributes based on event data
        /*component.set("v.messageFromEvent", message);
        var numEventsHandled = parseInt(component.get("v.numEvents")) + 1;
        component.set("v.numEvents", numEventsHandled);*/
        
        //var message1  =  event.getParam("strMessage");
        
       // console.log('value come from component type event',message1);
        	}
   
})