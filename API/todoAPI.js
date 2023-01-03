import React from 'react'
import { user } from 'stardog'

const API_URL = 'http://localhost:4000'

const SIGN_IN =
  'mutation($username:String!, $password:String!){signIn(username:$username, password:$password)}'

const SIGN_UP_CHEF =
  'mutation($username:String!, $password:String!, $manager:String!){signUpProjectChef(username:$username, password:$password, conect:$manager)}'

const SIGN_UP_MANAGER =
  'mutation($username:String!, $password:String!){signUpManager(username:$username, password:$password)}'

const MANAGER_LIST = 
  'query{managers{username}}'

const CHEF_LIST = 
  'query managers($username: String!){managers(where:{username: $username}){projectChefs{username}}}'

const TASKLIST =
  'query taskLists($username: [String]!) {taskLists(where: { owner: { username_IN: $username } }) {id title date description owner{username}}}'

const TASKS =
  'query($title: String!,$username: String!){ tasks(where: {belongsTo: {title: $title}}) {id content done},taskLists(where: {title: $title,owner:{username:$username}}) {id title date status description}}'
  
const CREATETASKLIST = 
  'mutation($title:String!,$date:Date!,$description:String,$owner:String!){createTaskLists(input:{title:$title, date:$date, description:$description, owner:{connect:{where:{username:$owner}}}}) {taskLists{id title date description owner {username}}}}'

const CREATETASK = 
  'mutation($content:String!,$title:String!){createTasks(input:{content:$content,done:false,belongsTo:{connect:{where:{title:$title}}}}){tasks{id content done belongsTo{owner{username}}}}}}'

const UPDATETASKLIST =
  'mutation($id:ID!,$newTitle:String!,$newDate:Date!,$newDescription:String){updateTaskLists(where: {id: $id} update:{title: $newTitle, date: $newDate, description:$newDescription}){taskLists {id date title description}}}'

const DELTASKLIST =
  'mutation($id:ID!){deleteTaskLists(where: {id: $id}){nodesDeleted relationshipsDeleted}}'
//const DELTASK = 



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
      return jsonResponse.data.signIn
    })
    .catch(error => {
      throw error
    })
}

export function signUp (hierarchy, username, password) {
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
          conect: manager
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
}

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

export function createTask(title,token){
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+token
    },
    body: JSON.stringify({
      query: CREATETASK,
      variables: {
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
    return jsonResponse.data.tasks
  })
  .catch(error => {
    throw error
  })
}

export function deleteTask(title,token){
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+token
    },
    body: JSON.stringify({
      query: CREATETASK,
      variables: {
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
    return jsonResponse.data.tasks
  })
  .catch(error => {
    throw error
  })
}

export function setStatusTask(title, token){
  return console.log("coucou")
}