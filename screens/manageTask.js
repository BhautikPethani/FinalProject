import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import { styles } from "../design-assets/styles";
import * as helper from "../services/helper";
import {
  checkUserIsSignedInOrNot,
  signOutCurrentUser,
  getAllTasks,
  deleteTask,
} from "../services/firebaseConfig";

const tabs = {
  addTask: { title: "Add New Task", tabIndex: 1 },
  people: { title: "Members", tabIndex: 2 },
  dashboard: { title: "Dashboard", tabIndex: 3 },
  workspace: { title: "Manage Workspaces", tabIndex: 4 },
};

const ManageTask = ({ route, navigation }) => {
  const { workspace, currentUser } = route.params;
  var isSignInAlreadyCheck = true;
  var [allTask, setAllTask] = useState("");
  const [refreshSwitch, setRefreshSwitch] = useState(true);

  // console.log(currentUser);
  function refresh() {
    getAllTasks(workspace.key, currentUser.email)
      .then((tasks) => {
        // console.log("WORKSPACE: " + workspaces);
        if (tasks.length > 0) {
          setAllTask(tasks);
          setRefreshSwitch(false);
        } else {
          // navigation.replace("ManageWorkspace");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getAllTasksToDashboard() {
    // console.log("TEST 2");
    if (refreshSwitch) {
      getAllTasks(workspace.key, currentUser.email)
        .then((tasks) => {
          // console.log("WORKSPACE: " + workspaces);
          if (tasks.length > 0) {
            // console.log(tasks);
            setAllTask(tasks);
            setRefreshSwitch(false);
          } else {
            // navigation.replace("ManageWorkspace");
          }
        })
        .catch((err) => {
          console.log(err);
        });
      isSignInAlreadyCheck = false;
    }
  }

  if (isSignInAlreadyCheck) {
    getAllTasksToDashboard();
    isSignInAlreadyCheck = false;
  }

  const handleSignOut = async () => {
    await signOutCurrentUser()
      .then((data) => {
        // console.log(data);
        helper.setAsync("currentUser", "");
        navigation.replace("Login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = async (taskId) => {
    await deleteTask(taskId)
      .then((success) => {
        // console.log(data);

        refresh();
        helper.alertBox(success);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Item = ({ item }) => {
    console.log(item);
    return (
      <TouchableOpacity onPress={() => {}}>
        <View style={styles.item}>
          <View style={styles.cardDetails}>
            <Text style={styles.title}>{item.val().taskName}</Text>
            <Text style={styles.population}>
              <Text style={styles.bold}>Due: </Text>
              {item.val().taskDueDate}
            </Text>
            <Text style={styles.population}>
              <Text style={styles.bold}>
                {item.val().status == -1 ? "Pending" : "In-Progress"}
              </Text>
            </Text>
          </View>
          <TouchableOpacity
            style={styles.delete}
            onPress={() => handleDelete(item.key)}
          >
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, styles.bgWhite]}>
      <Text style={[styles.tabHeading, styles.textBlack]}>Manage Tasks</Text>
      <ScrollView style={[styles.tabContainer, styles.bgWhite]}>
        <TouchableOpacity onPress={() => {}}>
          <TouchableOpacity
            style={styles.buttonBorder}
            onPress={
              () => {
                setRefreshSwitch(true);
                navigation.navigate("Add Task", { workspace, currentUser });
              }
              // navigation.navigate("Step 2", { firstName, lastName, email })
            }
          >
            <Text style={[styles.buttonText, styles.textBlack]}>Add Task</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </ScrollView>
      <FlatList
        data={allTask}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item.key}
      />
      <View style={[styles.bottomNavigationContainer, styles.bgBlack]}>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => {}}>
            <Image
              style={styles.tabActiveIcon}
              source={require("../assets/addtask-white.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Image
              style={styles.tabIcon}
              source={require("../assets/people-white.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Image
              style={styles.tabIcon}
              source={require("../assets/home-white.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.replace("Manage Workspace");
            }}
          >
            <Image
              style={styles.tabIcon}
              source={require("../assets/workspace-white.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleSignOut();
            }}
          >
            <Image
              style={styles.tabIcon}
              source={require("../assets/logout-white.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ManageTask;
