import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  signIn,
  checkUserIsSignedInOrNot,
} from "../../services/firebaseConfig";
import { styles } from "../../design-assets/styles";
import * as helper from "../../services/helper";

const ManageWorkspace = (navigation, workspaces) => {
  return (
    <View style={styles.container}>
      <View style={styles.preLoginContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={
            () => {}
            // navigation.navigate("Step 2", { firstName, lastName, email })
          }
        >
          <Text style={styles.buttonText}>SIGN IN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ManageWorkspace;
