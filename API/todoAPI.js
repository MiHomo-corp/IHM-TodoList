import React from 'react'

const API_URL = 'http://192.168.1.164:4000'

const SIGN_IN =
  'mutation($username:String!, $password:String!){signIn(username:$username, password:$password)}'

const SIGN_UP_CHEF =
  'mutation($username:String!, $password:String!, $manager:String!){signUpProjectChef(username:$username, password:$password, conect:$manager)}'

const SIGN_UP_MANAGER =
  'mutation($username:String!, $password:String!){signUpManager(username:$username, password:$password)}'

const MANAGER_LIST = 
  'query{managers{username}}' //sortir l'id

const CHEF_LIST = 
  'query managers($username: String!){managers(where:{username: $username}){projectChefs{username}}}'

const GET_MY_MANAGER = 
  'query projectChefs($username: String!){projectChefs(where:{username: $username}){manager{username}}}'

const TASKLIST =
  'query taskLists($username: [String]!) {taskLists(where: { owner: { username_IN: $username } }) {id title date description status owner{username}}}'

const TASKS =
  'query($title: String!,$username: String!){ tasks(where: {belongsTo: {title: $title}}) {id content done},taskLists(where: {title: $title,owner:{username:$username}}) {id title date status projectStepDone description}}'

const TASK = 
  'query task($id: ID!){tasks(where:{id: $id}){id content description done}}'

const UPDATEMANAGER = 
  'mutation($username: String!, $exManager: String!, $newManager: String!){updateProjectChefs(where:{username:$username},update:{manager:{connect:{where:{username:$newManager}},disconnect:{where:{username:$exManager}}}}){projectChefs{username manager{username}}}}'

const CREATETASKLIST = 
  `mutation($title:String!,$date:Date!,$description:String,$owner:String!){
  	createTaskLists(input:{title:$title, date:$date, description:$description, status:"Initialization", owner:{connect:{where:{username:$owner}}}}) {taskLists{id title date description owner {username}}},
    task1: createTasks(input:{content:"Réunion d'équipe",belongsTo:{connect:{where:{title:$title}}}}){tasks{id content done belongsTo{owner{username}}}},
	  task2: createTasks(input:{content:"Allocation budget",belongsTo:{connect:{where:{title:$title}}}}){tasks{id content done belongsTo{owner{username}}}},
	  task3: createTasks(input:{content:"Feuille de route du projet",belongsTo:{connect:{where:{title:$title}}}}){tasks{id content done belongsTo{owner{username}}}},
	  task4: createTasks(input:{content:"Maquete projet",belongsTo:{connect:{where:{title:$title}}}}){tasks{id content done belongsTo{owner{username}}}},
	  task5: createTasks(input:{content:"Presentation devant comité",belongsTo:{connect:{where:{title:$title}}}}){tasks{id content done belongsTo{owner{username}}}}
  }`

const CREATETASK = 
  'mutation($content:String!,$id:ID!,$description:String!){createTasks(input:{content:$content,description:$description,belongsTo:{connect:{where:{id:$id}}}}){tasks{id content done belongsTo{owner{username}}}}}'

const GETUSERID = 
 'query userID($username:String!){users(where: {username: $username}) {id}}'

const UPDATETASK =
 'mutation($id:ID!,$newContent:String!,$newDescription:String!){updateTasks(where:{id:$id} update:{content:$newContent,description:$newDescription,}){tasks{content description}}}'

const UPDATETASKLIST =
  'mutation($id:ID!,$newTitle:String!,$newDate:Date!,$newDescription:String){updateTaskLists(where: {id: $id} update:{title: $newTitle, date: $newDate, description:$newDescription}){taskLists {id date title description}}}'

const UPDATESTATUSTASK = 
  'mutation ($id:ID!,$done:Boolean!) {updateTasks(where:{id:$id}update:{done:$done}){tasks {id content done}}}'
  
const CLOSETASKLIST = 
  'mutation($id:ID!){updateTaskLists(where: {id:$id}, update:{status:"Closed"}){taskLists{title status}}}'

const DELETETASKLIST =
  'mutation($id:ID!){deleteTasks(where:{belongsTo:{id:$id}}){nodesDeleted},deleteTaskLists(where: {id: $id}){nodesDeleted}}'

const GETPROJECTSTEPDONE =
  'query taskLists($username: [String]!) {taskLists(where: { owner: { username_IN: $username }, projectStepDone: true}) {title date status owner{username}}}'

const UPDATEPROJECTSTEPDONE =
  'mutation($id:ID!){updateTaskLists(where: {id: $id},update:{projectStepDone:true}){taskLists{projectStepDone}}}'

const REJECTPROJECTSTEPDONE =
  'mutation($id:ID!){updateTaskLists(where: {id: $id},update:{projectStepDone:false}){taskLists{projectStepDone}}}'

