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
  getWorkspaces,
  deleteWorkspace,
} from "../services/firebaseConfig";

const tabs = {
  addTask: { title: "Add New Task", tabIndex: 1 },
  people: { title: "Members", tabIndex: 2 },
  dashboard: { title: "Dashboard", tabIndex: 3 },
  workspace: { title: "Manage Workspaces", tabIndex: 4 },
};

const ManageTask = ({ navigation }) => {
  var isSignInAlreadyCheck = true;
  var [currentWorkspace, setCurrentWorkspace] = useState("");
  var currentUser = null;
  var [allWorkspaces, setAllWorkSpaces] = useState("");
  const [refreshSwitch, setRefreshSwitch] = useState(true);

  function refresh() {
    helper.getAsync("currentUser").then((data) => {
      getWorkspaces(data.email)
        .then((workspaces) => {
          // console.log("WORKSPACE: " + workspaces);
          if (workspaces.length > 0) {
            setAllWorkSpaces(workspaces);
            setRefreshSwitch(false);
          } else {
            // navigation.replace("ManageWorkspace");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  function getAllWorkspacesToDashboard(email) {
    // console.log("TEST 2");
    if (
      (currentWorkspace == "" || currentWorkspace == undefined) &&
      refreshSwitch
    ) {
      getWorkspaces(email)
        .then((workspaces) => {
          // console.log("WORKSPACE: " + workspaces);
          if (workspaces.length > 0) {
            setAllWorkSpaces(workspaces);
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
    helper.getAsync("currentUser").then((data) => {
      if (data != undefined || data != "") {
        checkUserIsSignedInOrNot()
          .then((user) => {
            // console.log(user);
            currentUser = user;
            // console.log("TEST 1");
            getAllWorkspacesToDashboard(user.email);
          })
          .catch((err) => {
            helper.setAsync("currentUser", "");
            // navigation.replace("Login");
          });
      }
    });
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

  const handleDelete = async (workspaceId) => {
    await deleteWorkspace(workspaceId)
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
    // console.log(item.val().participants);
    return (
      <TouchableOpacity onPress={() => {}}>
        <View style={styles.item}>
          <View style={styles.cardDetails}>
            <Text style={styles.title}>{item.val().workspaceName}</Text>
            <Text style={styles.population}>
              <Text style={styles.bold}>Admin: </Text>
              {helper.getAdminFromWorkspaceName(item.key)}
            </Text>
            <Text style={styles.population}>
              {helper.getParticipantsListInText(item.val().participants)}
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
                navigation.navigate("Add Workspace");
              }
              // navigation.navigate("Step 2", { firstName, lastName, email })
            }
          >
            <Text style={[styles.buttonText, styles.textBlack]}>
              Add Workspace
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </ScrollView>
      <FlatList
        data={allWorkspaces}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item.key}
      />
      <View style={[styles.bottomNavigationContainer, styles.bgBlack]}>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => {}}>
            <Image
              style={styles.tabIcon}
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
              style={styles.tabActiveIcon}
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
