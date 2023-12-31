! function() {
    const E = {
        width: 425,
        height: 400,
        padding: 40,
        strokeWidth: 4,
        alts: ["Random endpoints method", "Random radial point method", "Random midpoint method"]
    };
    var t = [
        ["#fff5f0", "#fee3d6", "#fdc9b4", "#fcaa8e", "#fc8a6b", "#f9694c", "#ef4533", "#d92723", "#bb151a", "#970b13", "#67000d"],
        ["#fcfbfd", "#f1eff6", "#e2e1ef", "#cecee5", "#b6b5d8", "#9e9bc9", "#8782bc", "#7363ac", "#61409b", "#501f8c", "#3f007d"],
        ["#f7fcf5", "#e8f6e3", "#d3eecd", "#b7e2b1", "#97d494", "#73c378", "#4daf62", "#2f984f", "#157f3b", "#036429", "#00441b"]
    ];

    const a = {
            fill: 5,
            stroke: 10
        },
        I = (E.colours = t.map(t => Object.fromEntries([
            ["fill", t[a.fill]],
            ["stroke", t[a.stroke]]
        ])), {
            width: 1,
            nodeRadius: 6
        }),
        L = {
            width: 2 * E.width,
            height: E.height,
            margin: {
                left: 50,
                right: 0,
                top: 40,
                bottom: 60
            },
            xPadding: .4,
            labels: ["Random endpoints", "Random radial points", "Random midpoints"],
            fontSize: {
                title: 16,
                ticks: 14
            }
        },
        W = {
            width: E.width,
            height: E.height,
            margin: {
                left: 10,
                right: 70,
                top: 20,
                bottom: 60
            },
            fontSize: {
                title: 16,
                text: 14
            },
            rx: 20,
            colour: "#e2e2e2"
        },
        H = {
            slow: 3e3,
            medium: 1e3,
            fast: 200,
            fastest: 0.1
        },
        T = (E.radius = (E.width - E.padding) / 2, E.cx = [E.width / 2, 3 * E.width / 2, 5 * E.width / 2], E.cy = E.height / 2, L.innerWidth = L.width - L.margin.left - L.margin.right, L.innerHeight = L.height - L.margin.top - L.margin.bottom, 3 * E.width),
        O = E.height + L.height;

        function drawEquilateralTriangle(svg, cx, cy, radius) {
            var points = [];
            for (var i = 0; i < 3; i++) {
                var angle = 2 * Math.PI / 3 * i + Math.PI / 6;
                var x = cx + radius * Math.cos(angle);
                var y = cy + radius * Math.sin(angle);
                points.push([x, y]);
            }
            svg.append("polygon")
                .attr("points", points.map(p => p.join(",")).join(" "))
                .attr("fill", "none")
                .attr("stroke", "black") // Color of the triangle
                .attr("stroke-width", 3);
        }

    function j(t, a, e, r, i, n) {
        t.append("circle").attr("cx", a).attr("cy", e).attr("r", r).attr("fill", "transparent").transition().duration(n / 2).attr("fill", i.stroke).transition().duration(n / 2).attr("fill", "transparent").remove()
    }

    function C(t, a, e) {
        var r = -t / a,
            a = a - r * t,
            t = 1 + r ** 2,
            i = 2 * r * a,
            e = i ** 2 - 4 * t * (a ** 2 - e ** 2),
            n = (-i + Math.sqrt(e)) / (2 * t),
            i = (-i - Math.sqrt(e)) / (2 * t);
        return [n, r * n + a, i, r * i + a]
    }
    document.addEventListener("DOMContentLoaded", () => {
        var a, e, r, i, n, o, d, t, s, l, h, c, p, f, m, g, u, b, x = d3.select("#visualization").style("position", "relative").style("width", T + "px").style("height", O + "px").style("overflow-x", "auto");
        const w = x.append("svg").attr("width", T + "px").attr("height", O + "px").attr("alt", `A visualization of Bertrand's paradox, showing three different methods to randomly generate chords in a unit circle. Each method results in
        a different probability of a given randomly-generate chord having a length that exceeds the square root of three. The methods are,
        from left to right: random endpoints, random radial points, and random midpoints. The top row of the diagram shows a circle for each method,
        with randomly-generated chords being added in real time. The bottom row of the diagram provides a control panel for setting the speed of
        generation as well as a bar chart for recording the evolving probabilities.`);

        for (let t = 0; t < 3; t++) a = w, e = E.cx[t], r = E.cy, i = E.radius, n = E.strokeWidth, o = E.colours[t], d = E.alts[t], a.append("g").attr("transform", `translate(${e},${r})`).append("circle").attr("r", i).attr("stroke", o.stroke).attr("stroke-width", n).attr("fill", o.fill).attr("alt", d + " circle");
        drawEquilateralTriangle(w, E.cx[0], E.cy, E.radius);drawEquilateralTriangle(w, E.cx[1], E.cy, E.radius);drawEquilateralTriangle(w, E.cx[2], E.cy, E.radius);
        const k = E.cx.map(t => w.append("g").attr("transform", `translate(${t},${E.cy})`).attr("class", "lines")),
            [y, M, v] = (t = w, s = T - L.width, l = E.height, h = L.innerHeight, c = L.innerWidth, p = L.margin, f = L.xPadding, m = L.labels, g = L.fontSize, m = d3.scaleBand().domain(m).range([0, c]).padding(f), f = d3.scaleLinear().domain([1, 0]).range([0, h]), u = d3.axisBottom().scale(m), b = d3.axisLeft().scale(f), t = t.append("g").attr("transform", `translate(${s}, ${l})`).attr("width", c + p.left + p.right).attr("height", h + p.top + p.bottom), (s = t.append("g").attr("transform", `translate(${p.left}, ${p.top+h})`).call(u)).selectAll(".tick").attr("font-size", "" + g.ticks), (l = t.append("g").attr("transform", `translate(${p.left}, ${p.top})`).call(b)).selectAll(".tick").attr("font-size", "" + g.ticks), t.append("g").attr("transform", `translate(0, ${p.top+h/2})`).append("text").text("Probability").attr("text-anchor", "middle").attr("dominant-baseline", "central").attr("transform", "rotate(-90)").attr("font-size", g.title + "pt"), t.append("g").attr("transform", `translate(${p.left+c/2}, ${p.top+h+p.bottom-g.title})`).append("text").text("Method").attr("text-anchor", "middle").attr("dominant-baseline", "central").attr("font-size", g.title + "pt"), [t, m, f]);
        var $ = document.querySelectorAll("input");
        const z = L.labels.map(t => [t, 0]);
        let R = 1,
            A = "medium",
            q = 1e3;
        for (let t = 0; t < $.length; t++) $[t].checked && (A = $[t].id, q = H[$[t].id]);
        let P = 2 * q / 3;

        function S() {
            var a, e, r, i, n, o, d, s, t, l, h, c, p, f, m, g, u, b, x;
            R <= 2e3 ? (t = k[0], l = E.radius, h = E.colours[0], c = I.width, p = I.nodeRadius, f = P, m = 2 * Math.PI * Math.random(), g = 2 * Math.PI * Math.random(), u = l * Math.cos(m), m = l * Math.sin(m), b = l * Math.cos(g), g = l * Math.sin(g), x = Math.hypot(b - u, g - m), t.append("line").attr("x1", u).attr("y1", m).attr("x2", b).attr("y2", g).attr("stroke", h.stroke).attr("stroke-width", 0).transition().duration(f / 2).attr("stroke-width", 2 * c).transition().duration(f / 2).attr("stroke-width", c), j(t, u, m, p, h, f), j(t, b, g, p, h, f), x > Math.sqrt(3) * l && (z[0][1] += 1), function(t, a, e, r, i, n) {
                var o = 2 * Math.PI * Math.random(),
                    d = a * Math.random(),
                    s = d * Math.cos(o),
                    d = d * Math.sin(o),
                    l = a * Math.cos(o),
                    o = a * Math.sin(o),
                    [l, o, i, s] = (t.append("line").attr("x1", 0).attr("y1", 0).attr("x2", l).attr("y2", o).attr("stroke", "transparent").attr("stroke-width", 2 * r).transition().duration(n / 2).attr("stroke", e.stroke).transition().duration(n / 2).attr("stroke", "transparent"), j(t, s, d, i, e, n), C(s, d, a)),
                    d = Math.hypot(i - l, s - o);
                return t.append("line").attr("x1", l).attr("y1", o).attr("x2", i).attr("y2", s).attr("stroke", e.stroke).attr("stroke-width", 0).transition().duration(n / 2).attr("stroke-width", 2 * r).transition().duration(n / 2).attr("stroke-width", r), d > Math.sqrt(3) * a
            }(k[1], E.radius, E.colours[1], I.width, I.nodeRadius, P) && (z[1][1] += 1), function(t, a, e, r, i, n) {
                var [o, d] = function t() {
                    const a = 2 * Math.random() - 1;
                    const e = 2 * Math.random() - 1;
                    if (Math.hypot(a, e) <= 1) return [a, e];
                    return t()
                }();
                o *= a, d *= a, j(t, o, d, i, e, n);
                var [i, o, d, s] = C(o, d, a), l = Math.hypot(d - i, s - o);
                return t.append("line").attr("x1", i).attr("y1", o).attr("x2", d).attr("y2", s).attr("stroke", e.stroke).attr("stroke-width", 0).transition().duration(n / 2).attr("stroke-width", 2 * r).transition().duration(n / 2).attr("stroke-width", r), l > Math.sqrt(3) * a
            }(k[2], E.radius, E.colours[2], I.width, I.nodeRadius, P) && (z[2][1] += 1), c = y, u = z, a = R, e = L.margin, r = L.innerHeight, i = M, n = v, o = E.colours, d = L.fontSize, s = E.alts, c.selectAll(".bars").remove(), c.selectAll("rect").data(u).enter().append("rect").attr("class", "bars").attr("x", t => e.left + i(t[0])).attr("y", t => e.top + n(t[1] / a)).attr("width", i.bandwidth()).attr("height", t => r - n(t[1] / a)).attr("fill", (t, a) => o[a].fill).attr("alt", (t, a) => s[a] + " bar"), c.append("g").attr("class", "bars").selectAll("text").data(u).enter().append("text").attr("text-anchor", "middle").attr("x", t => e.left + i(t[0]) + i.bandwidth() / 2).attr("y", t => e.top + n(t[1] / a) - d.title / 2).attr("font-size", d.title + "pt").text(t => (t[1] / a).toPrecision(2)), u = 1 === a ? a + " step" : a + " steps", c.append("text").text(u).attr("class", "bars").attr("x", e.left + i("Random radial points") + i.bandwidth() / 2).attr("text-anchor", "middle").attr("font-size", d.title + "pt").attr("font-weight", "bold"), R += 1) : B.stop()
        }
        let B = d3.interval(S, q);
        d3.timerFlush(), x.select(".panel").style("position", "absolute").style("top", W.margin.top + E.height + "px").style("left", W.margin.left + "px").style("width", W.width - W.margin.left - W.margin.right + "px").style("height", W.height - W.margin.top - W.margin.bottom + "px").style("background-color", W.colour).style("border-radius", W.rx + "px");
        for (let t = 0; t < $.length; t++) $[t].onchange = function() {
            B.stop(), A = this.id, "pause" !== this.id && (q = H[this.id], P = 2 * q / 3, S(), B = d3.interval(S, q))
        };
        document.getElementById("reset").onclick = () => {
            z[0][1] = 0, z[1][1] = 0, z[2][1] = 0, d3.selectAll(".lines").selectAll("*").remove(), d3.selectAll(".bars").remove(), "pause" !== A && 2e3 < R && (B = d3.interval(S, q)), R = 1
        }
    })
}();