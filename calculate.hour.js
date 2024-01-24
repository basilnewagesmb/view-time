

window.addEventListener('load', function () {
    const currentDurationElement = document.querySelector("table > tbody > tr:nth-child(1) > td:nth-child(7)");

    console.log(currentDurationElement);
})


function Calculate() {
    const currentDurationElement = document.querySelector("body > div:nth-child(2) > div.container.body.ng-scope > div > div > div:nth-child(1) > div.row > div.col-md-12.col-sm-12.col-xs-12 > div > div.x_content > table > tbody > tr:nth-child(1) > td:nth-child(7)");
    const lastLogTimeElement = document.querySelector("body > div:nth-child(2) > div.container.body.ng-scope > div > div > div:nth-child(1) > div.row > div.col-md-12.col-sm-12.col-xs-12 > div > div.x_content > table > tbody > tr:nth-child(1) > td:nth-child(5)");

    const currentDuration = currentDurationElement ? currentDurationElement.innerHTML : "0h 0m";
    const lastLogTime = lastLogTimeElement ? lastLogTimeElement.innerText : "00:00 AM";

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

    return ({
        isError: currentDurationElement ? true : false,
        logoutTime: formattedLogoutTime,
        remaining: `${remainingHours}h ${remainingMinutesInHours}m`
    });
}