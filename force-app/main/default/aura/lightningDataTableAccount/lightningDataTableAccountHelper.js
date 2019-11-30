({
  /**
   * \arg function        : callApexMethod
   * \arg CreatededBy      : Sarvesh
   * \arg Description      : generic callback function to call server
   */
  callApexMethod: function(cmp, methodName, params, callbackRess) {
    let state, action;
    action = cmp.get(methodName);
    if (params) {
      action.setParams(params);
    }
    action.setCallback(this, function(response) {
      state = response.getState();
      if (state === "SUCCESS") {
        callbackRess(response.getReturnValue());
      } else if (state === "ERROR") {
        let errors = response.getError();
        if (errors) {
          let message = "Unknown error"; // Default error message
          // Retrieve the error message sent by the server
          if (errors && Array.isArray(errors) && errors.length > 0) {
            message = errors[0].message;
            this.showToast("Error!!", message, "error");
          }
        }
      }
    });
    $A.enqueueAction(action);
  }
});
