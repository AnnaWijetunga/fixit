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
            "condition": projectData.condition = "Incomplete",
            'family_id': projectData.querySelector('select').value
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
                let newObj = new Project(projectObj.name, projectObj.condition, projectObj.id)
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
            h3.innerHTML = '<em>Condition: </em>'
            let p = document.createElement('p')
            p.setAttribute('class', 'project-condition')
            p.innerHTML = `${this.condition}`

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

        static renderProjects(projects) {

            projects.forEach(projectObj => {
                let newObj = new Project(projectObj.name, projectObj.condition, projectObj.id)
                newObj.render()
            })
        }

        deleteProjectHandler() {
            event.preventDefault()
            fetch(`${Api.PROJECTS_URL}/${this.id}`,{
                method: 'DELETE'
            })
            .then(() => { 
                document.getElementById(`${this.id}`).remove()
                Project.all = Project.all.filter(project => project.id !== this.id)
            })
        }

        completeProjectHandler() {
            let cardIns = event.target.parentNode
            cardIns.querySelector('.reset-project-button').style.display = 'block'
            event.preventDefault()
        
            let toggleResetBtn = event.target.style.display = 'none'
        
            let conditionUpdate = event.target.previousElementSibling
            conditionUpdate.innerHTML = `Completed!`
            conditionUpdate.style.color = 'green'
        
            fetch(`${Api.PROJECTS_URL}/${this.id}`, {
                method: "PATCH",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'condition': conditionUpdate.textContent
                })
            })
            .then(parseJSON)
            .then(newCondition => {
                conditionUpdate
            })
        }

        resetHandler() {
            let resetCondition = event.target.previousElementSibling.previousElementSibling
            resetCondition.innerHTML = 'Incomplete'
            resetCondition.style.color = 'red'
        
            let toggleCompleteBtn = event.target.previousElementSibling
            toggleCompleteBtn.style.display = 'block'
        
            let toggleResetBtn = event.target.style.display = 'none'
            event.preventDefault()
        
            fetch(`${Api.PROJECTS_URL}/${this.id}`, {
                method: "PATCH",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'condition': resetCondition.textContent
                })
            })
            .then(parseJSON)
            .then(newCondition => {
                resetCondition
            })    
        }
}