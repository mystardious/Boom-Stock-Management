// Store created categories e.g. iPhone 7, General, etc.
var createdCategories = [];

// Store selected category
var selectedCategory = "";

var caseList = 
    [new Case("BOOMtique","2 in 1 Magnetic Wallet",["red", "brown", "black"]),
    new Case("BOOMtique","Executive Pouch",[]),
    new Case("BOOMtique","Executive Wallet",[]),
    new Case("BOOMtique","Flower Petal Case",[]),
    new Case("BOOMtique","Generic",["black", "clear", "red", "white"]),
    new Case("BOOMtique","Karat Case",["gold", "orange", "silver"]),
    new Case("BOOMtique","Pearl Case",[]),
    new Case("BOOMtique","Vogue Wallet",[]),
    new Case("BOOMtique","Waterfall Case",[]),
    new Case("Goospery","TPU",["black", "clear"]),
    new Case("Incipio","Dual Layer",["black", "clear"]),
    new Case("Mercury","Blue Moon",[]),
    new Case("Mercury","Canvas Diary",[]),
    new Case("Mercury","Mansoor Wallet Diary Case",[]),
    new Case("Mercury","Sonata",[]),
    new Case("OtterBox","Defender",["black"]),
    new Case("OtterBox","Strada Folio",["black"]),
    new Case("Samsung","Clear View Standing Cover",[]),
    new Case("Samsung","LED View Cover",[]),
    new Case("tech21","Evo Check",["black", "white", "red", "purple", "pink", "yellow"]),
    new Case("tech21","Pure Clear",["clear"]),
    new Case("UAG","Pylo",["black"])];

function loadColourSelectOnClick() {

    var colourSelectButtons = document.getElementById("selectCase").getElementsByClassName("colourSelect");

    for(var i = 0; i < colourSelectButtons.length; i++) {

        colourSelectButtons[i].onclick = function() {

            if(this.innerText === "All") {
                
                var buttons = this.parentNode.getElementsByClassName("colourSelect");

                for(var i = 1; i < buttons.length; i++) {
                    buttons[i].classList.remove("selected");
                }

            } else {
                this.parentNode.firstChild.classList.remove("selected");
            }

            if(this.classList.contains("selected")) {
                this.classList.remove("selected");
            } else {
                this.classList.add("selected");
            }

        }

    }

}

function loadNumberSelectOnClick() {

    var numSelectButtons = document.getElementById("selectCase").getElementsByClassName("numberSelect");

    for(var i = 0; i < numSelectButtons.length; i++) {

        numSelectButtons[i].onclick = function() {

            var selectableButtons = this.parentNode.getElementsByClassName('numberSelect');

            if(!this.classList.contains("selected")) {

                for(var i = 0; i < selectableButtons.length; i++) {
                    selectableButtons[i].classList.remove("selected");
                }

                this.classList.add("selected");

            }

        }

    }

    var inputTextBoxes = document.getElementById("selectCase").getElementsByClassName("numberSelectInput");

    for(var i = 0; i < inputTextBoxes.length; i++) {
        inputTextBoxes[i].onclick = function() {
            
            var selectableButtons = this.parentNode.getElementsByClassName('numberSelect');

            if(!this.classList.contains("selected")) {

                for(var i = 0; i < selectableButtons.length; i++) {
                    selectableButtons[i].classList.remove("selected");
                }

            }

        }
    }

}

