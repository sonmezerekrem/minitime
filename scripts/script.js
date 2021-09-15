import {quotes} from "./quotes.js";
import {about} from "./about.js";
import * as languages from "./languages.js";

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let weekdaysShort = ["Mon", "Tue", " Wed", "Thu", "Fri", "Sat", "Sun"];
let dateInterval;
let timeInterval;

let preferences = {
    showTime: true,
    showDate: true,
    dateFormat: "d-m-w",
    imageLastRefresh: null,
    font: "Prompt",
    image: null,
    showCalendar: true,
    showWeather: true,
    weatherLastRefresh: null,
    weather: null,
    weatherIcon: null,
    location: "London",
    darkBackground: false,
    showQuotes: true,
    language: "EN"
};


$("#prev-month").click(() => {
    const current = $("#month-name").text();
    if (current === months[new Date().getMonth()]) {
        showCalendar(-1);
    } else if (current === months[new Date().getMonth() + 1]) {
        showCalendar(0);
    }
});

$("#next-month").click(() => {
    const current = $("#month-name").text();
    if (current === months[new Date().getMonth()]) {
        showCalendar(1);
    } else if (current === months[new Date().getMonth() - 1]) {
        showCalendar(0);
    }
});

$("#settings-btn").click(() => {
    $('#settings').toggle();
});

$("#calendar-btn").click(() => {
    $('#calendar').toggle();
});

$("#refresh-btn").click(() => {
    preferences.image = `https://picsum.photos/seed/${Math.floor(Math.random() * 100000000)}/1920/1080`;
    preferences.lastRefresh = Date.now();
    saveToStorage();
    $("body").css("background", `linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${preferences.image}) no-repeat center center fixed`);
    $("#attribution").html(`Photo on <a href=${preferences.image}>Lorem Picsum</a>`);
});

$("#show-about").click(() => {
    $('#about-container').css('display', 'flex');
});

$("#close-about").click(() => {
    $('#about-container').css('display', 'none');
});

$('#toggle-date').change(() => {
    const value = $('#toggle-date').prop("checked");
    preferences.showDate = value;
    if (value) {
        $("#date").show();
        $("#date-order-select").prop("disabled", false);
        showDate();
    } else {
        $("#date").hide();
        $("#date-order-select").prop("disabled", "disabled");
        clearInterval(dateInterval);
    }
    saveToStorage();
});


$('#show-weather').change(() => {
    const value = $('#show-weather').prop("checked");
    preferences.showWeather = value;
    if (value) {
        $("#weather-container").show();
        $("#location").prop("disabled", false);
        showWeather(preferences.language);
    } else {
        $("#weather-container").hide();
        $("#location").prop("disabled", "disabled");
    }
    saveToStorage();
});

$('#toggle-quotes').change(() => {
    const value = $('#toggle-quotes').prop("checked");
    preferences.showQuotes = value;
    if (value) {
        $("#quotes-container").show();
        showQuotes();
    } else {
        $("#quotes-container").hide();
    }
    saveToStorage();
});

$('#toggle-time').change(() => {
    const value = $('#toggle-time').prop("checked");
    preferences.showTime = value;
    if (value) {
        $("#time").show();
        showTime();
    } else {
        $("#time").hide();
        clearInterval(timeInterval);
    }
    saveToStorage();
});

$('#show-calendar').change(() => {
    const value = $('#show-calendar').prop("checked");
    preferences.showCalendar = value;
    if (value) {
        $("#calendar").css("display", "flex");
    } else {
        $("#calendar").css("display", "none");
    }
    saveToStorage();
});

$('#dark-background').change(() => {
    const value = $('#dark-background').prop("checked");
    preferences.darkBackground = value;
    if (value) {
        $("#body").css("background", "#212121");
    } else {
        $("#body").css("background", `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${preferences.image}) no-repeat center center fixed`);
    }
    saveToStorage();
});

$("#date-order-select").change(() => {
    preferences.dateFormat = $("#date-order-select option:selected").val();
    clearInterval(dateInterval);
    showDate();
    saveToStorage();
});

$("#language-select").change(() => {
    const value = $("#language-select option:selected").val();
    preferences.language = value;
    saveToStorage();
    changeLanguage(value);
});

