/*jslint browser: true, indent: 4, multistr: true */
/* global d3: false, $: false, alert: false, TreeMap: false , FlickrUtils: true, console: true, utils: true*/


//Based in http://bost.ocks.org/mike/chart/time-series-chart.js
function bumpChart() {
    var margin = {top: 100, right: 100, bottom: 100, left: 100},
    width = 760,
    height = 150,
    Y_LIMIT = 10,
    BOX_WIDTH = 80,
    BOX_HEIGHT = 25,
    xValue = function(d) { return d.key; },
    yValue = function(d) { return d.values; },
    keyValue = function(d) { return d.id; },
    labelValue = function(d) { return d.id; },
    xScale = d3.time.scale(),
    yScale = d3.scale.linear(),
    colScale = d3.scale.category20(),
    xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(d3.time.days, 1).tickSize(6,0),
    yAxis = d3.svg.axis().scale(yScale).orient("left").tickSize(- (width-margin.left -margin.right)).tickSubdivide(true),
    line = d3.svg.line().x(X).y(Y).interpolate("cardinal"),
    data, nestedData;

    function processData(mdata) {
        data = mdata.filter(function (d, i) { return yValue(d, i)<=Y_LIMIT;}  );
        nestedData = d3.nest()
            .key(function (d, i) { return keyValue(d, i); })
            .key(function (d, i) { return xValue(d, i); })
            .entries(data);

        nestedData.forEach(function (d) {
            d.values.forEach(function (e) {
                e.key = new Date(e.key);     // d3.nest coarse keys to strings
            });
            d.values = d.values.sort( function (a, b) { return d3.ascending(a.key, b.key); });
        });
    }

    function chart(selection) {
        selection.each(function(mdata) {

            // Convert data to standard representation greedily;
            // this is needed for nondeterministic accessors.
            processData(mdata);

            if (nestedData.length === 0) { return; }

            // Update the x-scale.
            xScale
                .domain(d3.extent(nestedData[0].values, function (d) { return d.key; }))
                .range([0, width - margin.left - margin.right]);

            // Update the y-scale.
            yScale
                .domain([1, Y_LIMIT])
                .range([0, height - margin.top - margin.bottom]);

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

    chart.update = function (nestedData, data) {
        if (svg === undefined) {
            return; //not ready
        }
       // Update the x-axis.
        svg.select(".mainArea").select(".x.axis")
            .attr("transform", "translate(0," + (yScale.range()[yScale.range().length-1] + BOX_HEIGHT / 2 ) + ")")
            .call(xAxis);

        // Update the y-axis.
        yAxis.tickSize(- (width-margin.left -margin.right));
        svg.select(".mainArea").select(".y.axis")
            .attr("transform", "translate(" + (-1 * BOX_WIDTH /2) +  ",0)")
            .call(yAxis);


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
            .on("mouseover", function (d) {  hight(d.key); })
            .on("mouseout", clearHighlight);
        lines.transition().duration(1000)
            .style("stroke", function (d) { return colScale(d.key); })
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
            .on("mouseout", clearHighlight);
        boxEnter.append("rect");
        boxEnter.append("text");
        boxes
            .attr("transform", function (d, i) {
                return "translate(" + (xScale(xValue(d, i)) - BOX_WIDTH / 2) + "," +
                    (yScale(yValue(d, i)) - BOX_HEIGHT/2) + ")"; });
        boxes.select("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("rx", 5)
            .attr("ry", 5)
            .attr("width", BOX_WIDTH)
            .attr("height", BOX_HEIGHT)
            .style("fill", function (d, i) { return colScale(keyValue(d, i)); });
        boxes.select("text")
            .attr("dx", BOX_WIDTH/2)
            .attr("dy", BOX_HEIGHT/2)
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

    chart.label = function(_) {
        if (!arguments.length) return labelValue;
        labelValue = _;
        return chart;
    };

    return chart;
}