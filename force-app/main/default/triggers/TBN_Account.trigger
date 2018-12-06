/*
@Trigger Name  :  
@JIRA Ticket   :  
@Created on    :  
@Created by    :  
@Modified by   :  
@Description   : 
*/

trigger TBN_Account on Contact (before insert, after insert, after update,before update, after delete, before delete){
    // call the handler class
    /*TBN_AccountHandler objHandler = new TBN_AccountHandler();
    No_of_Class objHandler1 =new No_of_Class();
    
    //is before insert
    if(Trigger.isBefore && Trigger.isInsert){
        objHandler.isBeforeInsert(trigger.new);
    }
    
    // is after insert
    if(Trigger.isAfter && Trigger.isInsert){
        objHandler.isAfterInsert(trigger.New);
        objHandler1.isAfterInsert(trigger.New);
    }
    if(Trigger.isAfter && Trigger.isUpdate)
    {
        objHandler.isAfterUpdate(trigger.New,trigger.Old);
    }
    if(Trigger.isAfter && Trigger.isDelete){
        objHandler.isAfterDelete(trigger.Old);
        objHandler1.isAfterInsert(trigger.Old);
    }*/
}