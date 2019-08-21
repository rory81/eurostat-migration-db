const baseURL = "https://ec.europa.eu/eurostat/wdds/rest/data/v2.1/json/en/migr_asyappctza?citizen=EU28&filterNonGeo=1&precision=1&sex=T&asyl_app=ASY_APP&geo=TOTAL&unit=PER&unitLabel=label&shortLabel=1&age=TOTAL";

function getData(cb) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };

    xhr.open("GET", baseURL);
    xhr.send();
}

function printDataToConsole(data) {
    console.log(data.value);
}

// getData(printDataToConsole);
