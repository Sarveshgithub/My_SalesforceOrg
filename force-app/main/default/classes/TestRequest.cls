/**
 * \arg ClassName        : TestRequest
 * \arg CreatededBy      : Sarvesh
 * \arg Description      : This is Apex calss is used for callouts
 */
public class TestRequest {
    public static void callGetMethod(){
        String url = 'https://postman-echo.com/get';
        String params = '?foo1=bar1&foo2=bar2';
        url = url+params;
        //create object of Callout to make callout
        Callout obj = new Callout(url,'GET',null,null,null);
        Try{
           String response = obj.request();
           System.debug('::Response::'+response);
        }
        catch(Exception e){
            System.debug('::Exception:::'+e.getMessage());
        }
    }
}