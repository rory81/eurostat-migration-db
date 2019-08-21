const baseURL = "https://ec.europa.eu/eurostat/wdds/rest/data/v2.1/json/en/migr_asyappctza?citizen=EU28&filterNonGeo=1&precision=1&sex=T&asyl_app=ASY_APP&geo=TOTAL&unit=PER&unitLabel=label&shortLabel=1&age=TOTAL";

function getData(value,cb) {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", baseURL + value + "/" );
    // GET is to retrieve data (in contrast to POST for sending data)
    xhr.send();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // 4 means that the operation of the XHR client is done
            //200 is the HTTP status code and means OK. Request suceeded. Content delivered
            cb(JSON.parse(this.responseText));
            // document.getElementById("data").innerHTML = JSON.parse(this.responseText);
            //looks for the element in the HTML with the id "data" and gives the id the result given as response to the request.
            //JSON.parse changes the string into an object and makes it readable
        }
    };
}

function writeToDocument(value){
    getData(value,function(data){
        console.dir(data);
        document.getElementById("data").innerHTML = data;
    });
}


// function printDataToConsole(data){
//     console.log(data);
// } 

// getData(printDataToConsole);
