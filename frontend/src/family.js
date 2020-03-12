document.addEventListener('DOMContentLoaded', 
() => {
    console.log('family.js loaded')
});


class Family {
    static all = []

    constructor({name, members, id, projects}){
        this.name = name
        this.members = members
        this.id = id
        // new
        this.projects = projects.map(project => new Project(project))

        Family.all.push(this)
    }

    addProject(project){
        let p = new Project(project.name, project.condition, project.id)
        
        this.projects.push(p)
    }

    renderProjects() {
        let familySortedProjects = this.projects.sort((a,b)=>(a.name > b.name) ? 1 : -1)
        familySortedProjects.forEach(projectObj => {
            projectObj.render()
        })
    }

    // new
    // loads family objects alongside their projects
    static loadFamily(familyObj) {
        const projects = familyObj.relationships.projects.data
        const id = familyObj.id 
        const { name, members } = familyObj.attributes
        return new Family({id, name, members, projects})
    }

    static postFamily(familyObj) {

        // pulls the values for family names and members
        let formData = {
            "name": familyObj.name.value,
            "members": familyObj.members.value
        }

        // sending data with fetch
        // 1) set the request method - which is POST here
        // 2) set the headers, for sending/receiving in json
        // 3) set a body that contains JSON content. Since JSON content is required, call JSON.stringify when you set the body
        let configObj = {
            method: "POST",
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }

        // fetch families api using info from configObj (above)
        // after our fetch request, we need the steps that follow to happen in a specific order
        // to ensure that our order is maintained, we use .then calls for the following functions
        // 
        return fetch(Api.FAMILIES_URL, configObj)
        .then(response => response.json())
        .then(familyObj => {
            let newFamilyObj = new Family(familyObj.name, familyObj.members, familyObj.id)
            return newFamilyObj
        })
        .then(clearNewHouseForm) // clears user input for family name/members
        .then(clearFamilyDD) // 
        .then(clearNewProject)
        .then(Family.renderDropDownOptions)
        .then(Family.renderFamilies)
    }

    static renderDropDownOptions(){
        Family.all.forEach(family => {
            let option = document.createElement('option')
            option.setAttribute('value', family.id)
            let house_name = document.createTextNode(family.name)
            option.appendChild(house_name)
            selectFamily.appendChild(option)
        })
    }

    static renderFamilies(){
        Family.all.forEach(family => {
            let option = document.createElement("option")
            option.value = family.id
            option.textContent = family.name
            select.appendChild(option)
        })
    }
}