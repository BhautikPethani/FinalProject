import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { addTask, setWorkSpace } from "../services/firebaseConfig";
import { styles } from "../design-assets/styles";
import * as helper from "../services/helper";
import MultiSelect from "react-native-multiple-select";
import DatePicker from "react-native-datepicker";

const CreateNewTask = ({ route, navigation }) => {
  const { workspace, currentUser } = route.params;
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [user, setUser] = useState([]);
  const [refreshSwitch, setRefreshSwitch] = useState(true);
  const [endDate, setEndDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  // console.log(currentUser);

  if (refreshSwitch) {
    var allUsers = [];
    var counter = 1;
    workspace.val().participants.forEach((childSnapshot) => {
      allUsers.push({ id: childSnapshot, name: childSnapshot });
      counter++;
    });
    setUser(allUsers);
    setRefreshSwitch(false);
  }

  onSelectedItemsChange = (selectedItems) => {
    setSelectedItems(selectedItems);
    // console.log(selectedItems);
  };

  handleAddTask = () => {
    addTask(
      taskName,
      taskDescription,
      selectedItems,
      startDate,
      endDate,
      -1,
      workspace.key
    )
      .then((success) => {
        return helper.alertBox(success);
      })
      .catch((err) => {
        return helper.alertBox(err);
      });
  };

  return (
    <View style={[styles.container, styles.bgWhite]}>
      <TextInput
        style={[styles.textInput]}
        value={taskName}
        onChangeText={setTaskName}
        placeholder="Enter task name"
      />
      <TextInput
        multiline
        style={[styles.textInput, { height: "20%" }]}
        value={taskDescription}
        onChangeText={setTaskDescription}
        placeholder="Enter task description"
        numberOfLines={10}
      />

      <DatePicker
        style={styles.datePicker}
        date={startDate}
        mode="date"
        placeholder="Start Date"
        format="YYYY-MM-DD"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        onDateChange={(date) => setStartDate(date)}
      />

      <DatePicker
        style={styles.datePicker}
        date={endDate}
        mode="date"
        placeholder="Select date"
        format="YYYY-MM-DD"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        onDateChange={(date) => setEndDate(date)}
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
          () => handleAddTask()
          // navigation.navigate("Step 2", { firstName, lastName, email })
        }
      >
        <Text style={styles.buttonText}>SAVE</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateNewTask;
