public with sharing class GenericCallouts {

    class Response{
        Integer statusCode;
        String resBody;
        Response(Integer statusCode, String resBody){
            this.resBody = resBody;
            this.statusCode = statusCode;
        }
    }

    public GenericCallouts(String method, Sring endPoint) {
        HttpRequest httpReq = new HttpRequest();
        httpReq.
    }
    
}