$("#font-select").change(() => {
    const value = $("#font-select option:selected").val();
    preferences.font = value;
    saveToStorage();
    $("*").css("font-family", value);
});

$("#location").on('keyup', function (e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
        let value = $("#location").val();
        value = value.replace(/\s/, ",");
        preferences.location = value;
        preferences.weather = null;
        showWeather(preferences.language);
    }
});

$("#weather-container").click(function () {
    window.location = preferences.weather == null ? "https://openweathermap.org" : `https://openweathermap.org/city/${preferences.weather[2]}`;
});

$(document).on('click', '.main-folder', function () {
    const element = $(this).children().eq(2);
    console.log(element);
    element.css("display", "flex");
});

$(document).mouseup(function (e) {
    const container = $("#settings");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.hide();
    }

});


// STORAGE
function saveToStorage() {
    chrome.storage.sync.set({preferences: preferences}, function () {
    });
}

function loadFromStorage() {
    chrome.storage.sync.get('preferences', function (result) {
        if (result.preferences == null) {
            saveToStorage();
            loadFromStorage();
        } else {
            preferences = result.preferences;

            months = languages["months" + preferences.language];
            weekdays = languages["weekdays" + preferences.language];
            weekdaysShort = languages["weekdaysShort" + preferences.language];

            $("*").css("font-family", preferences.font);

            if ((Math.abs(Date.now() - preferences.lastRefresh) / 36e5) > 24 || preferences.image == null) {
                preferences.image = `https://picsum.photos/seed/${Math.floor(Math.random() * 100000000)}/1920/1080`;
                preferences.lastRefresh = Date.now();
                saveToStorage();
            }

            if (preferences.darkBackground) {
                $("#dark-background").prop("checked", "checked");
                $("#body").css("background", "#212121");
            } else {
                $("#dark-background").prop("checked", false);
                $("body").css("background", `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${preferences.image}) no-repeat center center fixed`);
            }

            $("#attribution").html(`Photo on <a href=${preferences.image}>Lorem Picsum</a>`);

            $("#date-order-select").val(preferences.dateFormat);
            $("#location").val(preferences.location);
            $("#language-select").val(preferences.language);
            $("#font-select").val(preferences.font);

            if (preferences.showDate) {
                $("#toggle-date").prop("checked", "checked");
                $("#date-order-select").prop("disabled", false);
                showDate();
            } else {
                $("#toggle-date").prop("checked", false);
                $("#date-order-select").prop("disabled", "disabled");
            }

            if (preferences.showWeather) {
                $("#show-weather").prop("checked", "checked");
                $("#location").prop("disabled", false);
                showWeather(preferences.language);
            } else {
                $("#show-weather").prop("checked", false);
                $("#location").prop("disabled", "disabled");
            }

            if (preferences.showTime) {
                $("#toggle-time").prop("checked", "checked");
                showTime();
            } else {
                $("#toggle-time").prop("checked", false);
            }

            if (preferences.showCalendar) {
                $("#show-calendar").attr("checked", "checked");
                $("#calendar").css("display", "flex");
            } else {
                $("#show-calendar").attr("checked", false);
                $("#calendar").css("display", "none");
            }

            if (preferences.showQuotes) {
                $("#toggle-quotes").attr("checked", "checked");
                $("#quotes-container").show();
                showQuotes();
            } else {
                $("#toggle-quotes").attr("checked", false);
                $("#quotes-container").css("display", "none");
            }

            showCalendar(0);
            setAbout();
        }
    });
}


// FUNCTIONS
function showDate() {
    if (preferences.showDate) {
        let value = [];
        const today = new Date();
        const format = preferences.dateFormat.split("-");
        for (let i = 0; i < format.length; i++) {
            switch (format[i]) {
                case "d":
                    value.push(today.getDate());
                    break;
                case "m":
                    value.push(months[today.getMonth()]);
                    break;
                case "y":
                    value.push(today.getFullYear());
                    break;
                case "w":
                    value.push(weekdays[today.getDay()]);
                    break;
            }
        }
        $("#date").text(value.join(" "));
        dateInterval = setTimeout(showDate, 60000);
    }
}

