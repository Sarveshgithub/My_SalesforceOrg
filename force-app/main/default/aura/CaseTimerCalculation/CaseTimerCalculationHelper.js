({
    timer: function (cmp, evt, h) {

        var h = 0, m = 0, s = 0;
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
    }
})