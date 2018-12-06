({
	fetchContact : function(component, event, helper) {
		 var action = component.get("c.fetchContact");
 
      action.setCallback(this, function(response) {
        //store state of response
        var state = response.getState();
        if (state === "SUCCESS") {
          //set response value in ListOfContact attribute on component.
          component.set('v.ListOfContact', response.getReturnValue());
        }
      });
      $A.enqueueAction(action);
	}
})