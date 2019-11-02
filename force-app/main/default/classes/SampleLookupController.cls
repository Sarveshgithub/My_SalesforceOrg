public with sharing class SampleLookupController {

    private final static Integer MAX_RESULTS = 5;

    @AuraEnabled(Cacheable=true)
    public static List<LookupSearchResult> search(String searchTerm, List<String> selectedIds) {
        // Prepare query paramters
        searchTerm += '*';

        // Execute search query
        List<List<SObject>> searchResults = [FIND :searchTerm IN ALL FIELDS RETURNING
            Project__c (Id, Name WHERE id NOT IN :selectedIds)
            LIMIT :MAX_RESULTS];

        // Prepare results
        List<LookupSearchResult> results = new List<LookupSearchResult>();

        // Extract Accounts & convert them into LookupSearchResult
        String accountIcon = 'standard:account';
        Project__c [] accounts = ((List<Project__c>) searchResults[0]);
        for (Project__c account : accounts) {
            results.add(new LookupSearchResult(account.Id, 'Project__c', accountIcon, account.Name, 'Project • '+ account.Name));
        }

        return results;
    }
}