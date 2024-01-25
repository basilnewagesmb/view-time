document.addEventListener("DOMContentLoaded", function () {
    chrome.tabs.query({ //This method output active URL
        "active": true,
        "currentWindow": true,
        "status": "complete",
        "windowType": "normal"
    }, function (tabs) {
        if (tabs[0].url === "https://timetracker.newagesmb.com/#/yattendance") {
            const btn = document.querySelector("body > .card-main > button")
            const out = document.getElementById("workLogContent")
            btn.addEventListener("click", () => {
                btn.innerText = "Loading..."
                chrome.scripting
                    .executeScript({
                        target: { tabId: tabs[0].id },
                        func: Calculate,
                    })
                    .then((e) => {
                        btn.innerText = "Check Now"
                        out.innerHTML =
                            e?.[0].result ? `<p class="result">${e?.[0].result}</p>` : `<img class="not_fount" src="/not_fount.png" alt="not fount"/>`
                    });
            })
            console.log(tabs);
        } else {
            window.open("https://timetracker.newagesmb.com/#/yattendance", "_blank");
        }


    });
});
function Calculate() {
    const currentDurationElement = document.querySelector("body > div:nth-child(2) > div.container.body.ng-scope > div > div > div:nth-child(1) > div.row > div.col-md-12.col-sm-12.col-xs-12 > div > div.x_content > table > tbody > tr:nth-child(1) > td:nth-child(7)");
    const entryTimeElement = document.querySelector("body > div:nth-child(2) > div.container.body.ng-scope > div > div > div:nth-child(1) > div.row > div.col-md-12.col-sm-12.col-xs-12 > div > div.x_content > table > tbody > tr:nth-child(1) > td:nth-child(4)");
    const lastLogTimeElement = document.querySelector("body > div:nth-child(2) > div.container.body.ng-scope > div > div > div:nth-child(1) > div.row > div.col-md-12.col-sm-12.col-xs-12 > div > div.x_content > table > tbody > tr:nth-child(1) > td:nth-child(5)");

    const currentDuration = currentDurationElement ? currentDurationElement.innerHTML : "0h 0m";
    const lastLogTime = lastLogTimeElement ? lastLogTimeElement.innerText == "0m" ? entryTimeElement.innerHTML : lastLogTimeElement.innerText : "00:00 AM";

    // Extract hours and minutes from currentDuration
    const [currentHours, currentMinutes] = currentDuration.match(/\d+/g).map(Number);

    // Extract hours and minutes from lastLogTime
    const [lastLogHours, lastLogMinutes] = lastLogTime.match(/\d+/g).map(Number);

    // Calculate remaining time in minutes
    const remainingMinutes = 8 * 60 - (currentHours * 60 + currentMinutes);

    // Calculate remaining time in hours and minutes
    const remainingHours = Math.floor(remainingMinutes / 60);
    const remainingMinutesInHours = remainingMinutes % 60;

    // Calculate logout time in hours and minutes
    const logoutHours = lastLogHours + remainingHours;
    const logoutMinutes = lastLogMinutes + remainingMinutesInHours;

    // Adjust for overflow (if minutes exceed 60)
    const adjustedLogoutHours = (logoutHours + Math.floor(logoutMinutes / 60)) % 12;
    const adjustedLogoutMinutes = logoutMinutes % 60;

    // Determine AM/PM
    const ampm = lastLogTime.includes("PM") ? "PM" : "AM";

    // Format the logout time
    const formattedLogoutTime = `${adjustedLogoutHours}:${adjustedLogoutMinutes.toString().padStart(2, '0')} ${ampm}`;

    // Get the current time
    const currentTime = new Date();
    const currentHoursNow = currentTime.getHours();
    const currentMinutesNow = currentTime.getMinutes();

    // Calculate the remaining time from current time to logout time
    const remainingHoursNow = Math.floor((logoutHours - currentHoursNow + 12) % 12);
    const remainingMinutesNow = (logoutMinutes - currentMinutesNow + 60) % 60;

    let remaining = `${remainingHoursNow}h ${remainingMinutesNow}m`;

    return `Hi, You can leave at ${formattedLogoutTime}, ${remaining} is remaining.`;
}
