export const datetimeComponent = $("" +
    "<div id=\"datetime-container\">\n" +
    "    <span id=\"date\" class=\"font-weight-300\"></span>\n" +
    "    <span id=\"time\" class=\"font-weight-300\"></span>\n" +
    "</div>" +
    "");

export const quoteComponent = $("" +
    "<div id=\"quotes-container\" class=\"font-weight-300\">\n" +
    "        <span id=\"quote\"></span>\n" +
    "        <span id=\"author\" class=\"font-weight-500\"></span>\n" +
    "</div>" +
    "");

export const weatherComponent = $("" +
    "<div id=\"weather-container\">\n" +
    "        <div id=\"weather-text\">\n" +
    "            <span class=\"font-weight-500\" id=\"weather-city\"></span>\n" +
    "            <span class=\"font-weight-300\" id=\"weather-status\"> - </span>\n" +
    "            <span class=\"font-weight-500\" id=\"weather-temp\"> - </span>\n" +
    "        </div>\n" +
    "        <img alt=\"weather\" src=\"\" id=\"weather-icon\">\n" +
    "</div>" +
    "");

export const attributeComponent = $("<span id=\"attribution\" class=\"font-weight-300\"></span>");

export const aboutComponent = $("" +
    "<div id=\"about-container\" class=\"font-weight-300\">\n" +
    "        <div class=\"name\"></div>\n" +
    "        <div>\n" +
    "            <span><b>Version</b></span>\n" +
    "            <div class=\"version\"></div>\n" +
    "        </div>\n" +
    "        <div>\n" +
    "            <span><b>About</b></span>\n" +
    "            <div class=\"information\"></div>\n" +
    "        </div>\n" +
    "        <div class=\"sources\">\n" +
    "            <span><b>Sources</b></span>\n" +
    "        </div>\n" +
    "        <div>\n" +
    "            <span><b>Developer</b></span>\n" +
    "            <div class=\"developer\"></div>\n" +
    "            <div class=\"contact\"></div>\n" +
    "            <div class=\"patreon\">\n" +
    "                <a href=\"https://www.patreon.com/bePatron?u=61807408\">Become a Patron!</a>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <button id=\"close-about\">\n" +
    "            <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\">\n" +
    "                <path fill=\"none\" d=\"M0 0h24v24H0z\"/>\n" +
    "                <path d=\"M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z\"\n" +
    "                      fill=\"rgba(255,255,255,1)\"/>\n" +
    "            </svg>\n" +
    "        </button>\n" +
    "</div>" +
    "");

export const calendarComponent = $("" +
    "<div id=\"calendar\">\n" +
    "            <div id=\"month\">\n" +
    "                <button class=\"change-month\" id=\"prev-month\">\n" +
    "                    <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"18\" height=\"18\">\n" +
    "                        <path fill=\"none\" d=\"M0 0h24v24H0z\"/>\n" +
    "                        <path d=\"M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z\"\n" +
    "                              fill=\"rgba(255,255,255,1)\"/>\n" +
    "                    </svg>\n" +
    "                </button>\n" +
    "                <span id=\"month-name\" class=\"font-weight-700\"></span>\n" +
    "                <button class=\"change-month\" id=\"next-month\">\n" +
    "                    <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"18\" height=\"18\">\n" +
    "                        <path fill=\"none\" d=\"M0 0h24v24H0z\"/>\n" +
    "                        <path d=\"M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z\"\n" +
    "                              fill=\"rgba(255,255,255,1)\"/>\n" +
    "                    </svg>\n" +
    "                </button>\n" +
    "            </div>\n" +
    "            <div id=\"weekdays\" class=\"font-weight-500\"></div>\n" +
    "            <div id=\"days\"></div>\n" +
    "</div>" +
    "");

