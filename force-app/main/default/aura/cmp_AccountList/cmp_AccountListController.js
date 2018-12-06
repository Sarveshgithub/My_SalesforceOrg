({
    doInit: function (component, event, helper) {
        helper.loadData(component, event, helper);
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
                        closeCallback: function () {
                            helper.loadData(component, event, helper);
                        }
                    })
                }
            });
    }

})