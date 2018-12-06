({
    doInit : function(component, event, helper) {
        
        var strFieldPath = component.get('v.strFieldPath');
        var objSingleRecord = component.get('v.objSingleRecord');
        var Id;
        var objSingleRecordJson = JSON.parse( JSON.stringify( objSingleRecord)); 
        var fieldpathName = JSON.parse( JSON.stringify( strFieldPath));
        var tdData = objSingleRecordJson[fieldpathName];
        console.log('mappicklistval',component.get('v.mappicklistval1'));
        
        if(fieldpathName == 'LastModifiedById') {
            var newData = objSingleRecordJson[fieldpathName];
            component.set('v.strModifiedId', newData);
            helper.username(component, event, helper, newData);
        }

        var strFieldType = component.get('v.strFieldType');
        if(strFieldType == 'PICKLIST') {
        console.log('mappicklistval',component.get('v.mappicklistval1'));
        }

        //console.log('fieldtype----',component.get('v.strFieldType'));

        if(fieldpathName == 'Name') {
            component.set('v.conId',true);
            component.set('v.hideContactId', objSingleRecordJson.Id);
            var tdData = objSingleRecordJson[fieldpathName];
            component.set('v.tdData', tdData);
        }
        
        if( (fieldpathName != 'Name') && (fieldpathName != 'LastModifiedById') ) {
            component.set('v.otherData', true);
            var tdData = objSingleRecordJson[fieldpathName];
            component.set('v.tdData', tdData);
        }
        
        var username = component.get('v.username');
    }
})