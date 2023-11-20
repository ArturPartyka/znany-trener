// classes
// class FormManager {
//     listener = null;
//     form = null;
//     button = null;

//     constructor() {
//         this.form = document.querySelector('.userForm');
//         this.button = document.querySelector(".userElem_button");
//     }

//     applyListener(newListener, label = "Wyślij") {
//         if (this.listener && this.form) {
//             this.form.removeEventListener('submit', this.listener)
//         }

//         this.form.addEventListener('submit', newListener)
//         this.listener = newListener;
//         this.button.value = label;
//     }
// }

class FormManager{
    listener = null;
    form = null;
    button = null;

    constructor(){
        this.form = document.querySelector(".userForm")
        this.button = document.querySelector(".userElem_button")
        this.userElems = document.querySelectorAll(".userElem")
    }

    applyListener(newListener, label = "Wyślij") {
        if(this.form && this.listener){
            this.form.removeEventListener("submit", this.listener)
        }
        this.form.addEventListener("submit", newListener);
        this.listener = newListener;
        this.button.value = label;
    }

    editStyle(newBackground, newColor){
        this.userElems.forEach(function(elem){
            elem.style.background = newBackground;
            elem.style.color = newColor;
        })
    }
}
const form = new FormManager()


// state

const userList = [
    { 
        name: 'Artur',
        lastName: 'Partyka',
        company: 'PartyGym',
        place: 'Wroclaw',
        target: 'Dzieci',
        type: 'Grupowe'
    },
    { 
        name: 'Artur',
        lastName: 'Partyka',
        company: 'PartyGym1',
        place: 'Wroclaw',
        target: 'Dzieci',
        type: 'Grupowe'
    },
    { 
        name: 'Artur',
        lastName: 'Partyka',
        company: 'PartyGym2',
        place: 'Wroclaw',
        target: 'Dzieci',
        type: 'Grupowe'
    },
];

let selectedItemIndex = null;
let isFormEditMode = false;
let editMarkedUser = null;
let cancelButtonIsActive = false;
// const formManager = new FormManager();

// references
const userListElem = document.querySelector(".userList");

const submitFormButton = document.querySelector(".userElem_button");

const userForm = document.querySelector('.userForm');

const userListDiv = document.querySelector(".userListDiv");

const deleteButton = document.querySelector(".deleteButton")

const userSelect = document.querySelectorAll(".userSelect")

const userElem = document.querySelectorAll(".userElem");

const allUserElemInput = document.querySelectorAll(".userInput")

const allUserElemLabel = document.querySelectorAll(".userElemLabel");

const allUserSelect = document.querySelectorAll(".userSelect")

// functions

function clearForm(){
    document.querySelector(".userElem_firstName").value = "";
    document.querySelector(".userElem_lastName").value = "";
    document.querySelector(".userElem_company").value = "";
    document.querySelector(".userElem_place").value = "";
    document.querySelector(".userElem_target").value = "";
    document.querySelector(".userElem_type").value  = "";
}

function fillForm(user){
    document.querySelector(".userElem_firstName").value = user.name;
    document.querySelector(".userElem_lastName").value = user.lastName;
    document.querySelector(".userElem_place").value = user.place;
    document.querySelector(".userElem_company").value = user.company;
    document.querySelector(".userElem_target").value = user.target;
    document.querySelector(".userElem_type").value = user.type;

}

function addUser(event) {
    

    // wyciagnij dane
    const firstName  = event.target.querySelector(".userElem_firstName").value;  
    const lastName = event.target.querySelector(".userElem_lastName").value;
    const company = event.target.querySelector(".userElem_company").value;
    const place = event.target.querySelector(".userElem_place").value;
    const target = event.target.querySelector(".userElem_target").value;
    const type = event.target.querySelector(".userElem_type").value;
    
    
        if((firstName===""||lastName===""||company===""||place===""||target===""||type==="")){
            
            return alert("Uzupełnij wszytskie pola"); 
   }

    const newUser = {
        name: firstName,
        lastName: lastName,
        company: company,
        place: place,
        target: target,
        type: type
    };

    userList.push(newUser);


    // wyrenderuj list
    
    renderList();
    
    clearForm()

    userSelect.forEach((select)=>disabledOptionStyle(select))

    userSelectStyle(allUserSelect)
    // form.editStyle("#fff", "#7E7C7C")
}