function loadCaseItems() {

    for(var i = 0; i < caseList.length; i++) {
        createCaseItem(caseList[i], i);
    }

    loadCaseItemsOnClick();

}
function loadCaseItemsOnClick() {

    var buttons = document.getElementById("selectCase").getElementsByClassName('button');
    for(var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function() { addCaseToList(this) };
    }

}
function addCaseToList(item) {

    var container = item.parentNode.parentNode.parentNode;
    var item = caseList[container.id];
    var brand = item.brand;
    var name = item.name;

    // Check if a note exists
    var temp = container.getElementsByClassName("notesInput")[0].value;
    if(temp !== "") {
        name = name + " ("+temp+")";
    }

    // Check selected colours
    temp = container.getElementsByClassName("colourSelect selected");
    var selectedColours = [];

    if(temp[0].innerText === "All") {
        brand = "All Colours "+ brand;
    } else {
        for(var i = 0; i < temp.length; i++) {
            selectedColours.push(temp[i].innerText);
        }

    }

    var colourSelected = [];
    for(var i = 0; i < temp.length; i++) {
        colourSelected.push(temp[i].style.backgroundColor);
    }

    // Check user number input
    var numItems = 0;
    var selectedNumber = container.getElementsByClassName("numberSelect selected");
    if(selectedNumber.length > 0) {
        numItems = parseInt(selectedNumber[0].innerText);
    } else {
        numItems = parseInt(container.getElementsByClassName("numberSelectInput")[0].value);
    }

    // Category must be selected to continue
    if(selectedCategory !== "") {
        // The quantity of the item selected must be selected to continue
        if(numItems > 0) {
            if(temp.length > 0) {
                if(selectedColours.length > 0) {
                    for(var i = 0; i < selectedColours.length; i++) {
                        if(categoryExists(selectedCategory)) {
                            getCategory(selectedCategory).appendChild(createCategoryItem(selectedColours[i]+" "+brand, name, numItems));
                        } else {
                            createCategory(selectedCategory);
                            getCategory(selectedCategory).appendChild(createCategoryItem(selectedColours[i]+" "+brand, name, numItems));
                        }
                    }
                } else {
                    if(categoryExists(selectedCategory)) {
                        getCategory(selectedCategory).appendChild(createCategoryItem(brand, name, numItems));
                    } else {
                        createCategory(selectedCategory);
                        getCategory(selectedCategory).appendChild(createCategoryItem(brand, name, numItems));
                    }
                }
                
            } else {
                console.log("Please select the colours you require.")
            }
        } else {
            console.log("Please select the number of items you require.")
        }
    } else {
        console.log("Please select a category to continue.")
    }

}

function loadCategorySection() {

    // Add onclick events to selectable categories
    var listOfButtons = document.getElementById("selectCategory").getElementsByClassName("item");
    for(var i = 0; i < listOfButtons.length; i++) {
        listOfButtons[i].onclick = function() { setCategory(this) };
    }

}
function setCategory(element) {

    var subSectionName = element.parentNode.parentNode.firstElementChild.innerText;

    if(subSectionName === "General") {
        selectedCategory = subSectionName;
    } else {
        selectedCategory = element.innerText;
        showCaseSelect();
    }

}

