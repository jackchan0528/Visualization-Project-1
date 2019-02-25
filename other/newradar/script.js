var w = 500,
	h = 500;

// var colorscale = d3.scale.category10();
var colorscale = d3.scaleOrdinal(d3.schemeCategory10);

//Legend titles
var LegendOptions = ['36 Months','60 Months'];

// var d=[];
// d[0]=[];
// d[1]=[];
//
// Get the data
// d3.csv("data/tp.csv", function(error, data) {
// 	if (error) throw error;
//
// 	// data=data.filter(function(d){
// 	//   return d.Phones != "" && d.GDP != "" && d.GDP > 10000})
//
// 		// format the data (i.e., process it such that strings are converted to their appropriate types)
// 	//	console.log(data);
// 		data.forEach(function(temp) {
// 			//console.log(temp);
// 			d[0].push(temp);
// 			d[0][d[0].length-1].value = parseInt(d[0][d[0].length-1].value);
// 			d[1].push(temp);
// 		});
// 		console.log(d);
//
// })


var d=[];
//Data
// var d = [
// 		  [
// 			{axis:"yamede",value:0.59},
// 			{axis:"Social Networks",value:0.56},
// 			{axis:"Internet Banking",value:0.42},
// 			{axis:"News Sportsites",value:0.34},
// 			{axis:"Search Engine",value:0.48},
// 			{axis:"View Shopping sites",value:0.14},
// 			{axis:"Paying Online",value:0.11},
// 			{axis:"Buy Online",value:0.05},
// 			{axis:"Stream Music",value:0.07},
// 			{axis:"Online Gaming",value:0.12},
// 			{axis:"Navigation",value:0.27},
// 			{axis:"App connected to TV program",value:0.03},
// 			{axis:"Offline Gaming",value:0.12},
// 			{axis:"Photo Video",value:0.4},
// 			{axis:"Reading",value:0.03},
// 			{axis:"Listen Music",value:0.22},
// 			{axis:"Watch TV",value:0.03},
// 			{axis:"TV Movies Streaming",value:0.03},
// 			{axis:"Listen Radio",value:0.07},
// 			{axis:"Sending Money",value:0.18},
// 			{axis:"Other",value:0.07},
// 			{axis:"Use less Once week",value:0.08}
// 		  ],[
// 			{axis:"Email",value:0.48},
// 			{axis:"Social Networks",value:0.41},
// 			{axis:"Internet Banking",value:0.27},
// 			{axis:"News Sportsites",value:0.28},
// 			{axis:"Search Engine",value:0.46},
// 			{axis:"View Shopping sites",value:0.29},
//
// 			{axis:"Listen Radio",value:0.06},
// 			{axis:"Sending Money",value:0.16},
// 			{axis:"Other",value:0.07},
// 			{axis:"Use less Once week",value:0.17}
// 		  ]
// 		];

//Options for the Radar chart, other than default
var mycfg = {
  w: w,
  h: h,
  maxValue: 0.6,
  levels: 6,
  ExtraWidthX: 300
}


