d3.json("samples.json").then(function(data) {
    const select = d3.select("#selDataset");

    const options = select.selectAll("option")
      .data(data.metadata)
      .enter()
      .append("option")
      .attr("value", function(d) { return d.id })
      .text(function(d) { return d.id; });

    select.property("value", data.metadata[0].id);
});