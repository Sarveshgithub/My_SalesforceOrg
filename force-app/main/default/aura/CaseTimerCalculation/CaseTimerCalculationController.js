({
    initMethod: function (cmp, evt, h) {
        h.timer(cmp, evt, h);

    },
    playPause: function (cmp, evt, h) {
        if (!cmp.get('v.play_pause')) {
            console.log('sfsd');
            window.clearInterval(cmp.get("v.setIntervalId"));

        }
        else {
            h.timer(cmp, evt, h);
        }
        cmp.set('v.play_pause', cmp.get('v.play_pause') ? false : true);

    },
    handleDestroy: function (cmp, evt, h) {
        localStorage.setItem("hour", cmp.get("v.hour"));
        localStorage.setItem("min", cmp.get("v.min"));
        localStorage.setItem("sec", cmp.get("v.sec"));
        console.log('clear interval due to navigation');
        window.clearInterval(cmp.get("v.setIntervalId"));
    },

    onTabClosed: function (cmp, evt, help) {
        alert('hey closed the tab');
    }
})