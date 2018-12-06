public class SL_RecordDataController {
    
    public class ResultWrapper {
        
        @AuraEnabled
        public list<SObject> lstSObject;
        @AuraEnabled
        public list<FieldsWrapper> lstFields;
        
        public ResultWrapper(list<SObject> lstSObject, list<FieldsWrapper> lstFields) {
            
            this.lstSObject = lstSObject;
            this.lstFields = lstFields;
        }
    }
    
    public class FieldsWrapper {
        
        @AuraEnabled
        public String fieldPath { get;set; }
        @AuraEnabled
        public String label { get;set; }
        @AuraEnabled
        public String type { get; set; }
        
        public FieldsWrapper(String fieldPath, String strLabel, String strType) {
            this.fieldPath = fieldPath;
            this.label = strLabel;
            this.type = strType;
        }
    }
    
    @AuraEnabled
    public static ResultWrapper fetchRecordData(String strSObjectName, String strFieldsetName, String strRecordId) {
        strSObjectName='Contact';
        strFieldsetName='contact_field';
        Set<String> setFieldsToQuery = new set<String>();
        List<FieldsWrapper> lstFieldsetWrapper = new List<FieldsWrapper>();
        system.debug('strSObjectName::'+strSObjectName);
        system.debug('strFieldsetName::'+strFieldsetName);
        
        for(Schema.FieldSetMember fieldSetMemberObj : readFieldSet(strFieldsetName, strSObjectName)) {            
            if(String.valueOf(fieldSetMemberObj.getType()).trim() == 'REFERENCE') {
                if(fieldSetMemberObj.getFieldPath().toLowerCase().endsWith('__c')){
                    setFieldsToQuery.add(fieldSetMemberObj.getFieldPath().toLowerCase().replace('__c','__r.Name'));
                }
                else if(fieldSetMemberObj.getFieldPath().toLowerCase().endsWith('id')){
                    setFieldsToQuery.add(fieldSetMemberObj.getFieldPath().toLowerCase().replace('id','.Name'));
                }
            }
            setFieldsToQuery.add(fieldSetMemberObj.getFieldPath().toLowerCase());
            lstFieldsetWrapper.add(new FieldsWrapper(fieldSetMemberObj.getFieldPath(), fieldSetMemberObj.getLabel(),String.valueOf(fieldSetMemberObj.getType())));
        }
        
        String queryString = 'Select id, ';
        setFieldsToQuery.remove('id');
        queryString += String.join( new List<String>(setFieldsToQuery), ',');
        queryString.removeEnd(',');
        queryString += ' FROM ' + strSObjectName + ' Where Id = \'' + strRecordId + '\' FOR REFERENCE';       
        
        system.debug('Final Query::'+queryString);
        list<SObject> lstSObject = Database.query(queryString);
        System.debug('>>>>>>>>>>lstSobject>>>'+lstSObject);
        System.debug('>>>>>>>>>>Result lstSObject lstFieldWrapper>>>>>>'+new ResultWrapper(lstSObject, lstFieldsetWrapper));
        return new ResultWrapper(lstSObject, lstFieldsetWrapper);
    }
    
    @AuraEnabled
    public static void updateField(String strObjRecord,String strRecordId)
    {
        List<Schema.SObjectType> lstSchemaObject = Schema.getGlobalDescribe().Values();
        Map<String, String> objStringMap = new Map<String, String>();
        for(Schema.SObjectType f : lstSchemaObject){
            objStringMap.put(f.getDescribe().getKeyPrefix(), f.getDescribe().getName());
        }
        String prefix =  strRecordId.left(3); 
        String objectName = objStringMap.get(prefix);
        System.debug('===========objectName======'+objectName);
        
        sObject sObj = Schema.getGlobalDescribe().get(objectName).newSObject() ;
        System.debug('>>>>>>>>>>>>>>>Dynamically sObject>>>>>>'+sObj); 
        System.debug('>>>>>>>>>>>>>>>strField>>>>>>'+strObjRecord); 
        Map<String, Object> objMap = (Map<String, Object>) JSON.deserializeUntyped(strObjRecord);
        System.debug('>>>>>>>>>>keySet Value>>>>>>>'+objMap.keySet());
        for(String strkeysetValue:objMap.keySet()){
            Object val=objMap.get(strkeysetValue);
            sObj.put(strkeysetValue, val);
        }
        update sObj;
    }
    
    private static List<Schema.FieldSetMember> readFieldSet(String fieldSetName, String ObjectName) {
        Map<String, Schema.SObjectType> GlobalDescribeMap = Schema.getGlobalDescribe(); 
        Schema.SObjectType SObjectTypeObj = GlobalDescribeMap.get(ObjectName);
        Schema.DescribeSObjectResult DescribeSObjectResultObj = SObjectTypeObj.getDescribe();
        Schema.FieldSet fieldSetObj = DescribeSObjectResultObj.FieldSets.getMap().get(fieldSetName);
        System.debug('>>>>>>>>>>>>>>fieldset object>>>>>>>>'+fieldSetObj.getFields());
        return fieldSetObj.getFields(); 
    }
}