({
  init: function(component, event, helper) {
    const columns = [
      { label: "Name", fieldName: "Name" },
      { label: "Phone", fieldName: "Phone", type: "phone" },
      { label: "Industry", fieldName: "Industry" }
    ];
    component.set("v.columns", columns);
    let methodName = "c.fetchAccountDetails",
      callbackRess = response => {
        if (response) {
          component.set("v.data", response);
        }
      };
    helper.callApexMethod(component, methodName, null, callbackRess);
  }
});
