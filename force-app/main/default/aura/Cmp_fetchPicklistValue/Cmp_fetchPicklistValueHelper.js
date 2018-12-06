({
    fetchPickListVal: function(component, fieldName, elementId) {
        var action = component.get("c.fetchValue");
        action.setParams({
            "objName": component.get("v.object"),
            "fieldname": fieldName
        });
        var opts = [];
        action.setCallback(this, function(response) {
            if (response.getState() == "SUCCESS") {
                var allValues = response.getReturnValue();
                console.log('return value',allValues[0]);
 
                if (allValues != undefined && allValues.length > 0) {
                    opts.push({
                        class: "optionClass",
                        label: "--- None ---",
                        value: ""
                    });
                }
                for (var i = 0; i < allValues.length; i++) {
                    opts.push({
                        class: "optionClass",
                        label: allValues[i],
                        value: allValues[i]
                    });
                }
                console.log('========opttions',opts);
                component.find(elementId).set("v.options", opts);
            }
        });
        $A.enqueueAction(action);
    },
})