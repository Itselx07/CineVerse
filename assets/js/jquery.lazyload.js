(function(c, e, k, g) {
    var f = c(e);
    c.fn.lazyload = function(a) {
        function b() {
            var a = 0;
            h.each(function() {
                var b = c(this);
                if (!(d.skip_invisible && !b.is(":visible") || c.abovethetop(this, d) || c.leftofbegin(this, d)))
                    if (!c.belowthefold(this, d) && !c.rightoffold(this, d)) b.trigger("appear"), a = 0;
                    else if (++a > d.failure_limit) return !1
            })
        }
        var h = this,
            d = {
                threshold: 0,
                failure_limit: 0,
                event: "scroll",
                effect: "show",
                container: e,
                data_attribute: "original",
                skip_invisible: !0,
                appear: null,
                load: null,
                placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
            };
        a && (g !== a.failurelimit && (a.failure_limit = a.failurelimit, delete a.failurelimit), g !== a.effectspeed && (a.effect_speed = a.effectspeed, delete a.effectspeed), c.extend(d, a));
        a = d.container === g || d.container === e ? f : c(d.container);
        0 === d.event.indexOf("scroll") && a.bind(d.event, function() {
            return b()
        });
        this.each(function() {
            var a = this,
                b = c(a);
            a.loaded = !1;
            (b.attr("src") === g || !1 === b.attr("src")) && b.is("img") && b.attr("src", d.placeholder);
            b.one("appear", function() {
                this.loaded || (d.appear && d.appear.call(a, h.length, d), c("<img />").bind("load", function() {
                    var e = b.attr("data-" + d.data_attribute);
                    b.hide();
                    b.is("img") ? b.attr("src", e) : b.css("background-image", "url('" + e + "')");
                    b[d.effect](d.effect_speed);
                    a.loaded = !0;
                    e = c.grep(h, function(a) {
                        return !a.loaded
                    });
                    h = c(e);
                    d.load && d.load.call(a, h.length, d)
                }).attr("src", b.attr("data-" + d.data_attribute)))
            });
            0 !== d.event.indexOf("scroll") && b.bind(d.event, function() {
                a.loaded || b.trigger("appear")
            })
        });
        f.bind("resize", function() {
            b()
        });
        /(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion) && f.bind("pageshow", function(a) {
            a.originalEvent && a.originalEvent.persisted && h.each(function() {
                c(this).trigger("appear")
            })
        });
        c(k).ready(function() {
            b()
        });
        return this
    };
    c.belowthefold = function(a, b) {
        return (b.container === g || b.container === e ? (e.innerHeight ? e.innerHeight : f.height()) + f.scrollTop() : c(b.container).offset().top + c(b.container).height()) <= c(a).offset().top - b.threshold
    };
    c.rightoffold = function(a, b) {
        return (b.container === g || b.container === e ? f.width() + f.scrollLeft() : c(b.container).offset().left + c(b.container).width()) <= c(a).offset().left - b.threshold
    };
    c.abovethetop = function(a, b) {
        return (b.container === g || b.container === e ? f.scrollTop() : c(b.container).offset().top) >= c(a).offset().top + b.threshold + c(a).height()
    };
    c.leftofbegin = function(a, b) {
        return (b.container === g || b.container === e ? f.scrollLeft() : c(b.container).offset().left) >= c(a).offset().left + b.threshold + c(a).width()
    };
    c.inviewport = function(a, b) {
        return !c.rightoffold(a, b) && !c.leftofbegin(a, b) && !c.belowthefold(a, b) && !c.abovethetop(a, b)
    };
    c.extend(c.expr[":"], {
        "below-the-fold": function(a) {
            return c.belowthefold(a, {
                threshold: 0
            })
        },
        "above-the-top": function(a) {
            return !c.belowthefold(a, {
                threshold: 0
            })
        },
        "right-of-screen": function(a) {
            return c.rightoffold(a, {
                threshold: 0
            })
        },
        "left-of-screen": function(a) {
            return !c.rightoffold(a, {
                threshold: 0
            })
        },
        "in-viewport": function(a) {
            return c.inviewport(a, {
                threshold: 0
            })
        },
        "above-the-fold": function(a) {
            return !c.belowthefold(a, {
                threshold: 0
            })
        },
        "right-of-fold": function(a) {
            return c.rightoffold(a, {
                threshold: 0
            })
        },
        "left-of-fold": function(a) {
            return !c.rightoffold(a, {
                threshold: 0
            })
        }
    })
})(jQuery, window, document);