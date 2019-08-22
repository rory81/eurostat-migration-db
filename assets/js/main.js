queue()
    .defer(d3.json,"https://ec.europa.eu/eurostat/wdds/rest/data/v2.1/json/en/migr_asyappctza?citizen=EU28&filterNonGeo=1&precision=1&sex=T&asyl_app=ASY_APP&geo=TOTAL&unit=PER&unitLabel=label&shortLabel=1&age=TOTAL")
    .await(makeGraphs);
    
    function makeGraphs(error,migrData){
        
    }