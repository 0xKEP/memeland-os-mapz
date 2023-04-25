function addMapzElement() {
    const traitsContainer = document.querySelector(".Panel--isContentPadded.item--description");

    if (traitsContainer) {
        // Call the API to fetch the data
        const captz_id = window.location.pathname.split('/').pop();
        fetch(`https://dashboard-api.memeland.com/profile/captainz/${captz_id}`)
            .then((response) => response.json())
            .then((data) => {
                const mapzData = data.profile.maps;

                // Map the keys to their names
                const mapzNames = {
                    unrevealed: "Unrevealed",
                    0: "Specials",
                    1: "Extraordinary",
                    2: "Magical",
                    3: "Epic",
                    4: "Mythical",
                };

                // Create the Mapz info text
                let mapzInfo = "Mapz:";
                for (const key in mapzData) {
                    if (mapzData.hasOwnProperty(key)) {
                        const count = mapzData[key];
                        const name = mapzNames[key];
                        mapzInfo += `<br />${name}: ${count}`;
                    }
                }

                // Append the Mapz info to the traits container
                traitsContainer.innerHTML += `${mapzInfo}`;
            });
    }
}


function waitForElementToDisplay(selector, callback, checkFrequencyInMs = 100, timeoutInMs = 9000) {
    let startTimeInMs = Date.now();
    (function loopSearch() {
        if (document.querySelector(selector) != null) {
            callback(document.querySelector(selector));
            return;
        } else {
            setTimeout(function () {
                if (timeoutInMs && Date.now() - startTimeInMs > timeoutInMs) {
                    return;
                }
                loopSearch();
            }, checkFrequencyInMs);
        }
    })();
}


waitForElementToDisplay('.Panel--isContentPadded.item--description', addMapzElement)