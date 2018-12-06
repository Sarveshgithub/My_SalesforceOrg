({
    loadChevron : function(component, event, helper) {
        console.log("=========this is record id ======",component.get("v.recordId"));
        console.log("===========this called when clicked on update");
        helper.loadChevron(component, event, helper);
    },
    update : function(component, event, helper) {
        // console.log("=========this is record id ======",component.get("v.recordId"));
        console.log("===========this called when clicked on update");
        var response=true;
        helper.updateState(component, event, helper,response);
    },
    aValue : function(component, event, helper) {
        // console.log("=========this is record id ======",component.get("v.recordId"));
        // var self = this;  // safe reference
        
        //var index = event.target.dataset.record;
        var selectedItem = event.currentTarget;
        //console.log('=================current==',selectedItem);// Get the target object
        var index = selectedItem.dataset.record; // Get its value i.e. the index
        var selectedStore = component.get("v.records")[index]; // Use it retrieve the store record
        console.log("===========this called when clicked on anchor update button",selectedStore);
        helper.updateData(component, event, helper,selectedStore);
        console.log("===========this called when clicked on anchor update update button",selectedStore);
    } 
    
    
})