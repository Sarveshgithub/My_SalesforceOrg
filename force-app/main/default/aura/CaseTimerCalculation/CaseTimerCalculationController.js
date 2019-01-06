({
    initMethod: function(cmp, evt, help) {
        if(cmp.get('v.autostart')){
        	cmp.set('v.play_pause',false);
            help.timer(cmp, evt, help);
        }
        else{
        	cmp.set('v.play_pause',true);
        }
        
        help.loadOwnerId(cmp, evt, help);
        help.loadSessionData(cmp, evt, help);
        help.totalTime(cmp, evt, help);
    },
    customSession: function(cmp, evt, help) {
        let t_id = cmp.find('c_time'),
            d_id = cmp.find('c_date'),
            c_timer = t_id.get('v.value'),
            c_date = d_id.get('v.value'),
            spt, t = 0,
            d = false;
        if (c_timer) {
            spt = c_timer.split(':');
            if (spt.length == 3) {
                for (let i = 0; i < spt.length; i++) {
                    if (!isNum(spt[i])) {
                        error(t_id, 'Please enter into correct format');
                        break;
                        return;
                    } else {
                        t++;
                        error(t_id, '')
                    }
                }
            }
        } else {
            error(t_id, 'Please enter into correct format')
        }
        if (c_date) {
            error(d_id, '')
            d = true
        } else {
            error(d_id, 'Please choose date')
        }

        function isNum(strNum) {
            return strNum.length == 2 ? !isNaN(parseInt(strNum[0])) ? !isNaN(parseInt(strNum[1])) ? true : false : false : false;
        }

        function error(auraid, msg) {
            auraid.setCustomValidity(msg);
            auraid.reportValidity();
        }
        if (t == 3 && d) {
            cmp.set('v.isLoading', true);
            help.createCustomSession(cmp, evt, help, c_timer, c_date);
            cmp.set('v.isShow', cmp.get('v.isShow') ? false : true);
        }
    },
    showModal: function(cmp, evt, help) {
        cmp.set('v.isShow', cmp.get('v.isShow') ? false : true);
    },
    playPause: function(cmp, evt, help) {
        
        if (!cmp.get('v.play_pause')) {
            cmp.set('v.isLoading', true);
            window.clearInterval(cmp.get("v.setIntervalId"));
            help.createSession(cmp, evt, help);
        } else {
            help.timer(cmp, evt, help);
        }
        cmp.set('v.play_pause', cmp.get('v.play_pause') ? false : true);
    },
    handleSave: function(cmp, evt, help) {
        help.createSession(cmp, evt, help);
    },
    handleDiscard: function(cmp, evt, help) {
        help.createSession(cmp, evt, help);
    }
})