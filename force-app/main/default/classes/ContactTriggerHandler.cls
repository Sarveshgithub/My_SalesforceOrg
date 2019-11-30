public with sharing class ContactTriggerHandler {
	public static void rollUpContact(Map < Id, Contact > newMap, Map < Id, Contact > oldMap) {
		Set < Id > accountIds = new Set < Id > ();
		if ((trigger.isInsert || trigger.isUpdate )&& trigger.isAfter) {
			for (Contact con: newMap.values()) {
				if (con.AccountId != null) {
					accountIds.add(con.AccountId);
				}
			}
		}

		if (trigger.isDelete && trigger.isBefore) {
			for (Contact con: oldMap.values()) {
				if (con.AccountId != null) {
					accountIds.add(con.AccountId);
				}
			}
		}

		if (!accountIds.isEmpty()) {
			try{
				List < Account > accList = [SELECT Id, Number_of_Contacts__c, (SELECT Id FROM Contacts)
				FROM Account WHERE Id IN: accountIds];
				if (!accList.isEmpty()) {
					List < Account > updateAccList = new List < Account > ();
					for (Account acc: accList) {
						Account objAcc = new Account(Id = acc.Id, Number_of_Contacts__c = acc.Contacts.size());
						updateAccList.add(objAcc);
					}
					if (!updateAccList.isEmpty()) {
						Database.update (updateAccList,false);
					}
				}
			}
			catch(Exception e){
				If (e.getMessage().contains('Too many query rows: 50001')){
					Database.executeBatch(new ContactRollupOnAccount(accountIds));
				}
			}
		}
	}
}