export const settingsComponent = $("" +
    "<div id=\"settings\">\n" +
    "            <span id=\"settings-heading\">Settings</span>\n" +
    "            <div class=\"settings-item\">\n" +
    "                <span>Show time</span>\n" +
    "                <label class=\"switch.css\">\n" +
    "                    <input type=\"checkbox\" id=\"toggle-time\">\n" +
    "                    <span class=\"slider round\"></span>\n" +
    "                </label>\n" +
    "            </div>\n" +
    "            <div class=\"settings-item\">\n" +
    "                <span>Show date</span>\n" +
    "                <label class=\"switch.css\">\n" +
    "                    <input type=\"checkbox\" id=\"toggle-date\">\n" +
    "                    <span class=\"slider round\"></span>\n" +
    "                </label>\n" +
    "            </div>\n" +
    "            <div class=\"settings-item\">\n" +
    "                <span>Show quotes</span>\n" +
    "                <label class=\"switch.css\">\n" +
    "                    <input type=\"checkbox\" id=\"toggle-quotes\">\n" +
    "                    <span class=\"slider round\"></span>\n" +
    "                </label>\n" +
    "            </div>\n" +
    "            <div class=\"settings-item\">\n" +
    "                <span>Show calendar</span>\n" +
    "                <label class=\"switch.css\">\n" +
    "                    <input type=\"checkbox\" id=\"show-calendar\">\n" +
    "                    <span class=\"slider round\"></span>\n" +
    "                </label>\n" +
    "            </div>\n" +
    "            <div class=\"settings-item\">\n" +
    "                <span>Show weather</span>\n" +
    "                <label class=\"switch.css\">\n" +
    "                    <input type=\"checkbox\" id=\"show-weather\">\n" +
    "                    <span class=\"slider round\"></span>\n" +
    "                </label>\n" +
    "            </div>\n" +
    "            <div class=\"settings-item\">\n" +
    "                <span>Show most visited sites</span>\n" +
    "                <label class=\"switch.css\">\n" +
    "                    <input type=\"checkbox\" id=\"show-visited-sites\">\n" +
    "                    <span class=\"slider round\"></span>\n" +
    "                </label>\n" +
    "            </div>\n" +
    "            <div class=\"settings-item\">\n" +
    "                <span>Dark background</span>\n" +
    "                <label class=\"switch.css\">\n" +
    "                    <input type=\"checkbox\" id=\"dark-background\">\n" +
    "                    <span class=\"slider round\"></span>\n" +
    "                </label>\n" +
    "            </div>\n" +
    "            <div class=\"settings-item\">\n" +
    "                <label for=\"language-select\">Language</label>\n" +
    "                <select name=\"lang-select\" id=\"language-select\" class=\"select-box font-weight-300\">\n" +
    "                    <option value=\"EN\">English</option>\n" +
    "                    <option value=\"FR\">French</option>\n" +
    "                    <option value=\"ES\">Spanish</option>\n" +
    "                    <option value=\"TR\">Turkish</option>\n" +
    "                    <option value=\"DE\">German</option>\n" +
    "                </select>\n" +
    "            </div>\n" +
    "            <div class=\"settings-item\">\n" +
    "                <label for=\"date-order-select\">Date Order</label>\n" +
    "                <select name=\"date-select\" id=\"date-order-select\" class=\"select-box font-weight-300\">\n" +
    "                    <option value=\"w-d-m\">Weekday Date Month</option>\n" +
    "                    <option value=\"w-d-m-y\">Weekday Date Month Year</option>\n" +
    "                    <option value=\"d-m-w\">Date Month Weekday</option>\n" +
    "                    <option value=\"d-m-y-w\">Date Month Year Weekday</option>\n" +
    "                </select>\n" +
    "            </div>\n" +
    "            <div class=\"settings-item\">\n" +
    "                <label for=\"font-select\">Font</label>\n" +
    "                <select name=\"style\" id=\"font-select\" class=\"select-box font-weight-300\">\n" +
    "                    <option value=\"Prompt\">Prompt</option>\n" +
    "                    <option value=\"Poppins\">Poppins</option>\n" +
    "                    <option value=\"Montserrat\">Montserrat</option>\n" +
    "                    <option value=\"Roboto\">Roboto</option>\n" +
    "                </select>\n" +
    "            </div>\n" +
    "            <div class=\"settings-item\">\n" +
    "                <label for=\"location\">Location</label>\n" +
    "                <input type=\"text\" id=\"location\" placeholder=\"Location\">\n" +
    "            </div>\n" +
    "            <div class=\"settings-item\">\n" +
    "                <label for=\"background-query\">Background Query</label>\n" +
    "                <input type=\"text\" id=\"background-query\" placeholder=\"Query\">\n" +
    "            </div>\n" +
    "            <div class=\"settings-item\" id=\"show-about\">\n" +
    "                <button>Show About</button>\n" +
    "            </div>\n" +
    "</div>" +
    "")

