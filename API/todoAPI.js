import React from 'react'

const API_URL = 'http://192.168.1.18:4000' //Rentrer l'ip du Métro

const SIGN_IN =
  'mutation($username:String!, $password:String!){signIn(username:$username, password:$password)}'

const SIGN_UP_CHEF =
  'mutation($username:String!, $password:String!, $manager:String!){signUpProjectChef(username:$username, password:$password, conect:$manager)}'

const SIGN_UP_MANAGER =
  'mutation($username:String!, $password:String!){signUpManager(username:$username, password:$password)}'

const MANAGER_LIST = 
  'query{managers{id username}}'

const CHEF_LIST = 
  'query managers($username: String!){managers(where:{username: $username}){projectChefs{username}}}'

const GET_MY_MANAGER = 
  'query projectChefs($username: String!){projectChefs(where:{username: $username}){manager{username}}}'

const PROJECT =
  'query projects($username: [String]!) {projects(where: { owner: { username_IN: $username } }) {id title date description status projectStepDone owner{username}}}'

const TASKS =
  'query($id: ID!){ tasks(where: {belongsTo: {id: $id}}) {id content done},projects(where: {id: $id}) {id title date status projectStepDone description owner{username}}}' // <-

const TASK = 
  'query task($id: ID!){tasks(where:{id: $id}){id content description done}}'

const UPDATEMANAGER = 
  'mutation($username: String!, $exManager: String!, $newManager: String!){updateProjectChefs(where:{username:$username},update:{manager:{connect:{where:{username:$newManager}},disconnect:{where:{username:$exManager}}}}){projectChefs{username manager{username}}}}'

const CREATEPROJECT = 
  `mutation($title:String!,$date:Date!,$description:String!,$owner:String!){
  	createProjects(input:{title:$title, date:$date, description:$description, status:"Initialisation", owner:{connect:{where:{username:$owner}}}}) {projects{id title date description status owner {username}}},
    task1: createTasks(input:{content:"Réunion d'équipe",belongsTo:{connect:{where:{title:$title}}}}){tasks{id content done belongsTo{owner{username}}}},
	  task2: createTasks(input:{content:"Allocation budget",belongsTo:{connect:{where:{title:$title}}}}){tasks{id content done belongsTo{owner{username}}}},
	  task3: createTasks(input:{content:"Feuille de route du projet",belongsTo:{connect:{where:{title:$title}}}}){tasks{id content done belongsTo{owner{username}}}},
	  task4: createTasks(input:{content:"Maquette projet",belongsTo:{connect:{where:{title:$title}}}}){tasks{id content done belongsTo{owner{username}}}},
	  task5: createTasks(input:{content:"Présentation devant comité",belongsTo:{connect:{where:{title:$title}}}}){tasks{id content done belongsTo{owner{username}}}}
  }`

const CREATETASK = 
  'mutation($content:String!,$id:ID!,$description:String){createTasks(input:{content:$content,description:$description,belongsTo:{connect:{where:{id:$id}}}}){tasks{id content done belongsTo{owner{username}}}}}'

const UPDATETASK =
  'mutation($id:ID!,$newContent:String!,$newDescription:String){updateTasks(where:{id:$id} update:{content:$newContent,description:$newDescription,}){tasks{content description id}}}'

const UPDATEPROJECT =
  'mutation($id:ID!,$newTitle:String!,$newDate:Date!,$newDescription:String!){updateProjects(where: {id: $id} update:{title: $newTitle, date: $newDate, description:$newDescription}){projects {id date title description status owner{username} projectStepDone}}}'

const UPDATESTATUSTASK = 
  'mutation ($id:ID!,$done:Boolean!) {updateTasks(where:{id:$id}update:{done:$done}){tasks {id content done}}}'
  
const CLOSEPROJECT = 
  'mutation($id:ID!){updateProjects(where: {id:$id}, update:{status:"Fermé"}){projects{id date title description status owner{username} projectStepDone}}}'

const DELETEPROJECT =
  'mutation($id:ID!){deleteTasks(where:{belongsTo:{id:$id}}){nodesDeleted},deleteProjects(where: {id: $id}){nodesDeleted}}'

