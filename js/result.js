(function updateResultPage() {
    const teamInfo = JSON.parse(localStorage.getItem('team'));
    const { team, ranking, dateQualified, qualificationMethod, lastQualification, previousTitles } = teamInfo;

    const imgEl = document.querySelector(".result-container img");
    imgEl.setAttribute("src", `images/flags/${team}.jpg`);
        
    document.getElementById("country").innerHTML = team;
    document.getElementById("rank").innerHTML = `World Ranking: ${ranking}`;
    document.getElementById("dateQualified").innerHTML = dateQualified;
    document.getElementById("qualificationMethod").innerHTML = qualificationMethod;
    document.getElementById("lastQualification").innerHTML = lastQualification;
    document.getElementById("previousTitles").innerHTML = previousTitles;
})();

