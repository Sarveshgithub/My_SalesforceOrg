({
    createExpense: function(component, expense) {
        var theExpenses = component.get("v.expenses");
        console.log(theExpenses);
        // Copy the expense to a new object
        // THIS IS A DISGUSTING, TEMPORARY HACK
        var newExpense = JSON.parse(JSON.stringify(expense));
   console.log(newExpense);
        theExpenses.push(newExpense);
        component.set("v.expenses", theExpenses);
    }
})