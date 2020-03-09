// global
const parseJSON = response => response.json()
const addBtn = document.getElementById('new-project-btn')
const projectForm = document.querySelector('.container')
const projectCollection = document.querySelector("#project-collection")
const familyProjectsBelongTo = document.getElementById('family-project-list')
const familyPopUp = document.getElementById('family-pop-up')
const addFamilyBtn = document.getElementById('add-new-family')
const selectFamilyBtn = document.getElementById('all-family-options')
const familySelectionPopUp = document.querySelector('.family-selector')
const selectFamily = document.getElementById('family-select') 
const selectForm = document.querySelector('.family-selector')
const select = document.querySelector("#select")
let addChore = false 
let addHouseHold = false
let selectHouse = false

// api
class Api {
    static baseUrl = 'http://localhost:3000'
    static PROJECTS_URL = `${Api.baseUrl}/projects`
    static FAMILIES_URL = `${Api.baseUrl}/families`

    static fetchProjects() {
        return fetch(Api.baseUrl + '/projects')
            .then(parseJSON)
    }
    
    static fetchFamilies(){
        return fetch(Api.baseUrl + '/families')
            .then(parseJSON)
    }
}

