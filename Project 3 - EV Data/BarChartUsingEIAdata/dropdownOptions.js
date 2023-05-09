d3.json("selections.json").then(function(data) {
    const select = d3.select("#selDataset");

    const options = select.selectAll("option")
      .data(data.region)
      .enter()
      .append("option")
      .attr("value", function(d) { return d })
      .text(function(d) { return d; });

    select.property("value", data.region[0]);
});