function renderList() {
    // wyczysc liste
    userListElem.innerHTML = '';
    

    // przejdz po elementach listy i dodaj dla kazdego li element
    userList.forEach((user, index) => {
        // const newUserDiv = document.createElement("div");
        const newUserElem = document.createElement("li");
        const newUserName = document.createTextNode(`${user.name} ${user.lastName}`) 
        const newUserCompany = document.createTextNode(`${user.company}`)
        const newUserPlace = document.createTextNode(`Adres: ${user.place}`)
        const newUserTarget = document.createTextNode(`Grupa docelowa: ${user.target}`)
        const newUserType = document.createTextNode(`${user.type}`)

        const newUserAvatar = document.createElement("img");
        newUserAvatar.src = "../trainer-avatar.jpeg"
        newUserElem.appendChild(newUserAvatar)
        newUserAvatar.classList.add("newUserAvatar")

        const newUserNameDiv = document.createElement("div");
        newUserNameDiv.appendChild(newUserName)
        newUserElem.appendChild(newUserNameDiv)
        newUserNameDiv.classList.add("newUserNameDiv", "newUserInfo")

        const newUserCompanyDiv = document.createElement("div");
        newUserCompanyDiv.classList.add("newUserCompanyDiv", "newUserInfo")
        newUserCompanyDiv.appendChild(newUserCompany)
        newUserElem.appendChild(newUserCompanyDiv)

        const newUserPlaceDiv = document.createElement("div");
        newUserPlaceDiv.appendChild(newUserPlace)
        newUserElem.appendChild(newUserPlaceDiv)
        newUserPlaceDiv.classList.add("newUserPlaceDiv", "newUserInfo")
        
        
        const newUserTargetDiv = document.createElement("div");
        newUserTargetDiv.appendChild(newUserTarget)
        newUserElem.appendChild(newUserTargetDiv)
        newUserTargetDiv.classList.add("newUserTargetDiv", "newUserInfo")
        
        const newUserTypeDiv = document.createElement("div");
        newUserTypeDiv.appendChild(newUserType)
        newUserElem.appendChild(newUserTypeDiv)
        newUserTypeDiv.classList.add("newUserTypeDiv", "newUserInfo")

        userListElem?.appendChild(newUserElem)
        
        // newUserDiv.appendChild(newUserElem)
        // userListElem?.appendChild(newUserDiv)
        newUserElem.className = "userItem"

        const userEditButton = document.createElement("button");
        const userEditButtonText = document.createTextNode("Edytuj")
        userEditButton.appendChild(userEditButtonText);
        newUserElem.appendChild(userEditButton);
        userEditButton.classList.add( "userEditButton")
       
        addSelectListener(newUserElem, index)

        addEventButtonListener(userEditButton);
        
        
    });
    

}

function addSelectListener(userElem, index) {
        
        userElem.onclick = (event)=>{ 
            
            document.querySelectorAll(".userEditButton").forEach((button) =>{
                button.style.display = "none";
            })
            if(event.target.parentNode.lastElementChild.classList.contains("userEditButton")){
                event.target.parentNode.lastElementChild.style.display = "block"
            }else if(event.target.lastElementChild.classList.contains("userEditButton")){
                event.target.lastElementChild.style.display = "block"
            }
            
            console.log(event.target.lastElementChild);
           
            const target = event.target.getBoundingClientRect()
            deleteButton.style.left = `${target.left-15}px`
            deleteButton.style.top = `${target.top}px`
            deleteButton.style.display = "block";
            
            selectedItemIndex = index;
        };
}


