// The DOMContentLoaded event is the browser's built-in way to indicate when a page is loaded.
// We need to make sure to wait until after the DOMContentLoaded event is triggered to safely execute our code. 
// By creating an event listener, we can keep our code from immediately firing when index.js is loaded.
// Displays message in console when this file is loaded
document.addEventListener("DOMContentLoaded", function() {
    console.log('family.js loaded');
});

// Arrow function
// document.addEventListener('DOMContentLoaded', 
// () => {
//     console.log('family.js loaded')
// });

// Classes are special functions - there are class expressions and class declarations

// Example of Object Oriented JavaScript
// The Family class encapsulates all information/behaviors that represents a family
// this Family class holds our functions for families

class Family {
    static all = []

    // Special methods within a class

    // Arguments are passed in and then assigned to "this" - the instance we're creating
    // Special method for creating and initializing an object created with a class
    // Allows us to pass data to our new class
    constructor({name, members, id}){
        this.name = name
        this.members = members
        this.id = id

        // .push adds a new item to the end of an array and returns the new length
        Family.all.push(this)
    }

    projects(){
        return Project.all.filter(project => project.familyId == this.id)
    }

    // Available to any instance of the Family class
    // Acts as a "behavior" of a class instance
    // .push adds a new item to the end of an array and returns the new length
    // Adds a new instance of a project to the projects array
    addProject(project){
        let p = new Project(project.name, project.condition, project.id)
        this.projects.push(p)
    }

    renderProjects() {
        clearProjectDivs()
        // console.log(this.projects());
        this.projects().map(project => {
            // console.log(project)
            project.render()
        })
    }

    // Static methods: class level methods - not callable on instanced of a class, only the class itself
    // i.e. Static methods are called without instantiating their class and cannot be called through a class instance. 
    // Used to create utility functions for an application - don't need to be made into instances
    // Because static methods are called directly on the classes themselves, static methods have no access to data stored in specific objects.
    // For static methods, this references the class. This means that you can call a static method from within another static method of the same class using this.
    // Loads family objects alongside their projects
    static loadFamily(familyObj) {
        const id = familyObj.id 
        const { name, members } = familyObj.attributes
        return new Family({id, name, members})
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

        // configurationObject has 3 core components:
        // 1) HTTP Verb - default is GET, so we need to state method: POST
        // 2) Headers - metadata about the actual data we want to send;headers are sent just ahead of the actual data payload of our POST request. They contain information about the data being sent.
        // "Content-Type" is used to indicate what format the data being sent is in.
        // Just like "Content-Type" tells the destination server what type of data we're sending, it is also good practice to tell the server what data format we accept in return.
        // To do this, we add a second header, "Accept", and assign it to "application/json"
        // 3) Last, add the data. Data being sent in fetch() must be stored in the body of the configurationObject.
        // Note: when data is exchanged between a client (your browser, for instance), and a server, the data is sent as TEXT. Whatever data we're assigning to the body of our request needs to be a STRING.
        let configObj = {
            method: "POST",
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        }

        // Create a new family
        // Fetch families api using info from configObj (above)
        // After our fetch request, we need the steps that follow to happen in a specific order
        // To ensure that our order is maintained, we use .then calls for the following functions

        // Sending a POST request with fetch() takes a string - the destination URL - as the first argument and an object (configuration Object) as the second argument.
        // This Object can be given certain properties with certain values in order to change fetch()'s default behavior.
        return fetch(Api.FAMILIES_URL, configObj)
        // .then is passed a callback function that taks in response as an argumennt
        // This is a response object, representing what the destination server sent back to us. This object has a built-in method, json(), that converts the body of the response from JSON to a JavaScript object.
        // The results of json() is returned and made available in the second then()
        .then(response => response.json())
        .then(familyObj => {
            // The constructor method allows us pass arguments in when we use the new syntax
            // Now our instances are each carrying unique data
            // console.log(familyObj)
            let newFamilyObj = new Family({name: familyObj.name, members: familyObj.members, id: familyObj.id})
            return newFamilyObj
        })
        .then(clearNewHouseForm) // clears user input for family name/members
        .then(clearFamilyDD) // clears drop-down menu of families
        .then(clearNewProject) // clears project 
        .then(Family.renderDropDownOptions) // show family names from dropdown menu
        .then(Family.renderFamilies) // show all families
    }

    // sets attribute of family
    static renderDropDownOptions(){
        Family.all.forEach(family => {
            let option = document.createElement('option')
            option.setAttribute('value', family.id)
            let house_name = document.createTextNode(family.name)
            // To get an element to appear in the DOM, we have to append it to an existing DOM node (appendChild)
            // Here, we append the house_name (which is the last name of a family)
            option.appendChild(house_name)
            selectFamily.appendChild(option)
        })
    }

    // sets value of family
    static renderFamilies(){
        // Iterating over all families - change the content (textContent) of "option" to equal the family name
        // Append or add that "option" / family name to the existing node
        Family.all.forEach(family => {
            let option = document.createElement("option")
            option.value = family.id
            // .textContent
            // textContent gets the content of all elements, including <script> and <style> elements. In contrast, innerText only shows “human-readable” elements.
            // textContent returns every element in the node. In contrast, innerText is aware of styling and won’t return the text of “hidden” elements.
            // Element.innerHTML returns HTML, as its name indicates. Sometimes people use innerHTML to retrieve or write text inside an element, but textContent has better performance because its value is not parsed as HTML.
            option.textContent = family.name
            select.appendChild(option)
        })
    }
}

// HOISTING
// An important difference between function declarations and class declarations is that function declarations are hoisted and class declarations are not
// You first need to declare your class and then access it
// Same goes for class expressions


// Important to know:

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