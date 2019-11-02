({
    searchHelper: function (cmp, event, getInputkeyWord) {
        // call the apex class method 
        var action = cmp.get("c.fetchLookUpValues");
        // set param to method  
        action.setParams({
            'searchKeyWord': getInputkeyWord,
            'ObjectName': cmp.get("v.objectAPIName"),
            'ExcludeitemsList': cmp.get("v.lstSelectedRecords")
        });
        // set a callBack    
        action.setCallback(this, function (response) {
            $A.util.removeClass(cmp.find("mySpinner"), "slds-show");
            var state = response.getState();
            if (state === "SUCCESS") {
                var storeResponse = response.getReturnValue();
                // if storeResponse size is equal 0 ,display No Records Found... message on screen.                }
                if (storeResponse.length == 0) {
                    cmp.set("v.Message", 'No Records Found...');
                } else {
                    cmp.set("v.Message", '');
                    // set searchResult list with return value from server.
                }
                cmp.set("v.listOfSearchRecords", storeResponse);
            }
        });
        // enqueue the Action  
        $A.enqueueAction(action);
    },
})