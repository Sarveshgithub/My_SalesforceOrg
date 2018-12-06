({
	doInit : function(component, event, helper) {
        console.log('==========called==');
		 helper.fetchPickListVal(component, 'Course__c', 'accIndustry');
	},
    onPicklistChange: function(component, event, helper) {
        // get the value of select option
        alert(event.getSource().get("v.value"));
    }
})