function showTime() {
    $("#time").text(new Date().toLocaleTimeString().substr(0, 5));
    timeInterval = setTimeout(showTime, 10000);
}

function showQuotes() {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    $("#quote").text(quote.text);
    $("#author").text(quote.author);
}

function showCalendar(monthShift) {
    const today = new Date();

    $("#weekdays").html("");
    for (let i = 0; i < 7; i++) {
        const span = $("<span></span>");
        span.addClass("weekday");
        span.text(weekdaysShort[i].substr(0, 3));
        $("#weekdays").append(span);
    }

    const firstDay = new Date(today.getFullYear(), today.getMonth() + monthShift, 1).getDay();
    const lastDate = new Date(today.getFullYear(), today.getMonth() + 1 + monthShift, 0).getDate();

    let weekday = ((firstDay + 6) % 7);
    const divContainer = $("#days");
    divContainer.html("");
    for (let i = 1; i <= lastDate;) {
        const div = $("<div></div>");
        div.addClass("week");
        for (let j = 0; j < 7; j++) {
            if (i <= lastDate) {
                const span = $("<span></span>");
                if (j >= weekday) {
                    span.append(i);
                    span.addClass("day");
                    if (i === today.getDate() && monthShift === 0) {
                        span.addClass("active-day");
                    }
                    i++;
                }
                div.append(span);
            }
        }
        div.appendTo(divContainer);
        weekday = 0;
    }
    $("#month-name").text(months[today.getMonth() + monthShift]);
}

function showWeather(language, force = false) {
    if (preferences.location == null || preferences.location === "")
        return;
    if (preferences.weather == null || (Math.abs(Date.now() - preferences.weatherLastRefresh) / 36e5) > 1 || force) {
        fetch(`https://minitime.netlify.app/.netlify/functions/getWeather?location=${preferences.location}&language=${language.toLowerCase()}`,
            {
                method: 'get',
                headers: {'Content-Type': 'application/json'}
            })
            .then(response => response.json())
            .then(data => {
                preferences.weather = [data.weather[0].description, Math.round(data.main.temp).toString() + "°C", data.id];
                preferences.weatherIcon = `../images/openweather/${data.weather[0].icon}.png`;
                $("#weather-city").text(toTitleCase(preferences.location.replace(/,/g, " ")));
                $("#weather-status").text(preferences.weather[0]);
                $("#weather-temp").text(preferences.weather[1]);
                $("#weather-icon").attr("src", preferences.weatherIcon);
                preferences.weatherLastRefresh = Date.now();
                $("#weather-container").attr("title", `Powered by OpenWeather, Last Refresh: ${new Date(preferences.weatherLastRefresh).toLocaleTimeString().substr(0, 5)}`);
                saveToStorage();
            })
            .catch(error => console.error(error));
    } else {
        $("#weather-city").text(toTitleCase(preferences.location.replace(/,/g, " ")));
        $("#weather-status").text(preferences.weather[0]);
        $("#weather-temp").text(preferences.weather[1]);
        $("#weather-icon").attr("src", preferences.weatherIcon);
        $("#weather-container").attr("title", `Powered by OpenWeather, Last Refresh: ${new Date(preferences.weatherLastRefresh).toLocaleTimeString().substr(0, 5)}`);
    }
}

function setAbout() {
    $(".name").text(about.name);
    $(".version").text(about.version);
    $(".information").text(about.information);
    for (let i = 0; i < about.sources.length; i++) {
        const a = $("<a></a>");
        a.text(`${toTitleCase(about.sources[i][0])}: ${about.sources[i][1]}`);
        a.attr("href", about.sources[i][2]);
        $(".sources").append(a);
    }
    $(".developer").text(about.developer);
    $(".contact").text(about.contact);
}

function changeLanguage(value) {
    months = languages["months" + value];
    weekdays = languages["weekdays" + value];
    weekdaysShort = languages["weekdaysShort" + value]
    showWeather(value, true);
    clearInterval(dateInterval);
    showDate();
    showCalendar(0);
}

function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
}

document.cookie = 'SameSite=None; Secure';
loadFromStorage();