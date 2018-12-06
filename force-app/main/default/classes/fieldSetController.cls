public class fieldSetController {
    @AuraEnabled
    public static List<fieldSetState> getData(String recId){
        
        System.debug('======getRecordID'+recId);
        String fieldSetName='contact_field';
        
        List<Schema.SObjectType> gd = Schema.getGlobalDescribe().Values();
        Map<String,String> objectMap = new Map<String,String>();
        for(Schema.SObjectType f : gd)
        {
            objectMap.put(f.getDescribe().getKeyPrefix(), f.getDescribe().getName());
        }
        String prefix =  recId.left(3); 
        String objectName = objectMap.get(prefix);
        System.debug('======get Object Name=='+objectName);
        
        Map<String, Schema.SObjectType> globalDescribeMap = Schema.getGlobalDescribe();
        Schema.SObjectType SObjectTypeObj = globalDescribeMap.get(objectName);
        Schema.DescribeSObjectResult describeSObjectResultObj = SObjectTypeObj.getDescribe();
        Schema.FieldSet fieldSetObj = describeSObjectResultObj.FieldSets.getMap().get(fieldSetName);
        System.debug('=============fieldSetObj==='+fieldSetObj.getFields());
        
        List <Schema.FieldSetMember> fieldSet = fieldSetObj.getFields();
        System.debug('=============fieldset'+fieldSet);
        // List <FieldSetMember> newfieldSet = new List<FieldSetMember>();
        
        List<fieldSetState> lstSetField = new List<fieldSetState>();
        
        fieldSetState objfieldSetState=new fieldSetState();
        
        for (Schema.FieldSetMember f: fieldSet) {
            System.debug('==========getType==='+f.getType());
            objfieldSetState.fieldType=f.getType();
            System.debug('=========getLable==='+f.getLabel());
            objfieldSetState.fieldLabel=f.getLabel();
            System.debug('=========getfieldPath=='+f.getfieldPath());
            objfieldSetState.fieldPath=f.getfieldPath();
            System.debug('=========getfieldPath=='+f.getDbRequired());
            objfieldSetState.fieldDbRequired=f.getDbRequired();
            lstSetField.add(objfieldSetState);
            
        }
        System.debug('==========lstSetField====='+lstSetField);
        String query='SELECT ';
        for (Schema.FieldSetMember f: fieldSet) {
            //System.debug('==========getType==='+f.getType());
            //System.debug('=========getLable==='+f.getLabel());
            System.debug('=========getfieldPath=='+f.getfieldPath());
            query+=f.getFieldPath() + ', ';
        }
        query += 'id FROM '+objectName+' WHERE Id =: recId';
        System.debug('============value of query=='+Database.query(query)); 
        objfieldSetState.lstContact= Database.query(query);
        lstSetField.add(objfieldSetState);
        System.debug('==========lst return==='+lstSetField);
        //return fset;
        return lstSetField;
        //return Database.query(query);
    }
    public class fieldSetState{
        @AuraEnabled   public String        		fieldPath{get;set;} 
        @AuraEnabled   public String        		fieldLabel{get;set;}
        @AuraEnabled   public Schema.DisplayType 	fieldType{get;set;}
        @AuraEnabled   public Boolean 				fieldDbRequired{get;set;}
        @AuraEnabled   public List<Contact> 		lstContact{get;set;}
    }
}