({
    timer: function(cmp, evt, help) {
        var h = 0,
            m = 0,
            s = 0;
        var interval = window.setInterval($A.getCallback(function() {
            var value = s++;
            if (s > 59) {
                s = 0;
                m++;
                if (m > 59) {
                    m = 0;
                    h++;
                }
            }
            h = h.toString();
            m = m.toString();
            s = s.toString();
            h = h.length < 2 ? `0${h}` : h;
            m = m.length < 2 ? `0${m}` : m;
            s = s.length < 2 ? `0${s}` : s;
            cmp.set("v.timer", `${h}:${m}:${s}`);
        }), 1000);
        cmp.set("v.setIntervalId", interval);
    },
    totalTime: function(cmp, evt, help) {
        let methodName = 'c.totalTime',
            params = {
                'recId': cmp.get('v.recordId'),
                'CurrLookup': 'Case__c'
            },
            callbackRess = (response) => {
                if (response) {
                    let totaltime = '00:00:00';
                    response.map(val => {
                        totaltime = this.addTimes(totaltime, val['Time__c']);
                    })
                    cmp.set('v.totaltime', totaltime);
                }
            }
        this.callApexMethod(cmp, methodName, params, callbackRess);
    },
    loadOwnerId: function(cmp, evt, help) {
        let methodName = 'c.fetchSessionOwner',
            params = {
                'recId': cmp.get('v.recordId')
            },
            callbackRess = (response) => {
                if (response) {
                    cmp.set('v.ownerId', response[0]['OwnerId']);
                }
            }
        this.callApexMethod(cmp, methodName, params, callbackRess);
    },
    loadSessionData: function(cmp, evt, help) {
        let methodName = 'c.fetchSession',
            params = {
                'recId': cmp.get('v.recordId'),
                'CurrLookup': 'Case__c'
            },
            callbackRess = (response) => {
                if (response) {
                    response.map(val => {
                        val['Owner_Name'] = val['Session_Owner__r']['Name'];
                    })
                    cmp.set('v.data', response);
                    cmp.set('v.columns', [{
                        label: 'Agent',
                        fieldName: 'Owner_Name',
                        type: 'text'
                    }, {
                        label: 'Date',
                        fieldName: 'Date__c',
                        type: 'date-local'
                    }, {
                        label: 'Time',
                        fieldName: 'Time__c',
                        type: 'text'
                    }]);
                }
            }
        this.callApexMethod(cmp, methodName, params, callbackRess);
    },
    createSession: function(cmp, evt, help) {
        let timezone = $A.get("$Locale.timezone"),
            mydate = new Date().toLocaleString("en-US", {
                timeZone: timezone
            });
        var lookup = cmp.get('v.curLookup');
        let arrdate = mydate.split(',')[0].split('/'),
            strdate = arrdate[2] + '-' + arrdate[0] + '-' + arrdate[1],
            jsonSession = {
                'Session_Owner__c': cmp.get('v.ownerId'),
                'Time__c': cmp.get('v.timer'),
                'Date__c': strdate,
                [lookup]: cmp.get('v.recordId')
            },
            methodName = 'c.createSession',
            params = {
                'jsonstr': JSON.stringify(jsonSession)
            },
            callbackRess = (response) => {
                if (response) {
                    var unsaved = cmp.find("unsaved");
                    this.loadSessionData(cmp, evt, help);
                    cmp.set('v.totaltime', this.addTimes(cmp.get('v.totaltime'), cmp.get('v.timer')));
                    this.showToast('Success!!', 'Session recorded', 'success');
                    cmp.set('v.timer', '00:00:00');
                    unsaved.setUnsavedChanges(false);
                    cmp.set('v.isLoading', false);
                }
            }
        this.callApexMethod(cmp, methodName, params, callbackRess);
    },
    callApexMethod: function(cmp, methodName, params, callbackRess) {
        let state, action;
        action = cmp.get(methodName);
        action.setParams(params);
        action.setCallback(this, function(response) {
            state = response.getState();
            if (state === "SUCCESS") {
                callbackRess(response.getReturnValue())
            } else if (state === 'ERROR') {
                let errors = response.getError();
                if (errors) {
                    let message = 'Unknown error'; // Default error message
                    // Retrieve the error message sent by the server
                    if (errors && Array.isArray(errors) && errors.length > 0) {
                        message = errors[0].message;
                        this.showToast('Error!!', message, 'error');
                    }
                }
            }
        });
        $A.enqueueAction(action);
    },
    showToast: function(title, message, type) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title: title,
            message: message,
            type: type,
        });
        toastEvent.fire();
    },
    addTimes: function(startTime, endTime) {
        var times = [0, 0, 0]
        var max = times.length
        var a = (startTime || '').split(':')
        var b = (endTime || '').split(':')
        // normalize time values
        for (var i = 0; i < max; i++) {
            a[i] = isNaN(parseInt(a[i])) ? 0 : parseInt(a[i])
            b[i] = isNaN(parseInt(b[i])) ? 0 : parseInt(b[i])
        }
        // store time values
        for (var i = 0; i < max; i++) {
            times[i] = a[i] + b[i]
        }
        var hours = times[0]
        var minutes = times[1]
        var seconds = times[2]
        if (seconds >= 60) {
            var m = (seconds / 60) << 0
            minutes += m
            seconds -= 60 * m
        }
        if (minutes >= 60) {
            var h = (minutes / 60) << 0
            hours += h
            minutes -= 60 * h
        }
        return ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2)
    }
})