const GETPROJECTSTEPDONE =
  'query projects($username: [String]!) {projects(where: { owner: { username_IN: $username }, projectStepDone: true}) {id title date status owner{username}}}'

const UPDATEPROJECTSTEPDONE =
  'mutation($id:ID!){updateProjects(where: {id: $id},update:{projectStepDone:true}){projects{projectStepDone}}}'

const REJECTPROJECTSTEPDONE =
  `mutation($id:ID!,$commentaire: String!){
    updateProjects(where: {id: $id},update:{projectStepDone:false}){projects {id date title description status owner{username} projectStepDone}},
    createTasks(input:{content:"Refus Manager",description:$commentaire,belongsTo:{connect:{where:{id:$id}}}}){tasks{id content done belongsTo{owner{username}}}}}`

const DEVELOPMENTSTEP = 
  `mutation($id: ID!){
    updateProjects(where: {id: $id},update:{projectStepDone:false, status:"Developpement"}){projects {id date title description status owner{username} projectStepDone}},
    task1: createTasks(input:{content:"Réunion d'équipe",belongsTo:{connect:{where:{id:$id}}}}){tasks{id content done belongsTo{owner{username}}}},
    task2: createTasks(input:{content:"Répartition des tâches",belongsTo:{connect:{where:{id:$id}}}}){tasks{id content done belongsTo{owner{username}}}},
    task3: createTasks(input:{content:"Réunion d'avancement",belongsTo:{connect:{where:{id:$id}}}}){tasks{id content done belongsTo{owner{username}}}},
    task4: createTasks(input:{content:"Démonstration",belongsTo:{connect:{where:{id:$id}}}}){tasks{id content done belongsTo{owner{username}}}}
  }`
const PRODUCTIONSTEP =
  `mutation($id: ID!){
    updateProjects(where: {id: $id},update:{projectStepDone:false, status:"Mise en production"}){projects {id date title description status owner{username} projectStepDone}},
    task1: createTasks(input:{content:"Mise en production",belongsTo:{connect:{where:{id:$id}}}}){tasks{id content done belongsTo{owner{username}}}},
    task2: createTasks(input:{content:"Retour utilisateur",belongsTo:{connect:{where:{id:$id}}}}){tasks{id content done belongsTo{owner{username}}}},
    task3: createTasks(input:{content:"Réunion d'équipe",belongsTo:{connect:{where:{id:$id}}}}){tasks{id content done belongsTo{owner{username}}}},
    task5: createTasks(input:{content:"Correction de bugs",belongsTo:{connect:{where:{id:$id}}}}){tasks{id content done belongsTo{owner{username}}}},
    task4: createTasks(input:{content:"Bilan de déroulement du projet",belongsTo:{connect:{where:{id:$id}}}}){tasks{id content done belongsTo{owner{username}}}}
  }`
const FINISHEDSTEP =
  'mutation($id:ID!){updateProjects(where: {id: $id},update:{projectStepDone:false, status:"Terminé"}){projects {id date title description status owner{username} projectStepDone}}}'

const DELTASK =
  "mutation($id:ID!){deleteTasks(where: {id: $id}){nodesDeleted relationshipsDeleted}}"

export function signIn (username, password) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: SIGN_IN,
      variables: {
        username: username,
        password: password
      }
    })
  })
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0]
      }
      return jsonResponse.data.signIn
    })
    .catch(error => {
      throw error
    })
}

export function getManager () {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: MANAGER_LIST,
    })
  })
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0]
      }
      return jsonResponse.data.managers
    })
    .catch(error => {
      throw error
    })
}

export function getMyManager (username) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: GET_MY_MANAGER,
      variables: {
        username: username
      }
    })
  })
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0]
      }
      return jsonResponse.data.projectChefs[0].manager.username
    })
    .catch(error => {
      throw error
    })
}

export function getProjectStepDone (username) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: GETPROJECTSTEPDONE,
      variables: {
        username: username
      }
    })
  })
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0]
      }
      return jsonResponse.data.projects
    })
    .catch(error => {
      throw error
    })
}

