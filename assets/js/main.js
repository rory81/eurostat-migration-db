queue()
    .defer(d3.csv, "assets/data/migrationdata")
    .await(makeGraphs);

function makeGraphs(error, migrData) {

    var ndx = crossfilter(migrData);
    var time_dim = ndx.dimension(dc.pluck('TIME'));
    var total_asylum_applications_per_year = time_dim.group().reduceSum(dc.pluck('Value'));

    dc.barChart('#total_asylum_applications_per_year')
        .width(300)
        .height(150)
        .margins({ top: 10, right: 30, bottom: 30, left: 30 })
        .dimension(time_dim)
        .group(total_asylum_applications_per_year)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .ordinalColors(["#FF6600"])
        .yAxisLabel("# asylum applicants")
        .yAxis().ticks(5);

    dc.renderAll();

}
