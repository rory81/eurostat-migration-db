queue()
    .defer(d3.csv, "assets/data/migrationData.csv")
    .await(makeGraphs);

function makeGraphs(error, migrData) {

    migrData.forEach(function(d) {
        d.Value = d["Value"].replace(/,/g, '');
        d.Value = parseInt(d["Value"]);
    })

    var ndx = crossfilter(migrData);
    var time_dim = ndx.dimension(dc.pluck('TIME'));
    var total_asylum_applications_per_year = time_dim.group().reduceSum(dc.pluck('Value'));
    var countries_dim = ndx.dimension(dc.pluck('GEO'));
    var total_per_country = countries_dim.group().reduceSum(dc.pluck('Value'));
    // var top_5_country = countries_dim.group().reduceSum(dc.pluck('Value')).top(5);
    var sex_dim = ndx.dimension(dc.pluck('SEX'));
    var total_per_sex = sex_dim.group().reduceSum(dc.pluck('Value'));
    var age_dim = ndx.dimension(dc.pluck('AGE'));
    var total_per_age = age_dim.group().reduceSum(dc.pluck('Value'));

    // Total per year according to data
    // 2013	457630
    // 2014	663250
    // 2015	1394210
    // 2016	1293210
    // 2017	735410
    // 2018	665250

    dc.barChart('#total_asylum_applications_per_year')
        .width(300)
        .height(150)
        .useViewBoxResizing(true)
        .margins({ top: 10, right: 30, bottom: 30, left: 30 })
        .dimension(time_dim)
        .group(total_asylum_applications_per_year)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .ordinalColors(["#FF6600"])
        .yAxisLabel("# asylum applicants")
        .yAxis().ticks(5).tickFormat(function(d) { return d / 1000000 + " M" });


    // Top-5 countries according to data
    // Germany (until 1990 former territory of the FRG)	1958540
    // France	510770
    // Italy	486545
    // Sweden	375080
    // Hungary	266495

    dc.dataTable("#top-5")
        .width(250).height(800)
        .dimension(countries_dim)
        .group(function(d) { return d["total_per_country"] })
        .size(5) // number of rows to return
        .columns([
            function(d) { return d.GEO; },
            function(d) { return d.Value; },
            function(d) { return d.Percentage; },

        ])
        .sortBy(function(d) { return d.Value; })
        .order(d3.descending);



    dc.pieChart('#top-5-pie')
        .width(330)
        .radius(90)
        .useViewBoxResizing(true)
        .transitionDuration(1500)
        .cap(5)
        .dimension(countries_dim)
        .group(total_per_country)
        .legend(dc.legend().x(270).y(0).gap(5))
        .renderLabel(false);

    // dc.dataTable("#sex")
    //     .width(250).height(800)
    //     .dimension(countries_dim)
    //     .group(function(d) { return d["total_per_country"] })
    //     .size(5) // number of rows to return
    //     .columns([
    //         function(d) { return d.GEO; },
    //         function(d) { return d.Value; },
    //         function(d) { return d.Percentage; },

    //     ])
    //     .sortBy(function(d) { return d.Value; })
    //     .order(d3.descending);


    // dc.dataTable("#age")
    //     .width(250).height(800)
    //     .dimension(countries_dim)
    //     .group(function(d) { return d["total_per_country"] })
    //     .size(5) // number of rows to return
    //     .columns([
    //         function(d) { return d.GEO; },
    //         function(d) { return d.Value; },
    //         function(d) { return d.Percentage; },

    //     ])
    //     .sortBy(function(d) { return d.Value; })
    //     .order(d3.descending);


    dc.renderAll();

}
