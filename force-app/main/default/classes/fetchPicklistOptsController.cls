public class fetchPicklistOptsController {
@AuraEnabled
    public static List<String> fetchValue(sObject objName,String fieldname)
    {
        List<String> fieldValue= new List<String>();
        Schema.sObjectType objType = objName.getSObjectType();
        System.debug('======objType'+objType);
        Schema.DescribeSObjectResult objDescribe =objType.getDescribe();
        System.debug('======objDescribe'+objDescribe);
        Map<String,Schema.SObjectField> fieldMap=objDescribe.fields.getmap();
        System.debug('=======fieldMap'+fieldMap);
        list<Schema.PicklistEntry> values=fieldMap.get(fieldName).getDescribe().getPickListValues();
        System.debug('=======values'+values);
        for(Schema.PicklistEntry a:values)
        {
            fieldValue.add(a.getValue());
        }
        System.debug('=====fieldvalue======='+fieldValue);
        return fieldValue;
    }
}