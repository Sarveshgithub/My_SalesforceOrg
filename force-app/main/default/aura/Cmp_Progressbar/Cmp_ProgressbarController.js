({
	doInit : function(component, event, helper) {
		console.log("Controller are Called");
        var header= component.get("v.header");
        console.log("=========header=======",header);
        var action = component.get("c.getPickList");
        action.setCallback(this, function(a)
                           {
                               console.log('=====a.getReturnValue()==========>>', a.getReturnValue());
                               component.set("v.picklistData", a.getReturnValue());
                           });
        $A.enqueueAction(action);
	}
})