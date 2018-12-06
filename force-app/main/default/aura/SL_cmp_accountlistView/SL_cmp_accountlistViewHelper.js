({
    onLoad: function(component, event, sortField) {
        //call apex class method
        var action = component.get('c.fetchAccount');
        var actionofListview = component.get('c.getListViews');
        
        // pass the apex method parameters to action 
        action.setParams({
            'sortField': sortField,
            'isAsc': component.get("v.isAsc")
        });
        action.setCallback(this, function(response) {
            //store state of response
            var state = response.getState();
            if (state === "SUCCESS") {
                //set response value in ListOfContact attribute on component.
                component.set('v.ListOfContact', response.getReturnValue());
            }
        });
        actionofListview.setCallback(this, function(response) {
            //store state of response
            var state = response.getState();
            if (state === "SUCCESS") {
                var ret=response.getReturnValue();
                //set response value in ListOfContact attribute on component.
                console.log('====Return Value====', ret);
                component.set('v.listViewValue',ret);
            }
        });
        $A.enqueueAction(action);
        $A.enqueueAction(actionofListview);
    },
    
    sortHelper: function(component, event, sortFieldName) {
        var currentDir = component.get("v.arrowDirection");
        
        if (currentDir == 'arrowdown') {
            // set the arrowDirection attribute for conditionally rendred arrow sign  
            component.set("v.arrowDirection", 'arrowup');
            // set the isAsc flag to true for sort in Assending order.  
            component.set("v.isAsc", true);
        } else {
            component.set("v.arrowDirection", 'arrowdown');
            component.set("v.isAsc", false);
        }
        // call the onLoad function for call server side method with pass sortFieldName 
        this.onLoad(component, event, sortFieldName);
    },
    
})