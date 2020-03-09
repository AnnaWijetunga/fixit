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

        render() {
            let h2 = document.createElement('h2')
            h2.innerHTML = `<strong>${this.name}</strong>`

            
            let h3 = document.createElement('h3')
            h3.innerHTML = '<em>Status: </em>'
            let p = document.createElement('p')
            p.setAttribute('class', 'project-status')
            p.innerHTML = `${this.status}`

            let completeBtn = document.createElement('button')
            completeBtn.setAttribute('class', 'complete-btn')
            completeBtn.innerText = 'Complete!'
            completeBtn.addEventListener('click', event => this.completeProjectHandler(event, this))
            
            let resetBtn = document.createElement('button')
            resetBtn.setAttribute('class', 'reset-project-button')
            resetBtn.innerText = 'Reset'

            resetBtn.addEventListener('click', event => this.resetHandler(event, this))
            
            if (p.innerHTML === 'Incomplete'){
                p.style.color = 'red'
                resetBtn.style.display = 'none'
            } else {
                p.style.color = 'green'
                completeBtn.style.display = 'none'
            }

            let deleteBtn = document.createElement('button')
            deleteBtn.setAttribute('class', 'delete-project-btn')
            deleteBtn.innerText = 'Delete'
            deleteBtn.addEventListener('click', event => this.deleteProjectHandler(event, this))

            let divCard = document.createElement('div')
            divCard.setAttribute('class', 'card')
            divCard.setAttribute('id', `${this.id}`)
            divCard.append(h2, h3, p, completeBtn, resetBtn, deleteBtn)
            projectCollection.append(divCard)
        }




}