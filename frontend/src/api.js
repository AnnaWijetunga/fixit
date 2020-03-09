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

// const baseUrl = 'http://localhost:3000'
// function beginFetch() {
//   fetch(PROJECTS_URL)
//   .then(resp => resp.json())
//   .then(obj => addProjectToDom(obj));
// }