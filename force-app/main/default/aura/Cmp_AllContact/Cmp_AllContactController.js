({
	doInit : function(component, event, helper){
        console.log("COntroller called");
			var test = 'NEW STRING FROM CONTROLLER';
        	var head=componet.get("v.Header");
        	console.log("=======",head);
			helper.getAllContacts(component,event,helper, test);
		}
})