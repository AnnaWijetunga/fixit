// Displays message in console when this file is loaded
document.addEventListener('DOMContentLoaded', 
() => {
    console.log('api.js loaded')
});

// Object Oriented JavaScript
// Class
// Class Api to encapsulate all information/behaviors that represents the apis
// This Api class holds our functions for fetching our project and family apis
class Api {
    // static baseUrl = 'http://localhost:3000'
    
    // new routes specifically for Heroku
    static baseUrl = 'https://my-fixit-api.herokuapp.com/'
    static PROJECTS_URL = `${Api.baseUrl}/projects`
    static FAMILIES_URL = `${Api.baseUrl}/families`

    // Fetch request is our GET request for our projects
    // Promises exist to make the asynchronous requests more managable.
    // Fetch returns a Promise: handles asynchronous operations without the need for a callback.
    // A promise can be in one of three states: pending, fulfilled or rejected.
    // Which represents the status of an asynchronous request.
    // To do something after the resource is fetched, you write it in a .then call
    // What we requested is hidden in body as a readable stream. We need to call an appropriate method to convert this readable stream into data we can consume.
    // We know the response is JSON. We can call our function (parseJSON) (which is response.json) to convert the data.
    // This was defined in index.js: const parseJSON = response => response.json()
    static fetchProjects() {
        return fetch(Api.baseUrl + '/projects')
            .then(parseJSON)
    }
    
    // Fetch request is our GET request for our families
    static fetchFamilies(){
        return fetch(Api.baseUrl + '/families')
            .then(parseJSON)
    }
}
