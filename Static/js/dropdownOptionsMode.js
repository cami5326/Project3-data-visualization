d3.json("../../Data/selections.json").then(function(data) {
    const select = d3.select("#selDatasetMode");

    const options = select.selectAll("option")
      .data(data.mode)
      .enter()
      .append("option")
      .attr("value", function(d) { return d })
      .text(function(d) { return d; });

    select.property("value", data.mode[1]);
});