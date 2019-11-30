trigger ContactTrigger on Contact (before insert, after insert, before update, after update,after delete) {
    ContactTriggerHandler.rollUpContact(trigger.newMap,trigger.oldMap);
}