//event function
var key = 'c24b1e69b12182932011de7f1b2d7c83'
var input = $('.input');
var btn = $('.search');
var btnCity = $('.searchCity')
var select = $('.selector');
var inputCity = $('.inputCity')
var rain = '🌧';
var sun = '☀️';
var cloud = '🌥';
var snow = '🌨';


btnCity.on('click', function () {
    weather2(inputCity.val());
    inputCity.val('');
})

btn.on("click", function () {
    weatherZip(input.val());
    input.val('');
});

function onChange() {
    weather(select.val());
};


// writing function
function generalInfo(data) {
    offsetDate(data.timezone);
    var temp = Math.round(data.main.temp-273.15);
    var tempF = Math.round((data.main.temp-273.15)*1.8 + 32);
    $('.name').text(data.name);
    $('.temp').text("Temperature: " + temp + "\xB0C/ " + tempF + "\xB0F");
    $('.human').text('Humidity: '+data.main.humidity + "%");
    $('.wind').text('Wind Speed: ' + data.wind.speed +" m/s");
    var rex = data.weather[0].description.toString().split(' ');
    if (rex.includes('rain')) {
        $('.condition').text(data.weather[0].description + rain);
        $('.selection').css('background-image',"url('asset/img/rain.gif')");
    } else if (rex.includes('clear')) {
        $('.condition').text(data.weather[0].description + sun);
        $('.selection').css('background-image',"url('asset/img/sun.gif')");
    } else if (rex.includes('snow')) {
        $('.condition').text(data.weather[0].description + snow);
        $('.selection').css('background-image',"url('asset/img/snow.gif')");
    } else if (rex.includes('clouds')) {
        $('.condition').text(data.weather[0].description + cloud);
        $('.selection').css('background-image',"url('asset/img/Clouds.gif')");
    } else {
        $('.condition').text(data.weather[0].description)
    };
};


// city name function
function weather(cityName) {
    var url = 'https://api.openweathermap.org/data/2.5/weather?q='+ cityName+ '&appid='+ key;
    fetch(url)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
    console.log(data);
    generalInfo(data);
    generalFun(cityName);
    });

};

function weather2(cityName) {
    var url = 'https://api.openweathermap.org/data/2.5/weather?q='+ cityName+ '&appid='+ key;
    fetch(url)
    .then(function (response) {
        if (response.status === 404) {
            alert('Please enter a valid city name!');
            return;
        }
        return response.json();
    })
    .then(function (data) {
    generalInfo(data);
    $('.selector').append($('<option>').attr('value',data.name).text(data.name));
    });
    generalFun(cityName);
};

// zipcode function
function weatherZip(zipcode) {
    var url = 'https://api.openweathermap.org/data/2.5/weather?zip='+ zipcode+ ',us&appid='+ key;
    fetch(url)
    .then(function (response) {
        if (response.status === 404) {
            alert('Please enter a valid US zipcode!');
            return;
        }
        return response.json();
    })
    .then(function (data) {
    generalInfo(data);
    $('.selector').append($('<option>').attr('value',data.name).text(data.name));
    generalFun(data.name);
    });


};

function offsetDate(offset){
    var d = new Date(new Date().getTime() + (offset * 1000));
    var date = d.getUTCDate();
    var month = d.getUTCMonth()+1;
    var year = d.getUTCFullYear();
    var hour = d.getUTCHours();
    var min = d.getUTCMinutes();
    $('.date').text('Time Zone: ' +month +"/"+date +'/' + year + ' ' +hour + ":" + min);
    if (hour>18 || hour<6) {
    $('.green').css('background-image', 'url("asset/img/night.jpeg")');
    $('.green').css('color', 'white');
    } else {
    $('.green').css('background-image', 'url("asset/img/day.webp")');
    }
}


function sec3(data) {
    var array = [3, 11, 19, 27, 35];
        for (let i = 0; i < array.length; i++) {
            var sec3data = data.list[array[i]].dt_txt.split(" ").shift();
            $('.date'+ array[i]).text(sec3data.split('1-').pop());

            var rex = data.list[array[i]].weather[0].description.toString().split(' ');
            if (rex.includes('rain')) {
                $('.weather'+array[i]).text('Condtion: '+data.list[array[i]].weather[0].description + rain);
            }
            else if (rex.includes('clear')) {
                $('.weather'+array[i]).text('Condtion: '+data.list[array[i]].weather[0].description + sun);
            }
            else if (rex.includes('snow')) {
                $('.weather'+array[i]).text('Condtion: '+data.list[array[i]].weather[0].description + snow);
            }
            else if (rex.includes('clouds')) {
                $('.weather'+array[i]).text('Condtion: '+data.list[array[i]].weather[0].description + cloud)
            }
            else {
                $('.weather'+array[i]).text('Condtion: '+data.list[array[i]].weather[0].description);
            };
            var temp = Math.round(data.list[array[i]].main.temp-273.15);
            var tempF = Math.round((data.list[array[i]].main.temp-273.15)*1.8 + 32);
            $('.dated'+array[i]).append('<p>').text('Temp: '+ temp +"\xB0C( " + tempF + "\xB0F)"+"\n"+"Wind: "+ data.list[array[i]].wind.speed + "m/s" + '\n' + "Humidity: "+data.list[array[i]].main.humidity+'%');
        }
};


    function generalFun(cityName) {
        var urlP = 'https://api.openweathermap.org/data/2.5/forecast?q='+ cityName +'&appid=' + key;
        fetch(urlP)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            sec3(data);
        });
    }


// time
function time(){
    $('#currentDay').text(moment().format('MMMM Do YYYY, h:mm:ss a'));
};

setInterval(time, 1000);
weatherZip(98444);
