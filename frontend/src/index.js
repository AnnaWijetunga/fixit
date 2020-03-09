document.addEventListener('DOMContentLoaded', 
() => {
    console.log('index.js loaded')
});

const parseJSON = response => response.json()
const addBtn = document.getElementById('new-project-btn')
const projectForm = document.querySelector('.container')
const projectCollection = document.querySelector("#project-collection")
const familyProjectsBelongTo = document.getElementById('family-project-list')
const housePopUp = document.getElementById('house-pop-up')
const addFamilyBtn = document.getElementById('add-new-family')
const selectFamilyBtn = document.getElementById('all-family-options')
const familySelectionPopUp = document.querySelector('.family-selector')
const selectFamily = document.getElementById('family-select') 
const selectForm = document.querySelector('.family-selector')
const select = document.querySelector("#select")
let addProject = false 
let addFamily = false
let selectHouse = false

// api moved to api.js
// project model - moved to project.js
// family model - moved to family.js

function clearFamilyDD(){
    document.querySelector("#family-select").innerHTML = ""
}

function clearForm() {
    document.querySelector(".input-text").value = ""
}

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

addFamilyBtn.addEventListener('click', () => {
    addFamily = !addFamily
    if (addFamily){
        addFamilyBtn.textContent = "Close"
        housePopUp.style.display = 'block'
        housePopUp.addEventListener('submit', e => {
            e.preventDefault()
            Family.postFamily(e.target)
       })
    } else {
        addFamilyBtn.textContent = "Add a New Family"
        housePopUp.style.display = 'none'
    }
})

// not working - need to understand why not
selectFamilyBtn.addEventListener('click', () => {
    selectHouse = !selectHouse
    if(selectHouse) {
        selectFamilyBtn.textContent= 'Close'
        selectForm.style.display = 'block'
        selectForm.addEventListener('submit', e => {
            e.preventDefault()
            let familyId = e.target.querySelector('#family-select').value
            
            let chosenFamily = Family.all.find(chosenFamily => familyId == chosenFamily.id)
            clearProjectDivs()
            
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
    // hide and seek feature with add new project form
    addProject = !addProject
    if (addProject) {
        addBtn.textContent = 'Close'
        projectForm.style.display = 'block'
        
    } else {
        addBtn.textContent = "Add a New Project!"
        projectForm.style.display = 'none'
    }
})

document.addEventListener("DOMContentLoaded", () => {
    Api.fetchFamilies().then(families => {
        families.forEach(family => {
            let f = new Family(family.name, family.members, family.id)
            family.projects.forEach(project => {
            f.addProject(project)
            })
        })
    Family.renderFamilies()
    Family.renderDropDownOptions()
    })
    addBtn.textContent = 'Add a New Project'
    addFamilyBtn.textContent = "Add a New Family"
    selectFamilyBtn.textContent = 'Select Your Family'
})