function addEventButtonListener(editButton) {

        editButton.addEventListener("click", function changeValue(event){ 
        event.stopPropagation();
        
        const markedUser = userList[selectedItemIndex];
        
        
        fillForm(markedUser)
        
        turnOnEditMode(markedUser)
        
        turnOnEditUserCancelButton()
        })
    }

    
function turnOnEditMode(markedUser) {
   editMarkedUser = function(){
        markedUser.name = document.querySelector(".userElem_firstName").value
        markedUser.lastName = document.querySelector(".userElem_lastName").value
        markedUser.company = document.querySelector(".userElem_company").value
        markedUser.place = document.querySelector(".userElem_place").value
        markedUser.target = document.querySelector(".userElem_target").value 
        markedUser.type = document.querySelector(".userElem_type").value
        
        renderList()
        
        clearForm();
        cancelButtonIsActive = false;
        
        document.querySelector(".cancelButton")?.remove();
        
        form.applyListener(addUserEvent, "Wyślij");

        form.editStyle("#ffffff", "#999");

        
}
            
    if (!isFormEditMode) {
        
        form.applyListener(editMarkedUser, "Edytuj");
        
        form.editStyle("rgb(210,227,252)", "#000")
    }

};


function addUserEvent(event){
    event.preventDefault();
    addUser(event);
}

function turnOnEditUserCancelButton(){
        if(cancelButtonIsActive){
            document.querySelector(".cancelButton").remove();
        }

        const cancelEditButton = document.createElement("button");
        const cancelEditButtonText = document.createTextNode("Anuluj Edycję")
        cancelEditButton.appendChild(cancelEditButtonText);
        userForm.appendChild(cancelEditButton);
        cancelEditButton.classList.add("cancelButton", "formButton")
        cancelButtonIsActive = true;

        addEventToCancelButton(cancelEditButton)
        
    
        
}

function addEventToCancelButton(button){
    button.addEventListener("click", function stopEdit(event){
        event.stopPropagation()

        clearForm();

        form.applyListener(addUserEvent, "Wyślij");
        form.editStyle("#ffffff", "#999");

        cancelButtonIsActive = false;
        button.remove()
    })
    
}
    
// main (executed only once when file is fetched by browser)

renderList();

userForm?.addEventListener('submit', addUserEvent);
form.applyListener(addUserEvent, "Wyślij")

deleteButton.onclick = () => {
    console.log(`Deleting user with id ${selectedItemIndex}`);

    if (selectedItemIndex || selectedItemIndex === 0) {
    // if (selectedItemIndex !== undefined && selectedItemIndex !== null) {
        userList.splice(selectedItemIndex, 1);
    }
    deleteButton.style.display = "none";
    selectedItemIndex = null;
    renderList();
}


labelOnTop(allUserElemInput)
userSelectStyle(allUserSelect)

// style

function disabledOptionStyle(elem){
    // elem.style.color = "#999" 
    elem.style.background = "#ffffff"
    if(!(elem.value === "")){
        // elem.style.color = "#000000" 
        elem.style.background = "rgb(210,227,252)"
    }
    
}

function labelOnTop(userElem){
    let UserElemLabel = null
    let innerPlaceholder = ""
    userElem.forEach((function(input){
        input.addEventListener("focus", function(){
           for(let userElemLabel of allUserElemLabel){
            if(userElemLabel.htmlFor == input.name){
                userElemLabel.style.display = "flex"
                UserElemLabel = userElemLabel
                innerPlaceholder = input.placeholder
            }}
            input.placeholder = ""
            input.style.background = "rgb(210,227,252)"
        })

    userElem.forEach(function(input){
        input.addEventListener("blur",function(){
            UserElemLabel.style.display = "none"
            input.placeholder = innerPlaceholder
            input.style.background = "#fff"

        })
    })
    }))
}


function userSelectStyle(allSelect){
    allSelect.forEach(select=>{
        select.style.color = "#999"
        select.addEventListener("change", function(){
            if(select.value != ''){
                select.style.color = "#000"
            }
            
        })
        
    })
}





// export EDITOR=nano
