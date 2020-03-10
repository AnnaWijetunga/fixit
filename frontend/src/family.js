document.addEventListener('DOMContentLoaded', 
() => {
    console.log('family.js loaded')
});


class Family {
    static all = []

    constructor(name, members, id){
        this.name = name
        this.members = members
        this.id = id
        this.projects = []

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

    static postFamily(familyObj) {

        let formData = {
            "name": familyObj.name.value,
            "members": familyObj.members.value
        }

        let configObj = {
            method: "POST",
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }

        return fetch(Api.FAMILIES_URL, configObj)
        .then(response => response.json())
        .then(familyObj => {
            let newFamilyObj = new Family(familyObj.name, familyObj.members, familyObj.id)
            return newFamilyObj
        })
        .then(clearNewHouseForm) // check
        .then(clearFamilyDD)
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