const searchButtonEl = document.getElementById("searchButton");
const searchInputEl = document.getElementById("search-input");
const resultURL = "result.html";

// CALL fetchTeam() FUNCTION ON CLICK
function onDOMContentLoaded() {
    searchButtonEl.addEventListener("click", () => {
        
        if(searchInputEl.value) {
            let input = searchInputEl.value.trim()
            fetchTeam(input.charAt(0).toUpperCase() + input.slice(1));
        }
    });
}

document.addEventListener("DOMContentLoaded", onDOMContentLoaded);

// SMOOTH TRANSITION BETWEEN PAGES
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
async function fetchTeam(searchQuery) {
    try {
      const response = await fetch('teams.json');
      const data = await response.json();
      const team = data.find(t => t.team === searchQuery);
      if (team) {
        const myObjectString = JSON.stringify(team);
        localStorage.setItem('team', myObjectString);
        setTimeout(() => location.href = resultURL, 500);
      } else {
        alert(`Team ${searchQuery} not found.`);
      }
    } catch (error) {
      console.error(`Error fetching teams: ${error}`);
    }
}


