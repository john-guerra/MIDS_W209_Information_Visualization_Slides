/*jslint browser: true, indent: 4, multistr: true */
/* global d3: false, $: false, alert: false, TreeMap: false , FlickrUtils: true, console: true, utils: true*/


//Based in http://bost.ocks.org/mike/chart/time-series-chart.js
function bumpChartPhotos() {
    var margin = {top: 50, right: 120, bottom: 20, left: 120},
    width = 760,
    height = 150,
    topN = 15,
    IMG_WIDTH = 250,
    IMG_HEIGHT = 80,
    BOX_WIDTH = 270,
    BOX_HEIGHT = 30,
    MIN_IMG_WH = 70,
    HOVER_IMG_WH = 150,
    xValue = function(d) { return d.key; },
    yValue = function(d) { return d.values; },
    keyValue = function(d) { return d.id; },
    imgValue = function(d) { return d.img; },
    labelValue = function(d) { return d.id; },
    urlValue = function(d) { return d.url; },
    xScale = d3.scale.ordinal(),
    // xScale = d3.scale.linear(),
    yScale = d3.scale.linear(),
    colScale = d3.scale.category20(),
    // colScale = d3.scale.linear()
        // .interpolate(d3.interpolateHsl)
        // .interpolate(d3.interpolateLab)
        // .interpolate(d3.interpolateHcl)
        // .range(["#fff7fb", "#014636"]),
    xAxis = d3.svg.axis().scale(xScale).orient("top").tickSize(6,0),
    // xAxis = d3.svg.axis().scale(xScale).orient("bottom").tickSize(6,0),
    yAxis = d3.svg.axis().scale(yScale).orient("left").tickSize(- (width-margin.left -margin.right + BOX_WIDTH)),
    line = d3.svg.line().x(X).y(Y).interpolate("cardinal"),
    reverseYScale = true,
    colorByRank = false,
    dAvgRank,
    dFirstDate,
    data, nestedData;

    function processData(mdata) {
        if (reverseYScale) {
            data = mdata.filter(function (d, i) { return yValue(d, i) <= topN;}  );
        } else {
            data = mdata;
        }
        dFirstDate = d3.map();

        nestedData = d3.nest()
            .key(function (d, i) { return keyValue(d, i); })
            .key(function (d, i) { return xValue(d, i); })
            .entries(data);

        var maxDateLength = d3.max(nestedData, function (d)  {
            return d.values.length;
        });

        nestedData.forEach(function (d) {
            d.values.forEach(function (e) {
                // e.key = +e.key;
                // e.key = new Date(e.key);     // d3.nest coarse keys to strings
            });
            //sort dates
            d.values = d.values.sort( function (a, b) { return d3.ascending(a.key, b.key); });
            if (d.values.length > 0) {
                dFirstDate.set(d.key, d.values[0].key ); //From photo id to date
            }

            var sum = 0;
            d.values.forEach(function (d, i) {
                sum += yValue(d.values[0], i);
            });
            d.avg = sum / d.values.length;
        });

        dAvgRank = d3.map();
        //Compute a ranking of the photos based in the avg
        nestedData = nestedData.sort( function (a, b) {
            return d3.ascending(a.avg, b.avg);
        });
        nestedData.forEach(function (d, i) {
            dAvgRank.set(d.key, d.avg);
            d.avgRank = i;
        });

    }

    function chart(selection) {
        selection.each(function(mdata) {

            // Convert data to standard representation greedily;
            // this is needed for nondeterministic accessors.
            processData(mdata);

            // if (nestedData.length === 0) { return; }

            // Update the x-scale.
            xScale
                .domain(d3.set(data.map(xValue)).values())
                // .domain([0, 50])
                .rangePoints([0, width - margin.left - margin.right]);

            // Update the y-scale.
            yScale
                .domain(d3.extent(data, yValue));

            if (reverseYScale) {
                yScale.range([0, height - margin.top - margin.bottom]);

                // colScale.domain([d3.max(nestedData, function (d) { return d.avg; }),
                //     d3.min(nestedData, function (d) { return d.avg; })]);
            } else {
                yScale.range([height - margin.top - margin.bottom, 0]);

                // colScale.domain(d3.extent(nestedData, function (d) { return d.avg; }));
            }

            // Select the svg element, if it exists.
            svg = d3.select(this).selectAll("svg").data([nestedData]);

            // Otherwise, create the skeletal chart.
            var svgEnter = svg.enter().append("svg");

            var gEnter = svgEnter.append("g").attr("class", "mainArea");
            gEnter.append("g").attr("class", "lines");
            gEnter.append("g").attr("class", "x axis");
            gEnter.append("g").attr("class", "y axis");
            gEnter.append("g").attr("class", "boxes");

            chart.update(nestedData, data);

        });
    }

    function onHoverBox(d) {
        if (IMG_WIDTH < HOVER_IMG_WH) {
            d3.select(this)
                .select("image")
                .transition().duration(1000)
                .attr("width", HOVER_IMG_WH)
                .attr("height", HOVER_IMG_WH);

        }
    }

    function onExitBox(d) {
        d3.selectAll(".box")
            .select("image")
            .transition().duration(1000)
            .attr("width", IMG_WIDTH)
            .attr("height", IMG_HEIGHT);
    }

    chart.update = function (nestedData, data) {
        if (svg === undefined) {
            return; //not ready
        }
        var numDates = d3.max(nestedData, function (d) { return d.values.length; });
        if (reverseYScale) { //bumpchart
            IMG_HEIGHT = height * 0.8 / topN - 5;
            IMG_WIDTH = width / numDates * 0.4;
            IMG_HEIGHT = Math.max(MIN_IMG_WH, IMG_HEIGHT);
            IMG_WIDTH = Math.max(MIN_IMG_WH, IMG_WIDTH);

            IMG_WIDTH = IMG_HEIGHT = Math.min(IMG_WIDTH, IMG_HEIGHT);
            line = d3.svg.line().x(X).y(Y).interpolate("cardinal");
        } else {
            line = d3.svg.line().x(X).y(Y).interpolate("linear");
            IMG_HEIGHT = IMG_WIDTH = MIN_IMG_WH;
        }
        BOX_WIDTH = IMG_WIDTH * 1.1;
        BOX_HEIGHT = IMG_HEIGHT * 0.3;


        // if (numDates > 5) {
        //     xAxis.ticks(d3.time.days, Math.floor(numDates / 5));
        // } else {
        //     xAxis.ticks(d3.time.days, 1);
        // }



       // Update the x-axis.
        svg.select(".mainArea").select(".x.axis")
            // .attr("transform", "translate(0," + ( height - margin.top - margin.bottom + IMG_HEIGHT / 2  ) + ")")
            .attr("transform", "translate(0," + ( -15 ) + ")")
            .call(xAxis);

        // Update the y-axis.
        yAxis.tickSize(- (width-margin.left -margin.right + BOX_WIDTH));
        svg.select(".mainArea").select(".y.axis")
            // .call(yAxis)
            .attr("transform", "translate(" + (-1 * BOX_WIDTH /2 - 20) +  ",0)");



        // Update the outer dimensions.
        svg.attr("width", width)
            .attr("height", height);

        // Update the inner dimensions.
        svg.select(".mainArea")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // Update the lines
        var lines = svg.select(".lines").selectAll(".line")
            .data(function (d) { return d; },
                function (d) { return d.key; });

        lines.enter()
            .append("path")
            .attr("class", function (d, i) { return "line key" + d.key; })
            .on("mouseover", function (d) {
                console.log(d);
                hight(d.key); })
            .on("mouseout", clearHighlight)
            .on("click", function (d) { console.log(d); });
        lines
            .sort(function (a, b) {
                if (reverseYScale) {
                    return d3.descending(a.avgRank, b.avgRank);
                } else {
                    return d3.ascending(a.avgRank, b.avgRank);
                }
            }).transition().duration(1000)
            .style("stroke", function (d) {
                return colScale(d.key);
                // return colScale(d.avg);
            })
            .style("stroke-width", BOX_HEIGHT * 0.6)
            .attr("d", function (d) {
                return line(d.values);
            });
        lines.exit()
            .remove();

        // Update the boxes
        var boxes = svg.select(".boxes").selectAll(".box")
            .data( data,
                 function (d, i) { return keyValue(d, i) + ":" + xValue(d, i); });

        var boxEnter = boxes.enter()
            .append("g")
            .attr("class", function (d, i) { return "box key" + keyValue(d, i); })
            .on("mouseover", function (d, i) {  hight(keyValue(d, i) ); })
            .on("mouseout", clearHighlight)
            .on("click", function (d, i) { return onClick(d, i); })
            .on("mouseover", onHoverBox)
            .on("mouseout", onExitBox)
            .attr("transform", function (d, i) {
                return "translate(" + (xScale(xValue(d, i))) + "," +
                    (yScale(yValue(d, i))) + ")"; });
        boxEnter.append("rect");
        // boxEnter.append("image");
        boxEnter.append("text");

        var boxesTransition = boxes
            .sort(function (a, b) {
                if (reverseYScale) {
                    return d3.descending(dAvgRank.get(keyValue(a)), dAvgRank.get(keyValue(b)));
                } else {
                    return d3.ascending(dAvgRank.get(keyValue(a)), dAvgRank.get(keyValue(b)));
                }
            })
            .transition().duration(1000)
            .attr("transform", function (d, i) {
                return "translate(" + (xScale(xValue(d, i))) + "," +
                    (yScale(yValue(d, i))) + ")"; });

        boxesTransition.select("rect")
            .attr("x", -BOX_WIDTH/2)
            .attr("y", -BOX_HEIGHT/2)
            .attr("ry", 5)
            .attr("ry", 5)
            .attr("width", BOX_WIDTH)
            .attr("height", BOX_HEIGHT)
            .attr("fill", function (d, i) {
                return colScale(keyValue(d, i));
                // return colScale(dAvgRank.get(keyValue(d, i)));
            });


        // boxesTransition.select("image")
        //     .attr("x", -IMG_WIDTH/2)
        //     .attr("y", -IMG_HEIGHT/2)
        //     .attr("width", IMG_WIDTH)
        //     .attr("height", IMG_HEIGHT)
        //     // .style("opacity", function (d, i) {
        //     //     var dt1 = dFirstDate.get(keyValue(d, i)),
        //     //         dt2 = xValue(d, i);
        //     //     return  (dt1.getDay() === dt2.getDay() &&
        //     //         dt1.getMonth() === dt2.getMonth() &&
        //     //         dt1.getYear() === dt2.getYear())  ? //is this the first occurence
        //     //         1 :
        //     //         0;
        //     // })
        //     .attr("xlink:href", function (d, i) { return imgValue(d, i); });

        boxesTransition.select("text")
            // .attr("x", -BOX_WIDTH/2)
            // .attr("y", -BOX_HEIGHT/2)
            .attr("y", 5)
            .attr("dy", 0)
            // .attr("dx", -BOX_HEIGHT/2)
            .style("text-anchor", "middle")
            .text(function (d, i) { return labelValue(d, i); });


        boxes.exit()
            .remove();





    };

    function clearHighlight() {
        d3.select(".mainArea").classed("selected", false);
        d3.selectAll(".line").classed("selected", false);
        d3.selectAll(".box").classed("selected", false);
    }

    function hight(key) {
        d3.select(".mainArea").classed("selected", true);
        d3.selectAll(".key"+ key).classed("selected", true);
    }



    // The x-accessor for the path generator; xScale ∘ xValue.
    function X(d) {
        return xScale(d.key);
    }

    // The x-accessor for the path generator; yScale ∘ yValue.
    function Y(d) {
        return yScale(yValue(d.values[0]));
    }



    chart.margin = function(_) {
        if (!arguments.length) return margin;
        margin = _;
        return chart;
    };

    chart.width = function(_) {
        if (!arguments.length) return width;
        width = _;
        // yAxis.tickSize(-1 * (width-margin.left -margin.right));
        return chart;
    };

    chart.height = function(_) {
        if (!arguments.length) return height;
        height = _;
        return chart;
    };

    chart.x = function(_) {
        if (!arguments.length) return xValue;
        xValue = _;
        return chart;
    };

    chart.y = function(_) {
        if (!arguments.length) return yValue;
        yValue = _;
        return chart;
    };


    chart.key = function(_) {
        if (!arguments.length) return keyValue;
        keyValue = _;
        return chart;
    };

    chart.img = function(_) {
        if (!arguments.length) return imgValue;
        imgValue = _;
        return chart;
    };

    chart.label = function(_) {
        if (!arguments.length) return labelValue;
        labelValue = _;
        return chart;
    };

    chart.onClick = function(_) {
        if (!arguments.length) return onClick;
        onClick = _;
        return chart;
    };

    chart.topN = function(_) {
        if (!arguments.length) return topN;
        topN = _;
        return chart;
    };

    chart.reverseYScale = function(_) {
        if (!arguments.length) return reverseYScale;
        reverseYScale = _;
        return chart;
    };

    return chart;
}