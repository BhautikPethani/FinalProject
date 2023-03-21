import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { signIn, checkUserIsSignedInOrNot } from "../services/firebaseConfig";
import { styles } from "../design-assets/styles";
import * as helper from "../services/helper";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignInAlreadyCheck, setIsSignInAlreadyCheck] = useState(true);

  if (isSignInAlreadyCheck) {
    helper.getAsync("currentUser").then((data) => {
      if (data != undefined || data != "") {
        checkUserIsSignedInOrNot()
          .then((user) => {
            helper.setAsync("currentUser", user);
            navigation.replace("Dashboard");
          })
          .catch(() => {});
      }
    });
    setIsSignInAlreadyCheck(false);
  }

  const handleSignIn = async () => {
    if (email != "" && password != "") {
      if (password.length >= 6) {
        await signIn(email, password)
          .then((data) => {
            // console.log(data);
            helper.setAsync("currentUser", data);
            navigation.replace("Dashboard");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        helper.alertBox({
          label: "Opps !",
          message: "Invalid Credentials",
        });
      }
    } else {
      helper.alertBox({
        label: "Opps!",
        message: "Invalid Credentials",
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>WELCOME</Text>
      <View style={styles.preLoginContainer}>
        <TextInput
          style={styles.textInput}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
        />
        <TextInput
          style={styles.textInput}
          value={password}
          onChangeText={setPassword}
          numberOfLines={20}
          placeholder="Password"
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.button}
          onPress={
            () => handleSignIn()
            // navigation.navigate("Step 2", { firstName, lastName, email })
          }
        >
          <Text style={styles.buttonText}>SIGN IN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.replace("Sign Up")}>
          <Text style={styles.link}>
            Don't have an account? <Text style={styles.linkSpan}>SIGN UP</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
