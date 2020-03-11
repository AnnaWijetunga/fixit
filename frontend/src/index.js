document.addEventListener('DOMContentLoaded', 
() => {
    console.log('index.js loaded')
});

const parseJSON = response => response.json()

const selectForm = document.querySelector('.family-selector') // check, same as line 9
const familySelectionPopUp = document.querySelector('.family-selector') // check, same as line 8
const selectFamily = document.getElementById('family-select') 
const selectFamilyBtn = document.getElementById('all-family-options') // changed from house

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

selectFamilyBtn.addEventListener('click', () => {
    selectHouse = !selectHouse
    if(selectHouse) {
        selectFamilyBtn.textContent = 'Close'
        selectForm.style.display = 'block'
        selectForm.addEventListener('submit', e => {
            e.preventDefault()
            let familyId = e.target.querySelector('#family-select').value
            
            let chosenFamily = Family.all.find(chosenFamily => familyId == chosenFamily.id)
            clearProjectDivs()
            
            chosenFamily.renderProjects() // issue here
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
        addBtn.textContent = 'Close'
        projectForm.style.display = 'block'
    } else {
        addBtn.textContent = "Add a New Project!"
        projectForm.style.display = 'none'
    }
})

document.addEventListener("DOMContentLoaded", () => {
    Api.fetchFamilies().then(families => {
        Family.all.forEach(family => { 
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



