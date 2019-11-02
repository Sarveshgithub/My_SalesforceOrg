({
    doInit: function (component, event, helper) {
        let empObj = {
            'projectDetail': [],
            'currentScreen': 'searchProject',
            'screenNames': ['searchProject', 'selectEmp'],
            'title': { 'searchProject': 'Please search the Project', 'selectEmp': 'Please select Employee for Review' },
            'currentTitle': 'Please search the Project'
        };
        component.set('v.empDetail', empObj);
    },
    next: function (cmp, evt, help) {
        let empObj = cmp.get('v.empDetail');
        let currentScreen = empObj.currentScreen;
        let screenName = empObj.screenNames;
        empObj.currentScreen = screenName[screenName.indexOf(currentScreen) + 1]
        console.log('ss', empObj['title'][screenName[screenName.indexOf(currentScreen) + 1]])
        empObj['currentTitle'] = empObj['title'][screenName[screenName.indexOf(currentScreen) + 1]]
        cmp.set('v.empDetail', empObj)
    },
    prev: function (cmp, evt, help) {
        let empObj = cmp.get('v.empDetail');
        let currentScreen = empObj.currentScreen;
        let screenName = empObj.screenNames;
        empObj.currentScreen = screenName[screenName.indexOf(currentScreen) - 1]
        empObj['currentTitle'] = empObj['title'][screenName[screenName.indexOf(currentScreen) - 1]]
        cmp.set('v.empDetail', empObj)
    }
})