queue()
    .defer(d3.csv, "assets/data/migrationData.csv")
    .await(makeGraphs);

function makeGraphs(error, migrData) {

    var ndx = crossfilter(migrData);

    migrData.forEach(function(d) {
        d.Value = d["Value"].replace(/,/g, '');
        d.Value = parseInt(d["Value"]);
        // str.replace(/blue/g, "red")
    })

    show_barChart(ndx);
    show_country_table(ndx);
    show_country_pie(ndx);
    // show_sex_table(ndx);
    // show_age_table(ndx);

    dc.renderAll();

}

function show_barChart(ndx) {
    var dim = ndx.dimension(dc.pluck('TIME'));
    var sumApplications = dim.group().reduceSum(dc.pluck('Value'));

    // Total per year according to data
    // 2013	457630
    // 2014	663250
    // 2015	1394210
    // 2016	1293210
    // 2017	735410
    // 2018	665250

    dc.barChart('#total_asylum_applications_per_year')

        .useViewBoxResizing(true)
        .margins({ top: 10, right: 30, bottom: 30, left: 30 })
        .dimension(dim)
        .group(sumApplications)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .ordinalColors(["#FF6600"])
        .yAxisLabel("# asylum applicants")
        .yAxis().ticks(5).tickFormat(function(d) { return d / 1000000 + " M" });

}

function show_country_pie(ndx) {
    var dim = ndx.dimension(dc.pluck('GEO'));
    var top5CountryPie = dim.group().reduceSum(dc.pluck('Value'));

    dc.pieChart('#top-5-pie')
        .useViewBoxResizing(true)
        .dimension(dim)
        .group(top5CountryPie)
        .transitionDuration(1500)
        .cap(5)
        .legend(dc.legend().x(2).y(0).gap(5))
        .renderLabel(false);
}


function show_country_table(ndx) {
    var dataTable = dc.dataTable("#top-5");

    //dimension
    var countryDim = ndx.dimension(function(d) { return d.GEO; });
    var fakeCountryDim = {
        top: function(d) {
            var m = dc.d3.map();
            countryDim.top(Infinity).forEach(function(g) {
                if (m.has(g.GEO)) {
                    m.get(g.GEO).Value += g.Value;
                }
                else {
                    // Create the "record"
                    m.set(g.GEO, {
                        GEO: g.GEO,
                        Value: g.Value
                    });
                    m.values();
                }

            });

            return m.values();
        }
    };


    dataTable
        .dimension(fakeCountryDim)
        .group(function(d) { return '' })
        .showGroups(false)
        .columns([
            function(d) { return d.GEO; },
            function(d) { return d.Value; }
        ])
        .sortBy(function(d) { return d.Value; })
        .order(d3.descending)
        .size([1,5]);

    // dataTable.on('renderlet', function(chart) {
    //     chart.selectAll('.dc-table-group').classed('info', true);
    // });
}
