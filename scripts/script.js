import {about, months, quotes, shortenWeekdays, weekdays} from "./data.js";

let dateInterval, timeInterval;
let preferences = {
    version: 3,
    weather: {
        show: true,
        temperature: null,
        text: null,
        icon: null,
        lastRefresh: null
    },
    background: {
        query: "nature",
        src: null,
        link: null,
        user: null,
        lastRefresh: null
    },
    showTime: true,
    showDate: true,
    showQuotes: true,
    showCalendar: true,
    showVisitedSites: true,
    dateFormat: "d-m-w",
    font: "Prompt",
    location: "London",
    darkBackground: false,
    language: "EN"
};


$("#prev-month").click(() => {
    const current = $("#month-name").text();
    if (current === months[preferences.language][new Date().getMonth()]) {
        showCalendar(-1);
    } else if (current === months[preferences.language][new Date().getMonth() + 1]) {
        showCalendar(0);
    }
});

$("#next-month").click(() => {
    const current = $("#month-name").text();
    if (current === months[preferences.language][new Date().getMonth()]) {
        showCalendar(1);
    } else if (current === months[preferences.language][new Date().getMonth() - 1]) {
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
    setBackground(true);
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
    preferences.weather.show = value;
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

$('#show-visited-sites').change(() => {
    const value = $('#show-visited-sites').prop("checked");
    preferences.showVisitedSites = value;
    if (value) {
        $("#show-visited-sites").attr("checked", "checked");
        $("#visited-sites-container").css("display", "flex");
        setMostVisitedSites();
    } else {
        $("#show-visited-sites").attr("checked", false);
        $("#visited-sites-container").remove();

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
        setBackground();
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
    preferences.language = $("#language-select option:selected").val();
    saveToStorage();
    changeLanguage();
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
        preferences.weather = {
            show: true,
            temperature: null,
            text: null,
            icon: null,
            lastRefresh: null
        };
        showWeather();
    }
});

$("#background-query").on('keyup', function (e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
        let value = $("#background-query").val();
        preferences.background.query = value;
        setBackground(true);
    }
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
        if (result.preferences == null || result.preferences.version == null || result.preferences < 3) {
            saveToStorage();
            loadFromStorage();
        } else {
            preferences = result.preferences;

            $("*").css("font-family", preferences.font);

            if (preferences.darkBackground) {
                $("#dark-background").prop("checked", "checked");
                $("#body").css("background", "#212121");
            } else {
                $("#dark-background").prop("checked", false);
                setBackground();
            }

            $("#date-order-select").val(preferences.dateFormat);
            $("#location").val(preferences.location);
            $("#background-query").val(preferences.background.query);
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

            if (preferences.weather.show) {
                $("#show-weather").prop("checked", "checked");
                $("#location").prop("disabled", false);
                showWeather();
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

            if (preferences.showVisitedSites) {
                $("#show-visited-sites").attr("checked", "checked");
                $("#visited-sites-container").css("display", "flex");
                setMostVisitedSites();
            } else {
                $("#show-visited-sites").attr("checked", false);
                $("#visited-sites-container").remove();
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
                    value.push(months[preferences.language][today.getMonth()]);
                    break;
                case "y":
                    value.push(today.getFullYear());
                    break;
                case "w":
                    value.push(weekdays[preferences.language][today.getDay()]);
                    break;
            }
        }
        $("#date").text(value.join(" "));
        dateInterval = setTimeout(showDate, 60000);
    }
}

function showTime() {
    $("#time").text(new Date().toLocaleTimeString("en-GB").substr(0, 5));
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
        span.text(shortenWeekdays[preferences.language][i].substr(0, 3));
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
    $("#month-name").text(months[preferences.language][today.getMonth() + monthShift]);
}

function showWeather(force = false) {
    if (preferences.location == null || preferences.location === "")
        return;
    if (preferences.weather.lastRefresh == null || (Math.abs(Date.now() - preferences.weather.lastRefresh) / 36e5) > 1 || force) {
        fetch(`https://nwv1k1ugmf.execute-api.eu-central-1.amazonaws.com/Prod/weather?operation=current&q=${preferences.location}&lang=${preferences.language.toLowerCase()}`,
            {
                method: 'get',
                headers: {'Content-Type': 'application/json'}
            })
            .then(response => response.json())
            .then(data => {
                preferences.weather = {
                    show: true,
                    temperature: data.current.temp_c.toString() + "°C",
                    text: data.current.condition.text,
                    icon: "http://" + data.current.condition.icon.replace("//", ""),
                    lastRefresh: Date.now()
                };
                setWeatherValuesToHtml();
                saveToStorage();
            })
            .catch(error => console.error(error));
    } else {
        setWeatherValuesToHtml();
    }
}

function setBackground(force = false) {
    if ((Math.abs(Date.now() - preferences.background.lastRefresh) / 36e5) > 24 || preferences.background.src == null || force) {
        console.log(preferences.background);
        fetch(`https://nwv1k1ugmf.execute-api.eu-central-1.amazonaws.com/Prod/background?query=${encodeURIComponent(preferences.background.query)}`,
            {
                method: 'get',
                headers: {'Content-Type': 'application/json'}
            })
            .then(response => response.json())
            .then(data => {
                preferences.background = {
                    query: preferences.background.query,
                    src: data.raw_url,
                    link: data.link,
                    user: data.user,
                    lastRefresh: Date.now()
                };
                setBackgroundValuesToHtml();
                saveToStorage();
            })
            .catch(error => console.error(error));
    } else {
        setBackgroundValuesToHtml();
    }
}

function setWeatherValuesToHtml() {
    $("#weather-city").text(toTitleCase(preferences.location.replace(/,/g, " ")));
    $("#weather-status").text(preferences.weather.text);
    $("#weather-temp").text(preferences.weather.temperature);
    $("#weather-icon").attr("src", preferences.weather.icon);
    $("#weather-container").attr("title", `Powered by Weather Api, Last Refresh: ${new Date(preferences.weather.lastRefresh).toLocaleTimeString("en-GB").substring(0, 5)}`);
}

function setBackgroundValuesToHtml() {
    $("body").css("background", `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${preferences.background.src}) no-repeat center center fixed`);
    $("#attribution").html(`Photo on <a href=${preferences.background.link}?utm_source=Minitime&utm_medium=referral>${preferences.background.user}</a> on <a href=https://unsplash.com/?utm_source=Minitime&utm_medium=referral>Unsplash</a>`);
}

function setMostVisitedSites() {
    const visitedContainer = $("<div id=\"visited-sites-container\">\n" +
        "        <span id=\"visited-sites-heading\" class=\"font-weight-500\">Most Visited Sites</span>\n" +
        "        <ul id=\"visited-sites-ul\">\n" +
        "\n" +
        "        </ul>\n" +
        "    </div>");
    $("#container").append(visitedContainer);

    chrome.topSites.get(
        (data) => {
            for (let i = 0; i < data.length; i++) {
                const a = $("<a></a>");
                a.text(data[i].title);
                a.attr("href", data[i].url);
                const img = $("<img/>");
                img.attr("src", `https://www.google.com/s2/favicons?domain=${getDomainWithoutSubdomain(data[i].url)}`);
                const li = $("<li></li>");
                li.append(img);
                li.append(a);
                $("#visited-sites-ul").append(li);
            }
        }
    );
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

function changeLanguage() {
    showWeather(true);
    clearInterval(dateInterval);
    showDate();
    showCalendar(0);
}

function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
    );
}

function getDomainWithoutSubdomain(s) {
    s = new URL(s).hostname;
    const firstTLDs = "ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|be|bf|bg|bh|bi|bj|bm|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|cl|cm|cn|co|cr|cu|cv|cw|cx|cz|de|dj|dk|dm|do|dz|ec|ee|eg|es|et|eu|fi|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jo|jp|kg|ki|km|kn|kp|kr|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|na|nc|ne|nf|ng|nl|no|nr|nu|nz|om|pa|pe|pf|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sx|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|yt".split('|');
    const secondTLDs = "com|edu|gov|net|mil|org|nom|sch|caa|res|off|gob|int|tur|ip6|uri|urn|asn|act|nsw|qld|tas|vic|pro|biz|adm|adv|agr|arq|art|ato|bio|bmd|cim|cng|cnt|ecn|eco|emp|eng|esp|etc|eti|far|fnd|fot|fst|g12|ggf|imb|ind|inf|jor|jus|leg|lel|mat|med|mus|not|ntr|odo|ppg|psc|psi|qsl|rec|slg|srv|teo|tmp|trd|vet|zlg|web|ltd|sld|pol|fin|k12|lib|pri|aip|fie|eun|sci|prd|cci|pvt|mod|idv|rel|sex|gen|nic|abr|bas|cal|cam|emr|fvg|laz|lig|lom|mar|mol|pmn|pug|sar|sic|taa|tos|umb|vao|vda|ven|mie|北海道|和歌山|神奈川|鹿児島|ass|rep|tra|per|ngo|soc|grp|plc|its|air|and|bus|can|ddr|jfk|mad|nrw|nyc|ski|spy|tcm|ulm|usa|war|fhs|vgs|dep|eid|fet|fla|flå|gol|hof|hol|sel|vik|cri|iwi|ing|abo|fam|gok|gon|gop|gos|aid|atm|gsm|sos|elk|waw|est|aca|bar|cpa|jur|law|sec|plo|www|bir|cbg|jar|khv|msk|nov|nsk|ptz|rnd|spb|stv|tom|tsk|udm|vrn|cmw|kms|nkz|snz|pub|fhv|red|ens|nat|rns|rnu|bbs|tel|bel|kep|nhs|dni|fed|isa|nsn|gub|e12|tec|орг|обр|упр|alt|nis|jpn|mex|ath|iki|nid|gda|inc".split('|');
    const parts = s.split('.');
    while (parts.length > 3) {
        parts.shift();
    }
    if (parts.length === 3 && ((parts[1].length > 2 && parts[2].length > 2) || (secondTLDs.indexOf(parts[1]) === -1) && firstTLDs.indexOf(parts[2]) === -1)) {
        parts.shift();
    }
    return parts.join('.');
}

document.cookie = 'SameSite=None; Secure';
loadFromStorage();