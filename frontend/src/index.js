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
// versus:
// const baseUrl = 'http://localhost:3000'
// function beginFetch() {
//   fetch(PROJECTS_URL)
//   .then(resp => resp.json())
//   .then(obj => addProjectToDom(obj));
// }


// project model - move to chore.js eventually

document.addEventListener('DOMContentLoaded', 
() => {
    console.log('project.js loaded')
});

class Project {
    static all = []

    constructor(name, condition='Incomplete', id) {
        this.name = name
        this.condition = condition
        this.id = id
        Project.all.push(this)
    }

    static postProject(projectData) {

        let formData = {
            "name": projectData.name.value,
            "condition": projectData.status = "Incomplete",
            'family_id': familyData.querySelector('select').value
        }

        let configObj = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }
        return fetch(Api.PROJECTS_URL, configObj)
            .then(response => response.json())
            .then((projectObj) => {
                let family = Family.all.find(chosenFamily => projectObj.family_id == chosenFamily.id)
                let newObj = new Project(projectObj.name, projectObj.status, projectObj.id)
                family.projects.push(newObj)
                clearProjectDivs()
                family.renderProjects()
                clearForm() 
            })
        }





}