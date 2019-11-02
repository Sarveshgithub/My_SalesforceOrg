({
    doInit: function (cmp, event, help) {
        help.loadData(cmp, event, help);
    },
    handleChange: function (cmp, help, event) {
        // This will contain the string of the "value" attribute of the selected option
        var selectedOptionValue = event.getParam("value");
        alert("Option selected with value: '" + selectedOptionValue + "'");
    }
})