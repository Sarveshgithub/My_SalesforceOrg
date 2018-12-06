({
    username : function(component, event, helper, newData) {

        var newId = newData;
        var action = component.get('c.nameofUser');
        
        action.setParams({
            getId : newId,
        });

        action.setCallback(this, function(response) {
            
            var state = response.getState();
            if (state === "SUCCESS") {
                var ret=response.getReturnValue();
                component.set('v.isTrue', true);
                component.set('v.username', ret.Name);
               }
        });
        $A.enqueueAction(action);
    }
})