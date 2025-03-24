

function main(){
    alert("Hello!")

    d3.select("h1").style("color","green")
    d3.select("p").style("color","firebrick")

    var svg = d3.select("svg"),
    margin = 200,
    width = svg.attr("width") - margin,
    height = svg.attr("height") -margin;

    var xScale = d3.scaleBand().range([0,width]).padding(0.8),
        yScale = d3.scaleLinear().range([height,0]);

    var g = svg.append("g").attr("transform", "translate("+100+","+10+")");

    d3.csv("./data/PUE.csv").then(function(data){

        xScale.domain(data.map(function(d){return d.ID;}))
        yScale.domain([0,d3.max(data, function(d){return d.PUE})])

        g.append("g").attr("transform","translate(0,"+height+")").call(d3.axisBottom(xScale))
        g.append("g").call(d3.axisLeft(yScale).tickFormat(function(d) {return "PUE: "+d;}).ticks(10))

        g.selectAll(".bar").data(data)
        .enter().append("rect")
        .attr("class","bar")
        .attr("x",function(d) {return xScale(d.ID);})
        .attr("y",function(d) {return yScale(d.PUE);})
        .attr("width",xScale.bandwidth())
        .attr("height", function(d) {return height - yScale(d.PUE);});
    
    });

}
