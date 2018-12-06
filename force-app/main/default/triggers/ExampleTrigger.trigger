trigger ExampleTrigger on Contact (after insert, after delete) {
    if(Trigger.isInsert) {
        Integer recordCount = Trigger.New.Size();
        String s = String.valueOf(recordCount)+'Contact records';
        EmailManager.sendMail('sarvesh.kumar@silverlinecrm.com', 'Test', s);
    }
}