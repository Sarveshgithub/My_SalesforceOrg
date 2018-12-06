public class FelthAllCountPerObject {
    
    public static void fetchAllcount() {
        List<string> SObjectList = new List<string>();    
        
        for(Schema.SObjectType objTyp : Schema.getGlobalDescribe().Values()){
            String name = objTyp.getDescribe().getName();
            // Exclude all the unwanted Sobjects e.g. History, Share etc..
            if(!name.containsignorecase('history') && !name.containsignorecase('tag')&& !name.containsignorecase('name') &&
               !name.containsignorecase('share') && !name.containsignorecase('feed') && !name.containsignorecase('status')){      
                   SobjectList.add(name);
                   System.debug( 'Name : ' + name);
               }
        }
        Map<String, Integer> mapofCount = new Map<String, Integer>();
        for(String obj : SObjectList){
            for(Sobject acc : Database.query('SELECT ID FROM '+obj)){
             if(mapofCount.containsKey(obj))
                 mapofCount.put(obj,mapofCount.get(obj)+1);
             else
                 mapofCount.put(obj,1);
            }
        }
        System.debug('map::::'+mapofCount);
    }
}