({
    loadData: function (component, event, helper) {
        let methodName = 'c.getAccounts',
            params = null,
            callbackRess = (response) => {

                if (response) {
                    component.set("v.accList", response);
                }
            }

        this.callApexMethod(component, methodName, params, callbackRess);
    },
    callApexMethod: function (component, methodName, params, callbackRess) {

        let state, action;
        action = component.get(methodName);
        if(params != null)
        action.setParams(params);
        action.setCallback(this, function (response) {
            state = response.getState();
            if (state === "SUCCESS") {
                callbackRess(response.getReturnValue())
            }
        });
        $A.enqueueAction(action);

    }
})