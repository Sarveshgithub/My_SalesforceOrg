public class My_demo {
    public static void fetchContactRecord() {
        List<Contact>  lstContact = [select id, name from contact];
        System.debug('lstContact' +lstContact);
    }
}