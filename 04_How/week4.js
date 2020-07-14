/* global vl, vega, vegaLite */

vl.register(vega, vegaLite, {});

const data = [
  { u: "A", v: 2, w: "one" },
  { u: "B", v: 8, w: "one" },
  { u: "C", v: 3, w: "one" },
  { u: "D", v: 1, w: "one" },
  { u: "E", v: 10, w: "two" },
  { u: "F", v: 7, w: "two" },
  { u: "G", v: 2, w: "two" },
  { u: "H", v: 4, w: "two" },
];

const base = vl
  .mark({ tooltip: true })
  .data(data)
  .encode(vl.x().fieldO("u"), vl.y().fieldQ("v"), vl.color().value("#003a70"))
  .width(120)
  .height(90);

// Marks and Channels
vl.hconcat(
  base.mark({ type: "bar" }),
  base
    .mark({ type: "point", size: 100 })
    .encode(vl.shape().fieldN("u").legend(false)),
  base.mark({ type: "line", point: true, interpolate: "monotone" }),
  base.mark({ type: "circle", size: 100 }),
  base
    .mark({ type: "text", fill: "steelblue", baseline: "middle" })
    .encode(vl.text().fieldN("u")),
  base.mark({ type: "area" })
)
  .spacing(15)
  .config({
    view: { stroke: null },
    axis: { labels: false, ticks: false, title: null, grid: false },
  })
  .render()
  .then((chart) => {
    document.getElementById("marksAndChannelsTarget").appendChild(chart);
  });

// Marks
const render = (id, chart) =>
  chart
    .spacing(15)
    .config({
      view: { stroke: null },
      axis: { labels: false, ticks: false, title: null, grid: false },
    })
    .render()
    .then((chart) => {
      document.getElementById(id).appendChild(chart);
    });

render("pointExample", base.mark({ type: "circle", size: 100 }));
render("lineExample", base.mark({ type: "bar" }));
render("areaExample", base.mark({ type: "area" }));

// Points
const base2 = vl
  .mark({ tooltip: true })
  .data(data)
  .encode(vl.y().fieldO("u"), vl.x().fieldQ("v"), vl.color().value("#003a70"))
  .width(120)
  .height(90);

const render2 = (id, chart) =>
  chart
    .spacing(15)
    .config({
      view: { stroke: null },
      //- axis: { labels:false, ticks: false, title: null, grid: false}
      axis: { title: false },
    })
    .render()
    .then((chart) => {
      document.getElementById(id).appendChild(chart);
    });

render2(
  "pointExample1",
  base2.mark({ type: "tick" }).encode(vl.y()).height(30)
);
render2("pointExample2", base2.mark({ type: "circle", size: 100 }));
render2(
  "pointExample3",
  base2
    .mark({ type: "point", size: 100 })
    .encode(vl.shape().fieldN("u").legend(false))
);
render2(
  "pointExample4",
  base2.mark({ type: "circle" }).encode(vl.size().fieldN("v").legend(false))
);
render2(
  "pointExample5",
  base2
    .mark({ type: "text", fill: "steelblue", baseline: "middle" })
    .encode(vl.text().fieldN("u"))
);
render2(
  "pointExample6",
  base2
    .mark({ type: "point" })
    .encode(
      vl.shape().fieldN("u").legend(false),
      vl.size().fieldN("v").legend(false),
      vl.color().fieldN("w").legend(false)
    )
);

// Line
const dataLine = [
  { u: "A", v: 2, w: "one" },
  { u: "B", v: 8, w: "one" },
  { u: "C", v: 3, w: "one" },
  { u: "D", v: 1, w: "one" },
  { u: "E", v: 10, w: "one" },
  { u: "F", v: 7, w: "one" },
  { u: "G", v: 2, w: "one" },
  { u: "H", v: 4, w: "one" },
  { u: "A", v: 3, w: "two" },
  { u: "B", v: 1, w: "two" },
  { u: "C", v: 5, w: "two" },
  { u: "D", v: 2, w: "two" },
  { u: "E", v: 1, w: "two" },
  { u: "F", v: 2, w: "two" },
  { u: "G", v: 7, w: "two" },
  { u: "H", v: 7, w: "two" },
];

const baseLines = vl
  .mark({ tooltip: true })
  .data(dataLine)
  .encode(vl.x().fieldO("u"), vl.y().average("v"), vl.color().value("#003a70"))
  .width(150)
  .height(90);

render2("lineExample1", baseLines.mark({ type: "line" }));
render2(
  "lineExample2",
  baseLines.mark({ type: "line" }).encode(vl.color().fieldN("w"))
);
render2(
  "lineExample3",
  baseLines.mark({ type: "line" }).encode(vl.strokeDash().fieldN("w"))
);
render2("lineExample4", baseLines.mark({ type: "bar" }));
render2(
  "lineExample5",
  baseLines.mark({ type: "bar" }).encode(vl.color().fieldN("w"))
);
render2(
  "lineExample6",
  baseLines
    .mark({ type: "bar" })
    .encode(vl.color().fieldN("w"), vl.size().average("v"))
);

// Areas
render2("areaExample1", baseLines.mark({ type: "area" }));
render2(
  "areaExample2",
  baseLines.mark({ type: "area" }).encode(vl.color().fieldN("w"))
);
render2(
  "areaExample3",
  baseLines
    .mark({ type: "area", interpolate: "monotone" })
    .encode(
      vl.color().fieldN("w"),
      vl.y().fieldQ("v").stack("center").axis(null)
    )
);
render2(
  "areaExample4",
  baseLines
    .mark({ type: "area", interpolate: "monotone" })
    .encode(
      vl.color().fieldN("w"),
      vl.y().fieldQ("v").stack("normalize").axis(null)
    )
);
render2(
  "areaExample5",
  baseLines
    .mark({ type: "rect" })
    .encode(vl.y().fieldO("w"), vl.x().fieldO("u"), vl.color().average("v"))
);
render2(
  "areaExample6",
  baseLines
    .mark({ type: "arc", innerRadius: 20 })
    .encode(vl.theta().average("v"), vl.color().fieldN("w"), vl.x(), vl.y())
);