// Create and place element to store items added
function createCategory(categoryName) {

    var x = document.createElement('div');
    x.className = "categoryItem";

    var header = document.createElement('div');
    header.className = "categoryHeader";
    header.innerText = categoryName;

    var body = document.createElement('div');
    var ul = document.createElement('ul');
    ul.id = categoryName;
    body.className = "categoryBody";
    body.appendChild(ul);

    x.appendChild(header);
    x.appendChild(body);

    document.getElementById("currentList").appendChild(x);

    createdCategories.push(categoryName);

}
// Create item placeholder to be placed into category list
function createCategoryItem(brand, itemName, numRequired) {

    var temp = document.createElement('li');
    temp.innerText = numRequired + "x " + brand + " " + itemName;

    return temp;

}
function createCaseItem(item, id) {

    var container = document.createElement('div');
    container.className = "categoryItem";
    container.id = id;

    var header = document.createElement('div');
    header.className = "categoryHeader";
    header.innerText = item.brand +" "+ item.name;

    var body = document.createElement('div');
    body.className = "categoryBody";

    /* Create Choose Colours heading */
    var colourHeader = document.createElement('section');
    var colourHeader2 = document.createElement('div');
    colourHeader2.className = "smallHeader";
    colourHeader2.innerText = "Choose colours";

    colourHeader.appendChild(colourHeader2);
    body.appendChild(colourHeader);

    /* Display available colours */
    var colourBody = document.createElement('section');
    colourBody.className = "flexBox";
    if(item.hasColours()) {

        /* Add all button */
        var temp = document.createElement('div');
        temp.className = "colourSelect";
        temp.innerText = "All";
        colourBody.appendChild(temp);

        for(var i = 0; i < item.colours.length; i++) {
            
            var temp = document.createElement('div');
            temp.className = "colourSelect";
            
            if(item.colours[i] === "clear") {
                temp.innerText = "clear";
            } else {
                temp.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
                temp.style.backgroundColor = item.colours[i];
                temp.innerText = item.colours[i];

                if(item.colours[i] === "black") {
                    temp.style.color = "white";
                }
            }

            /* Add element to parent */
            colourBody.appendChild(temp);

        }
    } else {

        /* Add all and clear button */
        var temp = document.createElement('div');
        temp.className = "colourSelect";
        temp.innerText = "All";
        colourBody.appendChild(temp);

        temp = document.createElement('div');
        temp.className = "colourSelect";
        temp.innerText = "clear";
        colourBody.appendChild(temp);

        /* All every possible colour */
        var colours = ["black","white","red","green","blue","orange","yellow","grey","pink","brown","purple","gold"];
        
        for(var i = 0; i < colours.length; i++) {

            temp = document.createElement('div');
            temp.className = "colourSelect";
            temp.innerText = colours[i];
            temp.style.backgroundColor = colours[i];

            if(colours[i] === "black") {
                temp.style.color = "white";
            }

            /* Add element to parent */
            colourBody.appendChild(temp);

        }
    }

    /* Add elements to parent */
    body.appendChild(colourBody);

    /* Create Choose quantity heading */
    var quantityHeader = document.createElement('section');
    var quantityHeader2 = document.createElement('div');
    quantityHeader2.className = "smallHeader";
    quantityHeader2.innerText = "Choose quantity";

    quantityHeader.appendChild(quantityHeader2);
    body.appendChild(quantityHeader);

    /* Display available quantities */
    var quantityBody = document.createElement('section');
    var quantityBody2 = document.createElement('div');
    quantityBody2.className = "flexBox";

    for(var i = 1; i <= 5; i++) {
        
        var temp = document.createElement('div');
        temp.className = "numberSelect";
        temp.innerText = i;

        quantityBody2.appendChild(temp);

    }

    /* Create specify an amount textBox */
    temp = document.createElement('input');
    temp.type = "number";
    temp.className = "numberSelectInput";
    temp.placeholder = "Enter an amount:";

    quantityBody2.appendChild(temp);
    quantityBody.appendChild(quantityBody2);
    body.appendChild(quantityBody);

    /* Create notes textBox */
    var notes = document.createElement('section');
    notes.className = "spacing";
    var notes2 = document.createElement('input');
    notes2.className = "notesInput";
    notes2.type = "text";
    notes2.placeholder = "Notes:";

    notes.appendChild(notes2);
    body.appendChild(notes);

    notes = document.createElement('section');
    notes.className = "spacing";
    notes2 = document.createElement('input');
    notes2.className = "center button";
    notes2.type = "button";
    notes2.value = "Add item to list";
    notes2.style.backgroundColor = "green";

    notes.appendChild(notes2);
    body.appendChild(notes);

    container.appendChild(header);
    container.appendChild(body);

    document.getElementById("selectCase").appendChild(container);

}

// Helper Methods
function categoryExists(categoryName) {
    for(var i = 0; i < createdCategories.length; i++) {
        if(categoryName === createdCategories[i])
            return true;
    }
    return false;
}
function getCategory(categoryName) {
    return document.getElementById(categoryName);
}