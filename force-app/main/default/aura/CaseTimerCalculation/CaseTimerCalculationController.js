({
    initMethod: function (cmp, evt, h) {

        var h = 0, m = 0, s;
        h = localStorage.getItem("hour") != null ? localStorage.getItem("hour") : 0;
        m = localStorage.getItem("min") != null ? localStorage.getItem("min") : 0;
        s = localStorage.getItem("sec") != null ? localStorage.getItem("sec") : 0;

        var interval = window.setInterval(
            $A.getCallback(function () {

                var value = s++;
                if (s > 59) {
                    s = 1;
                    m++;
                    if (m > 59) {
                        m = 1;
                        h++;
                    }
                }
                console.log(h + ':' + m + ':' + value + ' from component with id ' + cmp.getGlobalId());
                // code to execute periodically goes here
                cmp.set("v.hour", h);
                cmp.set("v.min", m);
                cmp.set("v.sec", s);


            }), 1000
        );


        cmp.set("v.setIntervalId", interval);

    },
    playPause: function(cmp,evt,h) {
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