document.addEventListener('DOMContentLoaded', 
() => {
    console.log('index.js loaded')
});

// Global scope variables - selecting elements from our HTML to use later in our functions

// We know the response from our fetch requests will be in JSON. We can call our const parseJSON to convert the data. Used in our api.js file.
const parseJSON = response => response.json()

// Starting from the document (the object we've called querySelector() on), find a family-selector class
const selectForm = document.querySelector('.family-selector') 
const familySelectionPopUp = document.querySelector('.family-selector')
const selectFamily = document.getElementById('family-select') 
const selectFamilyBtn = document.getElementById('all-family-options') 

const projectForm = document.querySelector('.container')
const select = document.querySelector("#select")
const addBtn = document.getElementById('new-project-btn')

const housePopUp = document.getElementById('house-pop-up')
const addFamilyBtn = document.getElementById('add-new-family')
const projectCollection = document.querySelector("#project-collection")
const familyProjectsBelongTo = document.getElementById('family-project-list')

let addProject = false 
let addFamily = false
let selectHouse = false // has to be house vs family - we already used selectFamily

// clears the drop-down menu after selecting a family
function clearFamilyDD(){
    document.querySelector("#family-select").innerHTML = ""
}

// clear project name once user submits
function clearForm() {
    document.querySelector(".input-text").value = ""
}

// clears form once a new family (last name, first name(s)) has been submitted 
function clearNewHouseForm() {
    document.querySelector('.family-input-text').value = ""
    document.querySelector('.family-members-input-text').value  = ""
}

function clearProjectDivs(){
    projectCollection.innerHTML = ""
}

function clearNewProject() {
    document.querySelector("#select").innerHTML = ""  
}

// Two arguments for an event listener
// 1) The event name to listen for, here 'click'
// 2) The callback function - the work executed when the node "hears" the event
// Adding a new family 
// If a new family is added, the button text changes to "Close"
// User can submit their new family and housePopUp will be "listening"
addFamilyBtn.addEventListener('click', () => {
    addFamily = !addFamily
    if (addFamily){
        addFamilyBtn.textContent = "Close"
        housePopUp.style.display = 'block'
        housePopUp.addEventListener('submit', e => {
            // By default, Form elements automatically submit the form, which redirects the browser to a new url. 
            // We want to update the DOM using JavaScript - invoke the preventDefault() method
            e.preventDefault()
            Family.postFamily(e.target)
       })
    } else {
        addFamilyBtn.textContent = "Add a New Family"
        housePopUp.style.display = 'none'
    }
})

selectFamilyBtn.addEventListener('click', () => {
    selectHouse = !selectHouse
    if(selectHouse) {
        selectFamilyBtn.textContent = 'Close'
        selectForm.style.display = 'block'
        selectForm.addEventListener('submit', e => {
            e.preventDefault()
            let familyId = e.target.querySelector('#family-select').value
            
            let chosenFamily = Family.all.find(chosenFamily => familyId == chosenFamily.id)
            
            
            chosenFamily.renderProjects()
        })
    } else {
        selectFamilyBtn.textContent = "Select Your Family"
        selectForm.style.display = 'none'
    }
})

projectForm.addEventListener('submit', e => {
    e.preventDefault()
    Project.postProject(e.target)
})

addBtn.addEventListener('click', () => {
    // hide and seek - add new project form
    addProject = !addProject
    if (addProject) {
        // Updates button text to Close
        addBtn.textContent = 'Close'
        projectForm.style.display = 'block'
    } else {
        // Updates button text to Add a New Project
        addBtn.textContent = "Add a New Project"
        projectForm.style.display = 'none'
    }
})

document.addEventListener("DOMContentLoaded", () => {
    Api.fetchProjects()
    .then(respObj => {
        respObj.data.forEach(projObj =>{
            Project.loadProject(projObj)
        })
    })
    .then(Api.fetchFamilies)
    .then(respObj => {
        respObj.data.forEach(family => { 
            Family.loadFamily(family)
        })
    })
    .then(() => {
        Family.renderFamilies()
        Family.renderDropDownOptions()
    }) 
    addBtn.textContent = 'Add a New Project'
    addFamilyBtn.textContent = "Add a New Family"
    selectFamilyBtn.textContent = 'Select Your Family'
})