// displays message in console when this file is loaded
document.addEventListener('DOMContentLoaded', 
() => {
    console.log('api.js loaded')
});

// holds our _________ (functions? methods?) for fetching our apis for projects/families
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

// fetch request

// These fetch requests are our GET requests
// Fetch returns a Promise: handles asynchronous operations without the need for a callback.
// To do something after the resource is fetched, you write it in a .then call:
// What we requested is hidden in body as a readable stream. We need to call an appropriate method to convert this readable stream into data we can consume.
// We know the response is JSON. We can call our function (parseJSON) (which is response.json) to convert the data.
// This was defined in index.js: const parseJSON = response => response.json()

// Need to write this out w/o arrow function for practice