export function signUp (hierarchy, username, password,manager) {
  if(hierarchy === "Manager"){
    return fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: SIGN_UP_MANAGER,
        variables: {
          username: username,
          password: password
        }
      })
    })
      .then(response => {
        return response.json()
      })
      .then(jsonResponse => {
        if (jsonResponse.errors != null) {
          throw jsonResponse.errors[0]
        }
        return jsonResponse.data.signUp
      })
      .catch(error => {
        throw error
      })
  }
  else{
    return fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: SIGN_UP_CHEF,
        variables: {
          username: username,
          password: password,
          manager: manager
        }
      })
    })
      .then(response => {
        return response.json()
      })
      .then(jsonResponse => {
        if (jsonResponse.errors != null) {
          throw jsonResponse.errors[0]
        }
        return jsonResponse.data.signUp
      })
      .catch(error => {
        throw error
      })  
  }
}

export function getProjects (username,token){
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+token
    },
    body: JSON.stringify({
      query: PROJECT,
      variables: {
        username: username
      }
    })
  })
  .then(response => {
    return response.json()
  })
  .then(jsonResponse => {
    if (jsonResponse.errors != null) {
      throw jsonResponse.errors[0]
    }
    return jsonResponse.data.projects
  })
  .catch(error => {
    throw error
  })
}

export function getChefsOfManager(username,token){
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+token
    },
    body: JSON.stringify({
      query: CHEF_LIST,
      variables: {
        username: username,
      }
    })
  })
  .then(response => {
    return response.json()
  })
  .then(jsonResponse => {
    if (jsonResponse.errors != null) {
      throw jsonResponse.errors[0]
    }
    return jsonResponse.data.managers[0].projectChefs
  })
  .catch(error => {
    throw error
  })
}

export function getTasks(token,id){
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+token
    },
    body: JSON.stringify({
      query: TASKS,
      variables: {
        id: id
      }
    })
  })
  .then(response => {
    return response.json()
  })
  .then(jsonResponse => {
    if (jsonResponse.errors != null) {
      throw jsonResponse.errors[0]
    }
    return jsonResponse.data
  })
  .catch(error => {
    throw error
  })
}

export function getTask(token,id){
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+token
    },
    body: JSON.stringify({
      query: TASK,
      variables: {
        id: id
      }
    })
  })
  .then(response => {
    return response.json()
  })
  .then(jsonResponse => {
    if (jsonResponse.errors != null) {
      throw jsonResponse.errors[0]
    }
    return jsonResponse.data
  })
  .catch(error => {
    throw error
  })
}

export function createProject (username,token,title,date,description){
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+token
    },
    body: JSON.stringify({
      query: CREATEPROJECT,
      variables: {
        owner: username,
        title: title,
        date: date,
        description: description
      }
    })
  })
  .then(response => {
    return response.json()
  })
  .then(jsonResponse => {
    if (jsonResponse.errors != null) {
      throw jsonResponse.errors[0]
    }
    return jsonResponse.data
  })
  .catch(error => {
    throw error
  })
}

export function createTask(id,token,content,description){
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+token
    },
    body: JSON.stringify({
      query: CREATETASK,
      variables: {
        id: id,
        content: content,
        description: description
      }
    })
  })
  .then(response => {
    return response.json()
  })
  .then(jsonResponse => {
    if (jsonResponse.errors != null) {
      throw jsonResponse.errors[0]
    }
    return jsonResponse.data
  })
  .catch(error => {
    throw error
  })
}

export function updateManager(username,exManager,newManager,token){
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+token
    },
    body: JSON.stringify({
      query: UPDATEMANAGER,
      variables: {
        username: username,
        exManager: exManager,
        newManager: newManager
      }
    })
  })
  .then(response => {
    return response.json()
  })
  .then(jsonResponse => {
    if (jsonResponse.errors != null) {
      throw jsonResponse.errors[0]
    }
    return jsonResponse.data
  })
  .catch(error => {
    throw error
  })
}

