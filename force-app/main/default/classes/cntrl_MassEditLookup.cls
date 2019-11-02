/**  
ClassName        : cntrl_MassEditLookup
CreatedOn        : 10/Jan/2019
CreatededBy      : Anup
Description      : 
LastModifiedOn   :
ModifiedBy       : 
*/
public with sharing class cntrl_MassEditLookup {
    
    public with sharing class wrapperFields{
        @AuraEnabled
        public String field;
        @AuraEnabled
        public String relatedObject;
        
        public wrapperFields(String field, String relatedObject) {
            this.field = field;
            this.relatedObject = relatedObject;
        }
    }
    
    /**
@MethodName     : getAllSobjects
@Param          : 
@return         : list<wrappersObjects>
@Description    : 
**/
    @AuraEnabled
    public static String getAllSobjects(){
        Map<String, Schema.SObjectType> gd = Schema.getGlobalDescribe();
        Map<String,List<wrapperFields>> mapobjectNametoLookupFields = new Map<String,List<wrapperFields>>();
        for(Schema.SObjectType obj : gd.values()){
            Schema.DescribeSObjectResult detail = obj.getDescribe();
            if(detail.isAccessible() && detail.isCreateable() && detail.isQueryable() && !detail.isCustomSetting() && detail.isSearchable() &&  detail.isUpdateable()) {
                mapobjectNametoLookupFields.put(detail.getName(),getAllFields(detail));
            }   
        }
        return  JSON.serialize(mapobjectNametoLookupFields);
    }
    /**
@MethodName     : getAllFields
@Param          : Schema.DescribeSObjectResult
@return         : list<wrappersObjects>
@Description    : 
**/
    private static list<wrapperFields> getAllFields(Schema.DescribeSObjectResult dsr){
        list<wrapperFields> lstwrapFld = new list<wrapperFields>();
        for(Schema.SObjectField  fs : dsr.fields.getMap().values()){
            Schema.DescribeFieldResult dfr = fs.getDescribe();
            if(dfr.isAccessible() && dfr.isUpdateable() && dfr.isCreateable() && dfr.getType() == Schema.DisplayType.REFERENCE){
                List<Schema.sObjectType> parentObj = dfr.getReferenceTo();
                lstwrapFld.add( new wrapperFields(dfr.getName(), parentObj[0].getDescribe().getName()));
            }
        }
        return lstwrapFld;   
    }
}