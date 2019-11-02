({
    onblur: function (cmp, event, help) {
        // on mouse leave clear the listOfSeachRecords & hide the search result cmp 
        //cmp.set("v.listOfSearchRecords", null);
        cmp.set("v.SearchKeyWord", '');
        var forclose = cmp.find("searchRes");
        $A.util.addClass(forclose, 'slds-is-close');
        $A.util.removeClass(forclose, 'slds-is-open');
    },
    handleChange: function (cmp, help, event) {
        // debugger;
        // var forOpen = cmp.find("searchRes");
        //$A.util.removeClass(forOpen, 'slds-is-close');
        //$A.util.addClass(forOpen, 'slds-is-open');
    },
    onfocus: function (cmp, event, help) {
        let onchangeVal = cmp.find('objName').get('v.value'),
            json = JSON.parse(JSON.stringify(cmp.get('v.json')));
        cmp.set('v.lstAPIsearchOption', JSON.parse(JSON.stringify(json[onchangeVal])));
        cmp.set('v.lstAPIoption', JSON.parse(JSON.stringify(json[onchangeVal])));
        console.log('selected rec', onchangeVal, JSON.parse(JSON.stringify(cmp.get('v.json'))), cmp.get('v.listOfSearchRecords'));
        var forOpen = cmp.find("searchRes");
        $A.util.removeClass(forOpen, 'slds-is-close');
        $A.util.addClass(forOpen, 'slds-is-open');
    },

    keyPressController: function (cmp, event, help) {
        let json = cmp.get('v.lstAPIoption');
        console.log('jsondata', json);
        $A.util.addClass(cmp.find("mySpinner"), "slds-show");
        var getInputkeyWord = cmp.get("v.SearchKeyWord");
        if (getInputkeyWord.length > 0) {
            var forOpen = cmp.find("searchRes");
            $A.util.addClass(forOpen, 'slds-is-open');
            $A.util.removeClass(forOpen, 'slds-is-close');
            console.log('data:', getInputkeyWord, json);
            let filterData = json.filter(val => {
                return val.field.toLowerCase().includes(getInputkeyWord.toLowerCase())
            })
            console.log('filterData::', filterData);
            cmp.set('v.lstAPIsearchOption', filterData);
            //help.searchhelp(cmp,event,getInputkeyWord);
        }
        else {
            cmp.set('v.lstAPIsearchOption', json);
        }
    },

    // function for clear the Record Selaction 
    clear: function (cmp, event, heplper) {
        var selectedPillId = event.getSource().get("v.name");
        var AllPillsList = cmp.get("v.lstSelectedRecords");
        for (var i = 0; i < AllPillsList.length; i++) {
            if (AllPillsList[i].Id == selectedPillId) {
                AllPillsList.splice(i, 1);
                cmp.set("v.lstAPIsearchOption", AllPillsList);
            }
        }
        cmp.set("v.SearchKeyWord", null);
        cmp.set("v.lstAPIsearchOption", null);
    },

    // This function call when the end User Select any record from the result list.   
    handleComponentEvent: function (cmp, event, help) {
        cmp.set("v.SearchKeyWord", null);
        // get the selected object record from the cmp event 	 
        var listSelectedItems = cmp.get("v.lstSelectedRecords");
        var selectedAccountGetFromEvent = event.getParam("recordByEvent");
        listSelectedItems.push(selectedAccountGetFromEvent);
        cmp.set("v.lstSelectedRecords", listSelectedItems);
        var forclose = cmp.find("lookup-pill");
        $A.util.addClass(forclose, 'slds-show');
        $A.util.removeClass(forclose, 'slds-hide');
        var forclose = cmp.find("searchRes");
        $A.util.addClass(forclose, 'slds-is-close');
        $A.util.removeClass(forclose, 'slds-is-open');
    },
})