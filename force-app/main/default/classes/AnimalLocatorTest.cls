@isTest
public class AnimalLocatorTest {    
    @isTest static void testPostCallout() {
        // Set mock callout class 
        Test.setMock(HttpCalloutMock.class, new AnimalLocatorMock()); 
        String response = AnimalLocator.getAnimalNameById(1);
        System.assertNotEquals(null, response);
    }
}