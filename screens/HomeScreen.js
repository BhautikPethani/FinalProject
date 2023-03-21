import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { styles } from "../design-assets/styles";
import * as helper from "../services/helper";
import {
  checkUserIsSignedInOrNot,
  signOutCurrentUser,
  getWorkspaces,
} from "../services/firebaseConfig";

const tabs = {
  addTask: { title: "Add New Task", tabIndex: 1 },
  people: { title: "Members", tabIndex: 2 },
  dashboard: { title: "Dashboard", tabIndex: 3 },
  workspace: { title: "Manage Workspaces", tabIndex: 4 },
};

const HomeScreen = ({ navigation }) => {
  const [isSignInAlreadyCheck, setIsSignInAlreadyCheck] = useState(true);
  const [currentWorkspace, setCurrentWorkspace] = useState("");
  const [currentTab, setCurrentTab] = useState(tabs.dashboard);
  const currentUser = null;

  navigation.setOptions({ title: currentTab.title });
  if (isSignInAlreadyCheck) {
    helper.getAsync("currentUser").then((data) => {
      if (data != undefined || data != "") {
        checkUserIsSignedInOrNot()
          .then((user) => {
            // console.log(user);
            currentUser = user;
            getAllWorkspacesToDashboard(user.email);
          })
          .catch((err) => {
            helper.setAsync("currentUser", "");
            navigation.replace("Login");
          });
      }
    });
    setIsSignInAlreadyCheck(false);
  }

  function getAllWorkspacesToDashboard(email) {
    if (currentWorkspace == "" || currentWorkspace == undefined) {
      getAllWorkspaces(email)
        .then((workspaces) => {
          if (workspaces.length > 0) {
          } else {
            // setCurrentTab(tabs.workspace);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
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

  return (
    <View style={[styles.container, styles.bgWhite]}>
      <ScrollView style={[styles.tabContainer, styles.bgWhite]}></ScrollView>
      <View style={[styles.bottomNavigationContainer, styles.bgBlack]}>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              setCurrentTab(tabs.addTask);
            }}
          >
            <Image
              style={styles.tabIcon}
              source={require("../assets/addtask-white.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setCurrentTab(tabs.people);
            }}
          >
            <Image
              style={styles.tabIcon}
              source={require("../assets/people-white.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setCurrentTab(tabs.dashboard);
            }}
          >
            <Image
              style={styles.tabIcon}
              source={require("../assets/home-white.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setCurrentTab(tabs.workspace);
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

export default HomeScreen;
