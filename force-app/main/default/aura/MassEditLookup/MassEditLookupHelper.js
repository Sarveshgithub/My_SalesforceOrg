({
    //This method load the objects with related fields
    loadData: function (cmp, evt, help) {
        let methodName = 'c.getAllSobjects',
            params = null,
            callbackRess = (response) => {
                if (response) {
                    console.log(response);
                    let json = JSON.parse(response);
                    cmp.set('v.json', json);
                    console.log('options', objects(json));
                    cmp.set('v.options', objects(json));
                    console.log('json', json);
                    function objects(sjson) {
                        let options = [];
                        //return Object.keys(json);
                        Object.keys(sjson).map(val => {
                            options.push({ 'label': val, 'value': val, disable: false });
                        })
                        return options;
                    }
                }
            }
        this.callApexMethod(cmp, methodName, params, callbackRess);

    },
    //This method is used for call the backend apex method
    callApexMethod: function (cmp, methodName, params, callbackRess) {
        let state, action;
        action = cmp.get(methodName);
        if (params)
            action.setParams(params);
        action.setCallback(this, function (response) {
            state = response.getState();
            if (state === "SUCCESS") {
                callbackRess(response.getReturnValue())
            }
            else if (state === 'ERROR') {
                let errors = response.getError();
                console.log('error:::', errors);
            }
        });
        $A.enqueueAction(action);
    }
})