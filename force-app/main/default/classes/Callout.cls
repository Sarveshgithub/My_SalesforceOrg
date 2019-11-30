/**
 * \arg ClassName        : Callout
 * \arg CreatededBy      : Sarvesh
 * \arg Description      : This is Apex Generic class for callouts
 */
public with sharing class Callout {
    String endPoint;
    String method;
    String body;
    String username;
    String password;
    public Callout(String endPoint, String method, String body,String username, String password) {
       this.endPoint = endPoint;
        this.method = method;
        this.body = body;
        this.username = username;
        this.password = password;
    }
    //request to the server
    public String request(){
    Http h = new Http();
    HttpRequest req = new HttpRequest();
    req.setEndpoint(endPoint);
    req.setMethod(method);
    if(username!=null && password!=null){
        req.setHeader('Authorization', authenticate());
    }
    if(body!=null){
        req.setBody(body);
    }
    HttpResponse res = h.send(req);
    System.debug('::STATUS_CODE::'+res.getStatusCode());
    return res.getBody();
    }

    //for Basic outh
    private String authenticate(){
     Blob headerValue = Blob.valueOf(username + ':' + password);
     String authorizationHeader = 'Basic ' +
     EncodingUtil.base64Encode(headerValue);
     return authorizationHeader;
    }
}