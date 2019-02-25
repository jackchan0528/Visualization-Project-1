// Set the dimensions of the canvas / graph

var hovering = 'All';


var margin = {top: 60, right: 20, bottom: 80, left: 80},
    width = 850 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;


    // set the ranges
// var x = d3.scaleLinear().range([0, width]);
var x = d3.scaleBand().range([0, width]).padding(0.1)
var y = d3.scaleLinear().range([height, 0]);



// declare colour scheme
var colours = d3.scaleOrdinal(d3.schemeCategory10);

var svg = d3.select("#rect")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");



// Get the data
d3.csv("data/barchartdata.csv", function(error, data) {
    if (error) throw error;

    // format the data (i.e., process it such that strings are converted to their appropriate types)
    data.forEach(function(d) {
      d.cred_avg = +d.cred_avg;
    });


    x.domain(data.map(function(d) { return d.state; }));
    var yScale = d3.scaleLinear()
                   .domain([20, d3.max(data, function(d) { return d.cred_avg; })])
                   .range([0, height]);


    var tooltip=d3.select("body")
            .append("div")
            .attr("class","tooltip")

    // Add the scatterplot
    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function(d) {
          return x(d.state);
        })
        .attr("y", function(d) {
          return height-yScale(d.cred_avg);
        })
        .attr("width", x.bandwidth())
        // .attr("y", d.cred_avg)
        .attr("height", function(d) {
          return yScale(d.cred_avg);
        })
        .attr("fill",function(d){
          return colours(0)
        })
        // .style("opacity",0.8)
        .on("mouseover",function(d){
          tooltip.html(d.state + " = " + d.cred_avg)
           .style("opacity", 1.0)
           .style("left",(d3.event.pageX)+"px")
           .style("top",(d3.event.pageY)+"px")
           //drawPieChart(d.state);
           hovering = d.state;
        })
        .on("mousemove",function(d){
        tooltip.style("left", (d3.event.pageX+15) + "px")
               .style("top", (d3.event.pageY) + "px");
        })
        .on("mouseleave",function(d){
          tooltip.style("opacity",0.0);
          d3.select("#tooltip").remove();
          // hovering = 'All';
        });


    // Add the X Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))      //  modify it to 11 ticks and .0s format
        .style("font-family","sans-serif");

    // Add the X Axis label title
    svg.append("text")
        // .attr("transform","translate("+ (width/2) +","+ 210 +")")
        .attr("transform","translate("+ (width/2) +","+ (height*1.2) +")")
        .style("font-size", "14px")
        .style("font-weight","700")
        .style("font-family","sans-serif")
        .style("text-anchor","middle")
        .text("States")

    // Add the Y Axis
    svg.append("g")
        .call(d3.axisLeft(y))
        // .scale(yScale)
        .style("font-family","sans-serif");;

    // Add the Y Axis label title
    svg.append("text")
        .attr("transform","rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height/2))
        .attr("dy", "1em")
        .style("font-size", "14px")
        .style("font-weight","700")
        .style("font-family","sans-serif")
        .attr("text-anchor","middle")
        .text("Credibility (in relative scale)");

    // Add the title for the whole plot
    svg.append("text")
        .attr("x", (width/2))
        .attr("y", -30-(margin.top/10))
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .style("font-weight","bold")
        .style("font-family","sans-serif")
        .text("Credibility of each State in America");



});
