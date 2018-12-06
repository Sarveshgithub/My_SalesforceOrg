/**
* @Author	:	Sarvesh Kumar
* @Date	:	
* @Desc	:	Controller for Lightning Component "ReadOnlyChevron"
* 
* */
public class proController {
    @AuraEnabled
    public static String getChevronData(String recId,String fieldName){ 
        //For Demo purpose
        // if(recId == null){
        //   recId = '0037F000006ehqkQAA';
        //  }                
        List<Schema.SObjectType> gd = Schema.getGlobalDescribe().Values();
        Map<String,String> objectMap = new Map<String,String>();
        for(Schema.SObjectType f : gd)
        {
            objectMap.put(f.getDescribe().getKeyPrefix(), f.getDescribe().getName());
        }
        String prefix =  recId.left(3); 
        String objectName = objectMap.get(prefix);
        String query = 'SELECT '+fieldName+' FROM '+objectName+' WHERE Id =: recId';        
        List<SOBject> lstObj = Database.query(query);        
        String selVal =  String.valueOf(lstObj[0].get(fieldName)) ;  
        Schema.SObjectField sobjField = Schema.getGlobalDescribe().get(objectName).getDescribe().Fields.getMap().get(fieldName) ;
        Schema.DescribeFieldResult fieldResult = sobjField.getDescribe() ;
        List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();        
        Boolean curValMatched = false;
        Integer widthPerItem = 100/ple.size() ;
        List<chevronData> lstRet = new List<chevronData>();        
        for( Schema.PicklistEntry f : ple)
        {
            chevronData obj = new chevronData();
            obj.val = f.getLabel();
            obj.width = widthPerItem+'%';            
            if(obj.val == selVal){
                obj.cssClass = 'active';
                curValMatched = true;
            }
            else if(curValMatched){
                obj.cssClass = '';
            }else{
                obj.cssClass = 'visited'; 
            } 
            lstRet.add(obj);
        } 
        return JSON.serialize(lstRet);
    }
    @AuraEnabled
    public static void  updateData(String newValue,String recId,String fieldName)
    {	
        //chevronData sobjval = (chevronData) JSON.deserialize(newValue, chevronData.class);
        //chevronData o = JSON.parse(newValue);
        /* chevronData con=new chevronData();
for(String c:newValue)
{
system.debug('==========value===='+c.val);
}*/
        List<Schema.SObjectType> gd = Schema.getGlobalDescribe().Values();
        Map<String,String> objectMap = new Map<String,String>();
        for(Schema.SObjectType f : gd)
        {
            objectMap.put(f.getDescribe().getKeyPrefix(), f.getDescribe().getName());
        }
        String prefix =  recId.left(3); 
        String objectName = objectMap.get(prefix);
        system.debug('============Object Name=='+objectName);
        system.debug('============Updated Value=='+newValue);
        system.debug('============recid=='+recId);
        system.debug('============Field Value=='+fieldName);
        // String objectStr = 'Account';
        
        // Convert to schema.sObjectType
        Schema.SObjectType convertType = Schema.getGlobalDescribe().get(objectName);
        
        // Create an instance of that type
       /* Sobject genericObject = convertType.newSObject();
        String query='SELECT '+fieldName+' FROM '+objectName+' WHERE Id =: recId';
        for(Sobject c: Database.query(query))
        {
            //String fVal=(String)c.get(fieldName);
            c.put(fieldName, 'newValue');
            update c;
        }*/
       /* Map<String, Schema.SObjectType> ms = Schema.getGlobalDescribe();
        system.debug('***********map*************'+ms);
        Schema.SObjectType st = ms.get(objectName);
        Sobject s = st.newSobject();
        // s.put(Id,recId);
        system.debug('***********map*************'+s);
        system.debug('++++++++++++++++dynamic object created+++++++++++++++');
        s.put(fieldName,newValue);
        system.debug('***********map inserted*************'+s);
        insert s;*/
        String query='SELECT '+fieldName+' FROM '+objectName+' WHERE Id =: recId';
        for(Sobject c: Database.query(query))
        {
            //String fVal=(String)c.get(fieldName);
            c.put(fieldName, newValue);
            system.debug('***********map inserted in c*************'+c);
            update c;
        }
        //system.debug('================Convert Value of Sobject====='+genericObject);
        
        //String query = 'SELECT '+fieldName+' FROM '+objectName+' WHERE Id =: recId';
        // SObject s = [SELECT fieldName FROM Account LIMIT 1];
        // Object o = s.get('AccountNumber');
        // s.put('AccountNumber', 'abc');
        // List<SOBject> lstObj = Database.query(query);
        //String selVal =  String.valueOf(lstObj[0].get(fieldName)) ; 
        //system.debug('=========='+selVal);
        //for(SOBject objs:lstObj)
        //{
        // String selVal =  String.valueOf(lstObj[0].get(fieldName)) ;
        //objs.selVal='newValue';
        //}
        //update lstObj;
        //String selVal =  String.valueOf(lstObj[0].get(fieldName.va)) ; 
        
        
        
        
        
    }
    public class chevronData{
        @AuraEnabled   public String val{get;set;}
        @AuraEnabled  public String cssClass{get;set;}
        @AuraEnabled public String width {get;set;}
    }
}