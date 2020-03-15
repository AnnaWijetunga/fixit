// Displays message in console when this file is loaded
document.addEventListener('DOMContentLoaded', 
() => {
    console.log('family.js loaded')
});

// Classes are special functions - there are class expressions and class declarations

// HOISTING
// An important difference between function declarations and class declarations is that function declarations are hoisted and class declarations are not
// You first need to declare your class and then access it
// Same goes for class expressions

// Example of Object Oriented JavaScript
// The Family class encapsulates all information/behaviors that represents a family
// this Family class holds our functions for families
class Family {
    static all = []

    // Special methods within a class

    // Arguments are passed in and then assigned to "this" - the instance we're creating
    // Special method for creating and initializing an object created with a class
    // Allows us to pass data to our new class
    constructor({name, members, id, projects}){
        // console.log("id within constructor: ", id)
        this.name = name
        this.members = members
        this.id = id
        this.projects = projects.map(project => new Project(project))

        // .push adds a new item to the end of an array and returns the new length
        Family.all.push(this)
    }

    // Standard method
    // Available to any instance of the Family class
    // Acts as a "behavior" of a class instance
    // .push adds a new item to the end of an array and returns the new length
    // Adds a new instance of a project to the projects array
    addProject(project){
        let p = new Project(project.name, project.condition, project.id)
        this.projects.push(p)
    }

    // Standard method
    // Available to any instance of the Family class
    // Acts as a "behavior" of a class instance
    // .sort sorts items in the array alphabetically by default
    // Sorts a family's project names alphabetically
    renderProjects() {
        let familySortedProjects = this.projects.sort((a,b)=>(a.name > b.name) ? 1 : -1)
        familySortedProjects.forEach(projectObj => {
            projectObj.render()
        })
    }

    // Static methods: class level methods - not callable on instanced of a class, only the class itself
    // i.e. Static methods are called without instantiating their class and cannot be called through a class instance. 
    // Used to create utility functions for an application - don't need to be made into instances
    // Because static methods are called directly on the classes themselves, static methods have no access to data stored in specific objects.
    // For static methods, this references the class. This means that you can call a static method from within another static method of the same class using this.
    // Loads family objects alongside their projects
    static loadFamily(familyObj) {
        const projects = familyObj.relationships.projects.data
        const id = familyObj.id 
        const { name, members } = familyObj.attributes
        return new Family({id, name, members, projects})
    }

    static postFamily(familyObj) {

        // Pulls the values for family names and members
        let formData = {
            "name": familyObj.name.value,
            "members": familyObj.members.value
        }

        // Sending data with fetch
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

        // Create a new family
        // Fetch families api using info from configObj (above)
        // After our fetch request, we need the steps that follow to happen in a specific order
        // To ensure that our order is maintained, we use .then calls for the following functions
        return fetch(Api.FAMILIES_URL, configObj)
        .then(response => response.json())
        .then(familyObj => {
            // The constructor method allows us pass arguments in when we use the new syntax
            // Now our instances are each carrying unique data
            let newFamilyObj = new Family({name: familyObj.name, members: familyObj.members, id: familyObj.id, projects: []})
            return newFamilyObj
        })
        .then(clearNewHouseForm) // clears user input for family name/members
        .then(clearFamilyDD) // clears drop-down menu of families
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

// Important to know but didn't necessarily use:

// The get keyword is used in classes for methods which serve the specific purpose of retrieving data from an instance.
// The get keyword turns a method into a 'pseudo-property', that is - it allows us to write a method that interacts like a property.
// Using get, an expensive process can be delayed - only run when we need it, distributing the workload more evenly.

// To change data, we have set.
// The set keyword allows us to write a method that interacts like a property being assigned a value. 
// By adding it in conjunction with a get, we can create a 'reassignable' pseudo-property.

// private properties
// this._firstName (syntax)

// sanitize (example)
// class Student {
//   constructor(firstName, lastName) {
//     this._firstName = this.sanitize(firstName);
//     this._lastName = this.sanitize(lastName);
//   }
// We are tasked with making sure names do not have any non-alphanumeric characters except for those that appear in names. 
// This is sometimes referred to as sanitizing text.

// removes any non alpha-numeric characters except dash and single quotes (apostrophes)
// sanitize(string) 
//     return string.replace(/[^A-Za-z0-9-']+/g, '');
//   }
// }

// super

// extends