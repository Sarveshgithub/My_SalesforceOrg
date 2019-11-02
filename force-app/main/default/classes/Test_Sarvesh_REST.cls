public class Test_Sarvesh_REST {
    public static void test(){
        
        String clientId = '3MVG9U_dUptXGpYIT.RB2JJXp.LMAoiYwISAmLt_9VcpgVnqVyUxS8qBvLAUugR1olAf3ysw5vDsO2fcr.TsQ';
        String clientsecret = '4163901141616295076';
        String username = 'stifel-rst@silverlinecrm.com.rstdev';
        String SecurityToken = 'dWB5m6BSUicCFGuQw5n1c0kB';
        String password = 'silverlin5'+SecurityToken;
        String reqbody = 'grant_type=password&client_id='+clientId+'&client_secret='+clientsecret+'&username='+username+'&password='+password;
        Http h= new Http();
        
        HttpRequest req= new HttpRequest();
        req.setBody(reqbody);
        req.setMethod('POST');
        req.setEndpoint('https://test.salesforce.com/services/oauth2/token');
        System.debug('request'+req.getBody());
        HttpResponse res=h.send(req);
        System.debug('res::'+res);
        //call_IBRestAPI('{"test":"123"}','SESSION_REMOVED','https://stifelorg2--rstdev.cs68.my.salesforce.com/services/apexrest/Case/update');
    }
    
     public static void call_IBRestAPI(String jsonstr , String accessToken, String endpoint) {
        Http http= new Http();
        HttpRequest req= new HttpRequest();
        req.setHeader('Authorization','Bearer ' + accessToken);
        req.setHeader('Content-Type','application/json');
        req.setHeader('accept','application/json');
        req.setBody(jsonstr);
        req.setMethod('POST');
        req.setEndpoint(endPoint);
        HttpResponse res = http.send(req);
    }
}