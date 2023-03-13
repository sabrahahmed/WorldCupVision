// FETCH TEAM NAMES FROM JSON FOR TEAMS LIST PAGE
(async function createTeamGrid() {
    try {
      const response = await fetch('teams.json');
      const data = await response.json();
      const teamsGridEl = document.querySelector('.teams-grid');
      const teamsHTML = data.map(({ team }) => {
        return `
          <li>
            <img onclick="transitionToPage('result.html')" class="grid-flag" id="${team}" src="images/Flags/${team}.jpg" alt="">
            <h4>${team}</h4>
          </li>
        `;
      });
      teamsGridEl.innerHTML = teamsHTML.join('');
    } catch (error) {
      console.error(`Error fetching teams: ${error}`);
    }
})();
  

const gridFlags = document.querySelectorAll(".grid-flag");
gridFlags.forEach((flag) => {
    flag.addEventListener("click", () => {
        fetchTeam(flag.getAttribute("id"));   
    });
});

