import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import {
  signIn,
  checkUserIsSignedInOrNot,
  getAllUsers,
  setWorkSpace,
} from "../services/firebaseConfig";
import { styles } from "../design-assets/styles";
import * as helper from "../services/helper";
import MultiSelect from "react-native-multiple-select";
import { ManageWorkspace } from "./manageWorkspace";

const CreateNewWorkspace = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [workspaceName, setWorkspaceName] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [user, setUser] = useState([]);

  getAllUsers()
    .then((users) => {
      setUser(users);
    })
    .catch((err) => {});

  onSelectedItemsChange = (selectedItems) => {
    setSelectedItems(selectedItems);
    // console.log(selectedItems);
  };

  handleAddWorkspace = () => {
    helper.getAsync("currentUser").then((data) => {
      setWorkSpace(
        workspaceName,
        helper.generateUsername(data.email),
        selectedItems
      )
        .then((success) => {
          return helper.alertBox(success);
        })
        .catch((err) => {
          return helper.alertBox(err);
        });
    });
  };

  return (
    <View style={[styles.container, styles.bgWhite]}>
      <TextInput
        style={[styles.textInput]}
        value={workspaceName}
        onChangeText={setWorkspaceName}
        placeholder="Enter Workspace Name"
      />
      <MultiSelect
        hideTags
        items={user}
        uniqueKey="id"
        onSelectedItemsChange={onSelectedItemsChange}
        selectedItems={selectedItems}
        styleDropdownMenuSubsection={styles.dropdown}
        selectText="Select Members"
        searchInputStyle={styles.textInput}
        searchInputPlaceholderText="Search members Here..."
        onChangeInput={(text) => console.log(text)}
        tagRemoveIconColor="#CCC"
        tagBorderColor="#CCC"
        tagTextColor="#CCC"
        selectedItemTextColor="#CCC"
        selectedItemIconColor="#CCC"
        itemTextColor="#000"
        displayKey="name"
        submitButtonColor="#000"
        submitButtonText="Submit"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={
          () => handleAddWorkspace()
          // navigation.navigate("Step 2", { firstName, lastName, email })
        }
      >
        <Text style={styles.buttonText}>SAVE</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateNewWorkspace;