export function updateProject(token,id,title,date,description){
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+token
    },
    body: JSON.stringify({
      query: UPDATEPROJECT,
      variables: {
        id: id,
        newTitle: title,
        newDate: date,
        newDescription: description
      }
    })
  })
  .then(response => {
    return response.json()
  })
  .then(jsonResponse => {
    if (jsonResponse.errors != null) {
      throw jsonResponse.errors[0]
    }
    return jsonResponse.data
  })
  .catch(error => {
    throw error
  })
}

export function updateTask(token,id,content,description){
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+token
    },
    body: JSON.stringify({
      query: UPDATETASK,
      variables: {
        id: id,
        newContent: content,
        newDescription: description
      }
    })
  })
  .then(response => {
    return response.json()
  })
  .then(jsonResponse => {
    if (jsonResponse.errors != null) {
      throw jsonResponse.errors[0]
    }
    return jsonResponse.data
  })
  .catch(error => {
    throw error
  })
}

export function closeProject(id,token){
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+token
    },
    body: JSON.stringify({
      query: CLOSEPROJECT,
      variables: {
        id: id
      }
    })
  })
  .then(response => {
    return response.json()
  })
  .then(jsonResponse => {
    if (jsonResponse.errors != null) {
      throw jsonResponse.errors[0]
    }
    return jsonResponse.data
  })
  .catch(error => {
    throw error
  })
}

export function deleteProject(id,token){
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+token
    },
    body: JSON.stringify({
      query: DELETEPROJECT,
      variables: {
        id: id
      }
    })
  })
  .then(response => {
    return response.json()
  })
  .then(jsonResponse => {
    if (jsonResponse.errors != null) {
      throw jsonResponse.errors[0]
    }
    return jsonResponse.data
  })
  .catch(error => {
    throw error
  })
}

export function deleteTask(id,token){
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+token
    },
    body: JSON.stringify({
      query: DELTASK,
      variables: {
        id: id
      }
    })
  })
  .then(response => {
    return response.json()
  })
  .then(jsonResponse => {
    if (jsonResponse.errors != null) {
      throw jsonResponse.errors[0]
    }
    return jsonResponse.data.tasks
  })
  .catch(error => {
    throw error
  })
}

export function setCheckTask(id,token,done){
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+token
    },
    body: JSON.stringify({
      query: UPDATESTATUSTASK,
      variables: {
        id: id,
        done: done
      }
    })
  })
  .then(response => {
    return response.json()
  })
  .then(jsonResponse => {
    if (jsonResponse.errors != null) {
      throw jsonResponse.errors[0]
    }
    return jsonResponse.data.tasks
  })
  .catch(error => {
    throw error
  })
}

export function updateProjectStepDone(id,token){
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+token
    },
    body: JSON.stringify({
      query: UPDATEPROJECTSTEPDONE,
      variables: {
        id: id
      }
    })
  })
  .then(response => {
    return response.json()
  })
  .then(jsonResponse => {
    if (jsonResponse.errors != null) {
      throw jsonResponse.errors[0]
    }
    return jsonResponse.data
  })
  .catch(error => {
    throw error
  })
}

export function nextStepProject(validation,id,status,token,commentaire){
  let NEXTSTEPQUERY = ""
  let varia
  if(validation){
    if(status === 'Initialisation')
      NEXTSTEPQUERY = DEVELOPMENTSTEP
    else if(status === 'Developpement')
      NEXTSTEPQUERY = PRODUCTIONSTEP
    else if(status === "Mise en production")
      NEXTSTEPQUERY = FINISHEDSTEP
    varia = {
      id: id
    }
  }
  else{
    NEXTSTEPQUERY = REJECTPROJECTSTEPDONE
    varia = {
      id: id,
      commentaire: commentaire
    }
  }
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+token
    },
    body: JSON.stringify({
      query: NEXTSTEPQUERY,
      variables: varia
    })
  })
  .then(response => {
    return response.json()
  })
  .then(jsonResponse => {
    if (jsonResponse.errors != null) {
      throw jsonResponse.errors[0]
    }
    return jsonResponse.data
  })
  .catch(error => {
    throw error
  })
}