const DEVELOPMENTSTEP = 
  `mutation($id: ID!){
    updateTaskLists(where: {id: $id},update:{projectStepDone:false, status:"Development"}){taskLists{projectStepDone}},
    task1: createTasks(input:{content:"Réunion d'équipe",belongsTo:{connect:{where:{id:$id}}}}){tasks{id content done belongsTo{owner{username}}}},
    task2: createTasks(input:{content:"Répartition des tâches",belongsTo:{connect:{where:{id:$id}}}}){tasks{id content done belongsTo{owner{username}}}},
    task3: createTasks(input:{content:"Réunion d'avancement",belongsTo:{connect:{where:{id:$id}}}}){tasks{id content done belongsTo{owner{username}}}},
    task4: createTasks(input:{content:"Démonstration",belongsTo:{connect:{where:{id:$id}}}}){tasks{id content done belongsTo{owner{username}}}}
  }`
const PRODUCTIONSTEP =
  `mutation($id: ID!){
    updateTaskLists(where: {id: $id},update:{projectStepDone:false, status:"Prodution launch"}){taskLists{projectStepDone}},
    task1: createTasks(input:{content:"Mise en production",belongsTo:{connect:{where:{id:$id}}}}){tasks{id content done belongsTo{owner{username}}}},
    task2: createTasks(input:{content:"Retour utilisateur",belongsTo:{connect:{where:{id:$id}}}}){tasks{id content done belongsTo{owner{username}}}},
    task3: createTasks(input:{content:"Réunion d'équipe",belongsTo:{connect:{where:{id:$id}}}}){tasks{id content done belongsTo{owner{username}}}},
    task5: createTasks(input:{content:"Correction de bugs",belongsTo:{connect:{where:{id:$id}}}}){tasks{id content done belongsTo{owner{username}}}},
    task4: createTasks(input:{content:"Bilan de déroulement du projet",belongsTo:{connect:{where:{id:$id}}}}){tasks{id content done belongsTo{owner{username}}}}
  }`
const FINISHEDSTEP =
  'mutation($id:ID!){updateTaskLists(where: {id: $id},update:{projectStepDone:false, status:"Finished"}){taskLists{projectStepDone}}}'

const DELTASK =
  "mutation($id:ID!){deleteTasks(where: {id: $id}){nodesDeleted relationshipsDeleted}}"

 //fonction suppr une task
 //fonction changer statut d'une task

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
      return jsonResponse.data.taskLists
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
/*
export function getManagerList (username,token){
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+token
    },
    body: JSON.stringify({
      query: GETUSERID,
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
    return jsonResponse.data.managers
  })
  .catch(error => {
    throw error
  })
}*/

export function getTaskLists (username,token){
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+token
    },
    body: JSON.stringify({
      query: TASKLIST,
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
    return jsonResponse.data.taskLists
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

export function getTasks(username,token,title){
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+token
    },
    body: JSON.stringify({
      query: TASKS,
      variables: {
        username: username,
        title: title
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

export function createTaskList (username,token,title,date,description){
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+token
    },
    body: JSON.stringify({
      query: CREATETASKLIST,
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
    return jsonResponse.data.taskLists
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
    return jsonResponse.data.tasks
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
    return jsonResponse.data.taskLists
  })
  .catch(error => {
    throw error
  })
}

export function updateTaskList(token,id,title,date,description){
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+token
    },
    body: JSON.stringify({
      query: UPDATETASKLIST,
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
    return jsonResponse.data.taskLists
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
    return jsonResponse.data.tasks
  })
  .catch(error => {
    throw error
  })
}

export function closeTaskList(id,token){
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+token
    },
    body: JSON.stringify({
      query: CLOSETASKLIST,
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

export function deleteTaskList(id,token){
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+token
    },
    body: JSON.stringify({
      query: DELETETASKLIST,
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


/*export function deleteTaskList(id,token){
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+token
    },
    body: JSON.stringify({
      query: DELTASKLIST,
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
    return jsonResponse.data.taskLists
  })
  .catch(error => {
    throw error
  })
}*/

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

export function nextStepProject(validation,id,status,token){
  let NEXTSTEPQUERY = ""
  if(validation){
    if(status === 'Initialization')
      NEXTSTEPQUERY = DEVELOPMENTSTEP
    if(status === 'Development')
      NEXTSTEPQUERY = PRODUCTIONSTEP
    if(status === "Prodution launch")
      NEXTSTEPQUERY = FINISHEDSTEP
  }
  else{
    NEXTSTEPQUERY = REJECTPROJECTSTEPDONE
  }
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+token
    },
    body: JSON.stringify({
      query: NEXTSTEPQUERY,
      variables: {
        id: id,
        validation: validation
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

export function setStatusTask(title, token){
  return console.log("coucou")
}