function mydraw(selectedstate){
	d3.csv("data/faked_by_state.csv", function(error, data) {
		if (error) throw error;

		// data=data.filter(function(d){
		//   return d.state == selectedstate})

			// format the data (i.e., process it such that strings are converted to their appropriate types)
		//	console.log(data);
			data=data.filter(function(d){
				return d.state == selectedstate})

			document.getElementById('showstate').innerHTML = selectedstate;

		d[0] = [];
		d[1] = [];
		var count=0;
			data.forEach(function(temp) {
				//console.log(temp);
				count++;
				if (count<=14){
					d[0].push(temp);
					d[0][d[0].length-1].value = parseFloat(d[0][d[0].length-1].value);
				} else {
					d[1].push(temp);
					d[1][d[1].length-1].value = parseFloat(d[1][d[1].length-1].value);
				}


			});
			// console.log(d);
			RadarChart.draw("#chart", d, mycfg);

			////////////////////////////////////////////
			/////////// Initiate legend ////////////////
			////////////////////////////////////////////
			var svg = d3.select('#body')
				.selectAll('svg')
				.append('svg')
				.attr("width", w+300)
				.attr("height", h)

			//Create the title for the legend
			var text = svg.append("text")
				.attr("class", "title")
				.attr('transform', 'translate(90,0)')
				.attr("x", w - 70)
				.attr("y", 10)
				.attr("font-size", "12px")
				.attr("fill", "#404040")
				.text("Length of Loan Term");

			//Initiate Legend
			var legend = svg.append("g")
				.attr("class", "legend")
				.attr("height", 100)
				.attr("width", 200)
				.attr('transform', 'translate(90,20)')
				;
				//Create colour squares
				legend.selectAll('rect')
					.data(LegendOptions)
					.enter()
					.append("rect")
					.attr("x", w - 65)
					.attr("y", function(d, i){ return i * 20;})
					.attr("width", 10)
					.attr("height", 10)
					.style("fill", function(d, i){ return colorscale(i);})
					;
				//Create text next to squares
				legend.selectAll('text')
					.data(LegendOptions)
					.enter()
					.append("text")
					.attr("x", w - 52)
					.attr("y", function(d, i){ return i * 20 + 9;})
					.attr("font-size", "11px")
					.attr("fill", "#737373")
					.text(function(d) { return d; })
					;
				// // Add the title for the whole plot
				//  svg.append("text")
				//     .attr("x", (w/2) + 75)
				//     .attr("y", 10)
				//     .attr("text-anchor", "middle")
				//     .style("font-size", "17px")
				//     .style("font-weight","bold")
				//     .style("font-family","sans-serif")
				//     .text("Credibility of each State in America");

	})
}


		d3.csv("data/faked_by_state.csv", function(error, data) {
			if (error) throw error;

			 data=data.filter(function(d){
			   return d.state == 'All'})

				// format the data (i.e., process it such that strings are converted to their appropriate types)
			//	console.log(data);


			d[0] = [];
			d[1] = [];
			var count=0;
				data.forEach(function(temp) {
					//console.log(temp);
					count++;
					if (count<=14){
						d[0].push(temp);
						d[0][d[0].length-1].value = parseFloat(d[0][d[0].length-1].value);
					} else {
						d[1].push(temp);
						d[1][d[1].length-1].value = parseFloat(d[1][d[1].length-1].value);
					}


				});
				// console.log(d);
				RadarChart.draw("#chart", d, mycfg);

				////////////////////////////////////////////
				/////////// Initiate legend ////////////////
				////////////////////////////////////////////
				var svg = d3.select('#body')
					.selectAll('svg')
					.append('svg')
					.attr("width", w+300)
					.attr("height", h)

				//Create the title for the legend
				var text = svg.append("text")
					.attr("class", "title")
					.attr('transform', 'translate(90,0)')
					.attr("x", w - 70)
					.attr("y", 10)
					.attr("font-size", "12px")
					.attr("fill", "#404040")
					.text("Length of Loan Term");

				//Initiate Legend
				var legend = svg.append("g")
					.attr("class", "legend")
					.attr("height", 100)
					.attr("width", 200)
					.attr('transform', 'translate(90,20)')
					;
					//Create colour squares
					legend.selectAll('rect')
					  .data(LegendOptions)
					  .enter()
					  .append("rect")
					  .attr("x", w - 65)
					  .attr("y", function(d, i){ return i * 20;})
					  .attr("width", 10)
					  .attr("height", 10)
					  .style("fill", function(d, i){ return colorscale(i);})
					  ;
					//Create text next to squares
					legend.selectAll('text')
					  .data(LegendOptions)
					  .enter()
					  .append("text")
					  .attr("x", w - 52)
					  .attr("y", function(d, i){ return i * 20 + 9;})
					  .attr("font-size", "11px")
					  .attr("fill", "#737373")
					  .text(function(d) { return d; })
					  ;
					// // Add the title for the whole plot
				  //  svg.append("text")
				  //     .attr("x", (w/2) + 75)
				  //     .attr("y", 10)
				  //     .attr("text-anchor", "middle")
				  //     .style("font-size", "17px")
				  //     .style("font-weight","bold")
				  //     .style("font-family","sans-serif")
				  //     .text("Credibility of each State in America");

		})




//Call function to draw the Radar chart
//Will expect that data is in %'s
