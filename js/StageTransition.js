function stageTransitionSetup() {
    showSelectCategory();
    document.getElementById("selectStock").getElementsByClassName("backButton")[0].onclick = function() {
        showSelectCategory();
    };
}

function showCaseSelect() {
    hideAllWindows();
    showSection("selectStock");
    resetCaseSelect();
}

function showSelectCategory() {
    hideAllWindows();
    showSection("selectCategory");
    showSection("viewList");
    printCurrentListOfItems();
}

// Helper methods
function hideSection(sectionName) {

    var temp = document.getElementById(sectionName);
    temp.style.display = "none";

}
function showSection(sectionName) {

    var temp = document.getElementById(sectionName);
    temp.style.display = "block";

}
function hideAllWindows() {
    hideSection("viewList");
    hideSection("selectCategory");
    hideSection("selectStock");
}
function resetCaseSelect() {
    var temp = document.getElementById("selectStock").getElementsByClassName("selected");
    console.log(temp.length);
    for(var i = 0; i < temp.length) {
        temp[i].classList.remove("selected");
    }
}
function printCurrentListOfItems() {

    var retVal = "";

    var categories = document.getElementById("viewList").getElementsByClassName("categoryItem");
    for(var i = 0; i < categories.length; i++) {
        var header = categories[i].getElementsByClassName("categoryHeader");
        var items = categories[i].getElementsByTagName("li");
        retVal += header[0].innerText+"\n";
        for(var x = 0; x < items.length; x++) {
            retVal += "- "+items[x].innerText+"\n";
        }
    }

    console.log(retVal);
    return retVal;

}