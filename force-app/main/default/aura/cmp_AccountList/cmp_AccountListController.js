({
    doInit: function (cmp, event, helper) {
        var action = cmp.get("c.getAccounts");
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                cmp.set("v.accList", response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },
    handleClick: function (component, event, helper) {
        $A.createComponent("c:cmp_AccountEdit", { recordId: event.getSource().get('v.value') },
            function (content, status) {
                if (status === "SUCCESS") {
                    component.find('overlayLib').showCustomModal({
                        header: "Account  Edit",
                        body: content,
                        showCloseButton: true,
                        cssClass: "mymodal",

                    })
                }
            });
    }

})