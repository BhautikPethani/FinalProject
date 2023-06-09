import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { getDatabase, set, ref, child, get, update } from "firebase/database";
import * as helper from "../services/helper";

const firebaseConfig = {
  apiKey: "AIzaSyBa41fO21RcZIT4_AbnXp3qkFYxo40eSFA",
  authDomain: "taskmanagementsystem-bf0c2.firebaseapp.com",
  databaseURL: "https://taskmanagementsystem-bf0c2-default-rtdb.firebaseio.com",
  projectId: "taskmanagementsystem-bf0c2",
  storageBucket: "taskmanagementsystem-bf0c2.appspot.com",
  messagingSenderId: "357009176204",
  appId: "1:357009176204:web:d6eb964a7f768a4bf8eda9",
  measurementId: "G-VGCGK088XW",
};

const app = initializeApp(firebaseConfig);

// Initialize variables
const auth = getAuth(app);
export const database = getDatabase(app);

export async function registerNewUser(
  email,
  password,
  userName,
  firstName,
  lastName
) {
  return new Promise(async (resolve, reject) => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        var user = userCredential.user;
        set(ref(database, "users/" + userName), {
          email: email,
          firstName: firstName,
          lastName: lastName,
        })
          .then(() => {
            resolve({
              label: "success",
              message: "You're successfully registered",
            });
          })
          .catch((error) => {
            reject({
              label: "danger",
              message: "Something went wrong !!",
            });
          });
      })
      .catch((error) => {
        reject({
          label: "danger",
          message: "Email is already registered !!",
        });
      });
  });
}

export async function getAllUsers() {
  return new Promise(async (resolve, reject) => {
    get(child(ref(database), "users/"))
      .then((snapshot) => {
        var allUsers = [];
        var counter = 1;
        snapshot.forEach((childSnapshot) => {
          allUsers.push({ id: childSnapshot.key, name: childSnapshot.key });
          counter++;
        });
        resolve(allUsers);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function signIn(email, password) {
  return new Promise(async (resolve, reject) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        var user = userCredential.user;
        // createToLocal("user", user);
        resolve(user);
        // window.location.replace("/AdminPanel/adminDashboard.html");
      })
      .catch((error) => {
        // console.log(error);
        reject({
          label: "Opps !",
          message: "Invalid Credentials",
        });
      });
  });
}

export async function checkUserIsSignedInOrNot() {
  return new Promise(async (resolve, reject) => {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user);
        resolve(user);
        // console.log(currentUser);
        // console.log("User signed in");
        // console.log(user);
        // ...
      } else {
        // console.log({ label: "Opps !", message: "You're not signed in" });
        reject({ label: "Opps !", message: "You're not signed in" });
      }
    });
  });
}

export function signOutCurrentUser() {
  return new Promise(async (resolve, reject) => {
    await signOut(auth)
      .then(() => {
        resolve(true);
      })
      .catch((error) => {
        resolve(true);
      });
  });
}

export function getWorkspaces(email) {
  return new Promise(async (resolve, reject) => {
    await get(child(ref(database), "workspaces/"))
      .then((snapshot) => {
        var allWorkspaces = [];
        snapshot.forEach((childSnapshot) => {
          if (
            childSnapshot
              .val()
              .participants.indexOf(helper.generateUsername(email)) != -1
          ) {
            allWorkspaces.push(childSnapshot);
          }
        });
        // console.log("WORKSPACE" + allWorkspaces);
        resolve(allWorkspaces);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function setWorkSpace(workspaceName, userName, participants) {
  return new Promise(async (resolve, reject) => {
    if (participants.indexOf(userName) == -1) {
      participants.push(userName);
    }
    set(ref(database, "workspaces/" + workspaceName + "-+=" + userName), {
      workspaceName: workspaceName,
      participants: participants,
    })
      .then(() => {
        resolve({
          label: "success",
          message: "Workspace successfully added",
        });
        // getWorkspaces();
      })
      .catch((error) => {
        console.log(error.code);
        resolve({
          label: "Opps!",
          message: "Something went wrong",
        });
      });
  });
}

export function addTask(
  taskName,
  taskDescription,
  participants,
  startDate,
  endDate,
  status,
  workspaceKey
) {
  return new Promise(async (resolve, reject) => {
    if (
      participants.indexOf(helper.getUsernameFromWorkspaceKey(workspaceKey)) ==
      -1
    ) {
      participants.push(helper.getUsernameFromWorkspaceKey(workspaceKey));
    }
    set(ref(database, "task/" + Date.now() + "=+-" + workspaceKey), {
      workspaceKey: workspaceKey,
      taskName: taskName,
      taskDescription: taskDescription,
      taskStartDate: startDate,
      taskDueDate: endDate,
      participants: participants,
      status: status,
    })
      .then(() => {
        resolve({
          label: "success",
          message: "Task successfully added",
        });
        // getWorkspaces();
      })
      .catch((error) => {
        console.log(error.code);
        resolve({
          label: "Opps!",
          message: "Something went wrong",
        });
      });
  });
}

export function deleteWorkspace(workspaceID) {
  return new Promise(async (resolve, reject) => {
    set(ref(database, "workspaces/" + workspaceID), {})
      .then(() => {
        resolve({
          label: "success",
          message: "Workspace deleted successfully !!",
        });
      })
      .catch((error) => {
        console.log(error.code);
        resolve({
          label: "Opps !",
          message: "Something went wrong",
        });
      });
  });
}

export function deleteTask(taskKey) {
  return new Promise(async (resolve, reject) => {
    set(ref(database, "task/" + taskKey), {})
      .then(() => {
        resolve({
          label: "success",
          message: "Task deleted successfully !!",
        });
      })
      .catch((error) => {
        console.log(error.code);
        resolve({
          label: "Opps !",
          message: "Something went wrong",
        });
      });
  });
}

export function getAllTasks(currentWorkspaceKey, currentUser) {
  return new Promise(async (resolve, reject) => {
    get(child(ref(database), "task/"))
      .then((snapshot) => {
        var allTasks = [];
        snapshot.forEach((childSnapshot) => {
          // console.log(childSnapshot.val().participants.indexOf(generateUsername(currentUser.email)));
          if (
            childSnapshot
              .val()
              .participants.indexOf(helper.generateUsername(currentUser)) !=
              -1 &&
            childSnapshot.val().workspaceKey == currentWorkspaceKey
          ) {
            // console.log("ABC" + childSnapshot);
            allTasks.push(childSnapshot);
          }
        });
        resolve(allTasks);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
