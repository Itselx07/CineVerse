(function(e) {
    e.fn.hoverIntent = function(a, l, p) {
        var b = {
                interval: 100,
                sensitivity: 6,
                timeout: 0
            },
            b = "object" === typeof a ? e.extend(b, a) : e.isFunction(l) ? e.extend(b, {
                over: a,
                out: l,
                selector: p
            }) : e.extend(b, {
                over: a,
                out: a,
                selector: l
            }),
            f, g, h, k, m = function(b) {
                f = b.pageX;
                g = b.pageY
            },
            n = function(a, d) {
                d.hoverIntent_t = clearTimeout(d.hoverIntent_t);
                if (Math.sqrt((h - f) * (h - f) + (k - g) * (k - g)) < b.sensitivity) return e(d).off("mousemove.hoverIntent", m), d.hoverIntent_s = !0, b.over.apply(d, [a]);
                h = f;
                k = g;
                d.hoverIntent_t = setTimeout(function() {
                    n(a, d)
                }, b.interval)
            };
        a = function(a) {
            var d = e.extend({}, a),
                c = this;
            c.hoverIntent_t && (c.hoverIntent_t = clearTimeout(c.hoverIntent_t));
            "mouseenter" === a.type ? (h = d.pageX, k = d.pageY, e(c).on("mousemove.hoverIntent", m), c.hoverIntent_s || (c.hoverIntent_t = setTimeout(function() {
                n(d, c)
            }, b.interval))) : (e(c).off("mousemove.hoverIntent", m), c.hoverIntent_s && (c.hoverIntent_t = setTimeout(function() {
                c.hoverIntent_t = clearTimeout(c.hoverIntent_t);
                c.hoverIntent_s = !1;
                b.out.apply(c, [d])
            }, b.timeout)))
        };
        return this.on({
            "mouseenter.hoverIntent": a,
            "mouseleave.hoverIntent": a
        }, b.selector)
    }
})(jQuery);