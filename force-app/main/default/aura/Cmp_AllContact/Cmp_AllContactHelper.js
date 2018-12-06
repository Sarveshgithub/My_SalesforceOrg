({
    getAllContacts : function(component, event, helper, rrr) 
    {
        console.log('event======sadsad=========>>', event);
        console.log('helper=====asdasdd==========>>', helper);
        console.log('rrr=====rrr==========>>', rrr);
        var action = component.get("c.get10COntacts");
        action.setCallback(this, function(a)
                           {
                               console.log('=====a.getReturnValue()==========>>', a.getReturnValue());
                               component.set("v.contactRows", a.getReturnValue());
                           });
        $A.enqueueAction(action);
    }
})