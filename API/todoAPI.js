import React from 'react'
const API_URL = 'http://localhost:4000'

const SIGN_IN =
  'mutation($username:String!, $password:String!){signIn(username:$username, password:$password)}'

const SIGN_UP =
  'mutation($username:String!, $password:String!){signUp(username:$username, password:$password)}'

const TASKLIST =
  'query taskLists($username: String!) {taskLists(where: { owner: { username: $username } }) {id title date description}}'

const TASKS =
  'query($title: String!,$username: String!){ tasks(where: {belongsTo: {title: $title}}) {id content done},taskLists(where: {title: $title,owner:{username:$username}}) {id title date status description}}'

const TASK = 
  'query task ($title: String!, $id: ID!){tasks(where: {belongsTo: {title: $title}id: $id}) {content description done}}'

const CREATETASKLIST = 
  'mutation($title:String!,$date:Date!,$description:String,$owner:String!){createTaskLists(input:{title:$title, date:$date, description:$description, owner:{connect:{where:{username:$owner}}}}) {taskLists{id title date description owner {username}}}}'

const CREATETASK = 
  'mutation($content:String!,$title:String!,$description:String!){createTasks(input:{content:$content,done:false,description:$description,belongsTo:{connect:{where:{title:$title}}}}){tasks{id content done belongsTo{owner{username}}}}}'

const GETUSERID = 
 'query userID($username:String!){users(where: {username: $username}) {id}}'

const UPDATETASKLIST =
  'mutation($id:ID!,$newTitle:String!,$newDate:Date!,$newDescription:String){updateTaskLists(where: {id: $id} update:{title: $newTitle, date: $newDate, description:$newDescription}){taskLists {id date title description}}}'

const UPDATESTATUSTASK = 
  'mutation ($id:ID!,$done:Boolean!) {updateTasks(where:{id:$id}update:{done:$done}){tasks {id content done}}}'

const DELTASKLIST = 
  "mutation($id:ID!){deleteTaskLists(where: {id: $id}){nodesDeleted relationshipsDeleted}}"

const DELTASK =
  "mutation($id:ID!){deleteTasks(where: {id: $id}){nodesDeleted relationshipsDeleted}}"


 //fonction suppr une task
 //fonction suppr une taskList
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

export function signUp (username, password) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: SIGN_UP,
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

export function getUserId (username,token){
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
    return jsonResponse.data.users
  })
  .catch(error => {
    throw error
  })
}

export function getTaskList (username,token){
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

export function getTask(token,title,id){
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+token
    },
    body: JSON.stringify({
      query: TASK,
      variables: {
        title: title,
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

export function createTask(title,token,content,description){
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+token
    },
    body: JSON.stringify({
      query: CREATETASK,
      variables: {
        title: title,
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


export function deleteTaskList(id,token){
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