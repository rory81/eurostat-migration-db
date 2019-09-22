queue()
    .defer(d3.csv, "assets/data/migrationData.csv")
    .await(makeGraphs);

function makeGraphs(error, migrData) {

    var ndx = crossfilter(migrData);

    migrData.forEach(function(d) {

        d.Value = d["Value"].replace(/,/g, '');
        d.Value = +d["Value"]; //coerce to number

        d.AGE = d["AGE"].replace(/From /g, 'Between ')
        d.AGE = d["AGE"].replace(/Less than /g, 'Age under ')
        d.AGE = d["AGE"].replace(/Unknown/g, ' Unknown')
        d.AGE = d["AGE"].replace(/65 years or over/g, 'Over 64 years')

    });


    show_barChart(ndx);
    show_country_table(ndx);
    show_country_pie(ndx);
    show_sex_table(ndx);
    show_age_table(ndx);

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
        .width(300)
        .height(150)
        .useViewBoxResizing(true)
        .margins({ top: 10, right: 30, bottom: 30, left: 30 })
        .dimension(dim)
        .group(sumApplications)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .ordinalColors(["#FF6600"])
        .yAxisLabel("# asylum applicants")
        .yAxis().ticks(5).tickFormat(d3.format(".2s"));
}

function show_country_pie(ndx) {
    var dim = ndx.dimension(dc.pluck('GEO'));
    var top5CountryPie = dim.group().reduceSum(dc.pluck('Value'));

    dc.pieChart('#top-5-pie')
        .width(330)
        .height(180)
        .radius(90)
        .useViewBoxResizing(true)
        .dimension(dim)
        .group(top5CountryPie)
        .transitionDuration(1500)
        .cap(5)
        .legend(dc.legend().x(-6).y(20).gap(6))
        .renderLabel(false);
}




function show_country_table(ndx) {
    var dataTable = dc.dataTable("#top-5");
    var countryDim = ndx.dimension(function(d) { return d.GEO; });
    var grandTotal = 5208960;
    var valGrpdDim = countryDim.group().reduce(

        function(p, v) {

            ++p.number;

            p.total += +v.Value;

            return p;

        },

        function(p, v) {

            --p.number;

            p.total -= +v.Value;

            return p;

        },

        function() {

            // console.log('initias entered')

            return { number: 0, total: 0 }

        });

    valGrpdDim.order(v => v.total);

    dataTable.width(800).height(800)

        .dimension(valGrpdDim)
        .group(function(d) { return 'Country | Value' })
        .showGroups(false)
        .size(5)
        .columns([function(d) { return d.key }, function(d) { return d.value.total }, function(d) { return ((d.value.total / grandTotal) * 100).toFixed(2) + "%" }])
        .sortBy(function(d) { return d.value.total; })
        .order(d3.descending);
}

function show_sex_table(ndx) {
    var dataTable = dc.dataTable("#sexTable");
    var sexDim = ndx.dimension(function(d) { return d.SEX; });
    var grandTotal = 5208960;

    // var pictures = [];
    // pictures[0] = "/assets/images/male.png";
    // pictures[1] = "/assets/images/female2.png";
    // pictures[2] = "/assets/images/questionmark.png";

    var valGrpdDim = sexDim.group().reduce(

        function(p, v) {

            ++p.number;

            p.total += +v.Value;

            return p;

        },

        function(p, v) {

            --p.number;

            p.total -= +v.Value;

            return p;

        },

        function() {

            // console.log('initias entered')

            return { number: 0, total: 0 }

        });

    valGrpdDim.order(v => v.total);

    dataTable.width(800).height(800)

        .dimension(valGrpdDim)
        .group(function(d) { return 'Sex | Value' })
        .showGroups(false)
        .size(5)
        .columns([function(d) {
            if (d.key === 'Males') {

                d.key = document.getElementById("images").src='/assets/images/male.png';
                return d.key;
            }
            else if (d.key === 'Females') {
                d.key = document.getElementById("images").src="/assets/images/female2.png";
                return d.key;
            }
            else {
                d.key = document.getElementById("images").src = "/assets/images/questionmark.png";
                return d.key;
            }
        }, function(d) { return d.value.total }, function(d) { return ((d.value.total / grandTotal) * 100).toFixed(2) + "%" }])
        .sortBy(function(d) { return d.value.total; })
        .order(d3.descending);



    // function(d) {
    //     if (d.SEX === 'Males') {

    //         d.SEX = "/assets/images/male.png";
    //         return d.SEX;
    //     }
    //     else if (d.SEX === 'Females') {
    //         d.SEX = "/assets/images/female2.png";
    //         return d.SEX;
    //     }
    //     else {
    //         d.SEX = "/assets/images/questionmark.png";
    //         return d.SEX;
    //     }
    // }
}

function show_age_table(ndx) {
    var dataTable = dc.dataTable("#ageTable");
    var ageDim = ndx.dimension(function(d) { return d.AGE; });
    var grandTotal = 5208960;


    var valGrpdDim = ageDim.group().reduce(

        function(p, v) {

            ++p.number;

            p.total += +v.Value;

            return p;

        },

        function(p, v) {

            --p.number;

            p.total -= +v.Value;

            return p;

        },

        function() {

            // console.log('initias entered')

            return { number: 0, total: 0 }

        });

    // valGrpdDim.order(v => v.total);

    dataTable.width(800).height(800)

        .dimension(valGrpdDim)
        .group(function(d) { return 'Age | Value' })
        .showGroups(false)
        .size(5)
        .columns([function(d) { return d.key }, function(d) { return d.value.total }, function(d) { return ((d.value.total / grandTotal) * 100).toFixed(2) + "%" }])
        .sortBy(function(d) { return d.age; })
        .order(d3.descending);
}
