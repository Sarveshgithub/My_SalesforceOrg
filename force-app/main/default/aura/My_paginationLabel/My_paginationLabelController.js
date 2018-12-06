({
	orderByCol : function(component, event, helper) {
        
        component.set('v.arrowup',false);
        component.set('v.strOrderBy','ASC');
        var strCurrentOrder = component.get('v.strOrderBy');
        console.log('>>>>>>>>>>strlabelName>>>>',strCurrentOrder);
        var strUpdateOrder;
        
        /*if(strCurrentOrder==' ')
        {
            strUpdateOrder='ASC';
            component.set('v.strOrderBy',strUpdateOrder);  
        }*/
        
		if(strCurrentOrder=='ASC'){
            strUpdateOrder='DESC';
            component.set('v.strOrderBy',strUpdateOrder);
        }
        
        if(strUpdateOrder=='DESC'){
            strUpdateOrder='ASC';
            component.set('v.strOrderBy',strUpdateOrder);
        }
        
        console.log('>>>>>>>>>>strUpdateOrder>>>>',component.get('v.strOrderBy'));
        var strFieldName = component.get('v.strFieldName');
        component.set('v.arrowdown',true);
        var cmpEvent = component.getEvent("cmpEvent");

        cmpEvent.setParams({
            
             colLabel : strFieldName,
             sortBy   : strUpdateOrder
        });

        cmpEvent.fire();
	}
})