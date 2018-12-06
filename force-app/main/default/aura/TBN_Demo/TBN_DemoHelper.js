({
	loadhelper : function(component, event, helper) {
        console.log('hello i am is helper');
        var action=component.get('c.fetchaccout');
        
        
        action.setCallback(this,function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var returnJson=response.getReturnValue();
                component.set('v.objContact',returnJson);
                console.log('===========return Json====',returnJson);
            }
        });

          $A.enqueueAction(action);
	}
})