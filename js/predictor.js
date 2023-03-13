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
    team.children[0].setAttribute("src", `images/flags/${team.children[1].value}.jpg`);
  })
})

// autoClick function
function autoClick() {
  saveButton.click();
}

R16teams.forEach((team) => {
    team.addEventListener("dblclick", ()=>{
        fetchTeam(team.innerHTML)
    });
})

// Save bracket once save button is clicked 
saveButton.addEventListener('click', ()=>{
    let flag = true
    teamInput.forEach(team => {
        if(team.innerHTML === ''){
            flag = false
            console.log("empty flag")
        };
        flag = true;
    })
    
    if (flag) {
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
    }
})