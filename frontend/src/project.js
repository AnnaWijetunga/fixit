document.addEventListener('DOMContentLoaded', 
() => {
    console.log('project.js loaded')
});

class Project {
    static all = []

    constructor({name, condition='Incomplete', id, family_id}) {
        this.name = name
        this.condition = condition
        this.id = id
        this.familyId = family_id
        Project.all.push(this)
    }

    static loadProject(projObj){
        new Project({...projObj.attributes})
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
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        }
        // This function below returns an object that represents what the data source sent back.
        // It doesn't return the actual content.
        // We have to call the then() method on the object that comes back. 
        // .then() takes as its argument a function that receives the response as its argument.
        // Inside the function, we process what we need to, but at the end, we have to return the conttent that we've gotten out of the response.
        // The response has some basic functions on it for the most common data types - like .json() and .text().
        // This callback function is usually on one line, returning the conent from the reponse.
        // What we return from this function will be used in the next .then() function.
        return fetch(Api.PROJECTS_URL, configObj)
            // This function returns the content from the response.
            // We can use that content inside the callback function that's pass in to the NEXT .then() function.
            .then(response => response.json())
            // regular (not arrow) function format:
            // .then(function(response) {
            //     return response.json();
            // })
            // Use this (below) data inside of 'json' to do DOM manipulation
            .then((projectObj) => {
                // let family = ""
                // for(let chosenFamily in Family.all){
                //     if (chosenFamily.id == projectObj.family_id){     
                //         family = chosenFamily 
                //         console.log("family", family, "chosenFamily", chosenFamily)
                //     } 
                // }
                // debugger
                let family = Family.all.find(chosenFamily => projectObj.family_id == chosenFamily.id)
                let newObj = new Project(projectObj.name, projectObj.condition, projectObj.id)

                clearForm()
                
                family.projects.push(newObj)
                family.renderProjects() 
            })
        }

        render() {
            // Adding element to the DOM via innerHTML
            // Here, create an element, h2
            // Update h2's innerHTML property with a string of HTML, and it's just as if I'd cchanged the HTML source for that node
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
            
            // Using CSS attributes, updates the condition to incomplete & red or leaves conditon green
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


        deleteProjectHandler() {
            // Prevent browser from opening a new window once user submits
            event.preventDefault()
            fetch(`${Api.PROJECTS_URL}/${this.id}`,{
                method: 'DELETE'
            })
            .then(() => { 
                // .remove(), method chaining to remove our node from the DOM
                // Project.all is a way of updating the Project class so that the specific Project object is removed, and then .remove() removes the object from the DOM
                // !== is a way of deleting the projectt from Project.all. It rewrites that array to include all projects EXCEPT the one being deleted.
                document.getElementById(`${this.id}`).remove()
                Project.all = Project.all.filter(project => project.id !== this.id)
                // The filter() method creates a new Array with all elements that pass certain tests provided function.
                // Callback needs to be true or false.
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
            // Updates text to Incomplete, color red
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