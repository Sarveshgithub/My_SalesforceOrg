({
    initMethod: function(cmp, evt, help) {
        setTimeout(function() {
            var unsaved = cmp.find("unsaved");
            unsaved.setUnsavedChanges(true, {
                label: 'Your Session are unsaved'
            });
        }, 1000);
        help.timer(cmp, evt, help);
        help.loadOwnerId(cmp, evt, help);
        help.loadSessionData(cmp, evt, help);
        help.totalTime(cmp, evt, help);
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