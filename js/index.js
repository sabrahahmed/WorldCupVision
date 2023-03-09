const searchButtonEl = document.getElementById("searchButton");
const searchInputEl = document.getElementById("search-input");
const resultURL = "result.html";

// CALL fetchTeam() FUNCTION ON CLICK
function onDOMContentLoaded() {
    searchButtonEl.addEventListener("click", () => {
        fetchTeam(searchInputEl.value.trim());
    });
}

document.addEventListener("DOMContentLoaded", onDOMContentLoaded);

// SMOOTH TRANSITION
function transitionToPage(href) {
    document.querySelector('body').style.opacity = 0;
    setTimeout(() => { 
        window.location.href = href;
    }, 500);
}

function onDOMContentLoaded2() {
    document.querySelector('body').style.opacity = 1;
}
document.addEventListener('DOMContentLoaded', onDOMContentLoaded2);

// FETCH TEAMS DATA FROM JSON
function fetchTeam(searchQuery) {
    return fetch('teams.json')
    .then(response => response.json())
    .then(data => {
        const team = data.find(t => t.team === searchQuery);
        if (team) {
            const myObjectString = JSON.stringify(team);
            localStorage.setItem('team', myObjectString);
            setTimeout(() => location.href = resultURL, 500);
            
        } else {
            alert(`Team ${searchQuery} not found.`);
        }
    })
    .catch(error => {
        console.error(`Error fetching teams: ${error}`);
    });
}

// UPDATE TEAM INFO ON RESULTS PAGE
function updateResultPage() {
    const teamInfo = JSON.parse(localStorage.getItem('team'));
    const { team, ranking, dateQualified, qualificationMethod, lastQualification, previousTitles } = teamInfo;

    const imgEl = document.querySelector(".result-container img");
    imgEl.setAttribute("src", `Images/Flags/${team}.jpg`);
        
    document.getElementById("country").innerHTML = team;
    document.getElementById("rank").innerHTML = `World Ranking: ${ranking}`;
    document.getElementById("dateQualified").innerHTML = dateQualified;
    document.getElementById("qualificationMethod").innerHTML = qualificationMethod;
    document.getElementById("lastQualification").innerHTML = lastQualification;
    document.getElementById("previousTitles").innerHTML = previousTitles;
}

if (location.pathname === "/result.html") {
    updateResultPage();
}

// FETCH TEAM NAMES FROM JSON FOR TEAMS LIST PAGE
function createTeamGrid() {
    return fetch('teams.json')
    .then(response => response.json())
    .then(data => {
        const teamsGridEl = document.querySelector(".teams-grid");
        data.forEach(({team}) => {
            teamsGridEl.innerHTML += `<li><img onclick="transitionToPage('result.html')" class="grid-flag" id="${team}" src="Images/Flags/${team}.jpg" alt=""><h4>${team}</h4></li>`       
        });
    })
    .catch(error => {
        console.error(`Error fetching teams: ${error}`);
    });
}

if (location.pathname === "/teams.html") {
    createTeamGrid().then(() => {
        const gridFlags = document.querySelectorAll(".grid-flag");
        gridFlags.forEach((flag) => {
            flag.addEventListener("click", () => {
                fetchTeam(flag.getAttribute("id"));   
            });
          });
    });
}

