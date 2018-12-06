({
	loadData :function(component, event, helper) {

        console.log('>>>>offset value from helper>>>>>>',component.get('v.intOffset'));
		var action = component.get('c.fetchContact');
        
		action.setParams({
            strSObjectName   : 'Contact',
            strFieldsetName  : 'contact_field',
            intoffset  		 :  component.get('v.intOffset'),
            strColName 		 :  component.get('v.strcolLabel'),
            strOrderBy 		 :  component.get('v.strOrderBy')
            
        });
		
        action.setCallback(this, function(response) {
           
            var state = response.getState();
            if (state === "SUCCESS") {
            	var ret = response.getReturnValue();
                console.log('ret>>>>>>', ret);
            	console.log('return lstObject >>>>>>',ret.strOrderBy);
                console.log('return lstfield>>>>>>',ret.lstFields);
                component.set('v.intOffset', ret.intoffset);
                component.set('v.lstSObject', ret.lstSObject);
                component.set('v.lstFields', ret.lstFields);
                component.set('v.strOrderBy', ret.strOrderBy);
                component.set('v.mappicklistval',ret.mappicklistval);
                console.log('mappicklistval', component.get('v.mappicklistval'));
                var objField = ret.lstFields;

                for(var i=0; i<objField.length; i++) {
                    if(objField[i].label == 'Full Name') {
                        objField[i].label = 'Contact Name';
                    }
                }

                var countId = (ret.objCountId)/10;
                component.set('v.valueOflast', ret.objCountId);
                component.set('v.denominator', Math.ceil(countId));       
            } 
        });
        $A.enqueueAction(action);
	},     
         
	showSpinner: function(component, event, helper) {
        component.set("v.Spinner", true); 
   },     
         
    hideSpinner : function(component, event, helper) { 
        component.set("v.Spinner", false);
    }   
})