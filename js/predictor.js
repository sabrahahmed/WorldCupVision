// ELEMENTS
const saveButton = document.getElementById("save") 
const bracket = document.getElementById("bracket")
const nav = document.getElementById("nav");
const teamInput = document.querySelectorAll(".teamSelect")
const R16teams = document.querySelectorAll(".round-16 .team p")

// RESPONSIVE SIDE MENU
function openmenu(){
    nav.style.right = "0";
}
function closemenu(){
    nav.style.right = "-100%";
}

const team = document.querySelectorAll(".team");
team.forEach((team) => {
  team.addEventListener('change', function(){
    team.children[0].setAttribute("src", `Images/Flags/${team.children[1].value}.jpg`);
  })
})

// autoClick function
function autoClick() {
  saveButton.click();
}


// Save bracket once save button is clicked 
saveButton.addEventListener('click', ()=>{
    const canvas = document.createElement('canvas');
    // const ctx = canvas.getContext('2d', {willReadFrequently: true});
    
    //Set bracket image background color
    bracket.style.backgroundColor = "rgba(4, 92, 124, 0.724)"
    
    html2canvas(bracket, {
        onrendered: (canvas) => {
    
        var imageData = canvas.toDataURL("trophy/jpg");
        var newData = imageData.replace(/^data:image\/jpg/, "data: application/octet-stream");
        
        saveButton.setAttribute("href", newData);
        saveButton.setAttribute("download", "bracket.jpg")
        bracket.style.background = "";
    
        }
    })
})

R16teams.forEach((team) => {
    team.addEventListener("dblclick", ()=>{
        fetchTeam(team.innerHTML)
    });
})

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