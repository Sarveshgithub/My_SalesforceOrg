public class AnimalLocator {
    public static string getAnimalNameById(Integer animalId){
        Http http=new Http();
        HttpRequest req=new HttpRequest();
        req.setEndPoint('https://th-apex-http-callout.herokuapp.com/animals/' + animalId);
        req.setMethod('GET');
        HttpResponse res=http.send(req);
        Map<String,Object> animals = new Map<String,Object>();
        if (res.getStatusCode() == 200) {
            Map<String,Object> results = (Map<String,Object>)JSON.deserializeUntyped(res.getBody());
            animals = (Map<String,Object>)results.get('animal');
        }
        else{System.debug('The status code returned was not expected: ' + res.getStatusCode() + ' ' + res.getStatus());}
        return (string)animals.get('name');
    }
}