public class test {
    public class CaseDetails {
        public String caseId;
        public List<String> securianDocNumbers;
        
        CaseDetails(String caseId, List<String> securianDocNumbers){
            this.caseId = caseId;
            this.securianDocNumbers = securianDocNumbers;
        }
    }
    public static void test(){
        Map<String,List<String>> m = new Map<String,List<String>>{'Test' => new List<String>{'a,b'},'Test1' => new List<String>{'a,b'}};
        List<CaseDetails> lst = new List<CaseDetails>();
        for( String obj : m.keySet() ){
            lst.add(new CaseDetails(obj,m.get(obj)));
        }
        System.debug('lst::'+JSON.serialize(lst));
    }
       
}