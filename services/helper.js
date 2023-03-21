import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export function validateEmail(email) {
  var expression = /^[^@]+@\w+(\.\w+)+\w$/;
  if (expression.test(email) == true) return true;
  return false;
}

export function generateUsername(email) {
  var splitArray = email.split("@");
  return splitArray[0];
}

export function alertBox({ label, message }) {
  return Alert.alert(label, message, [
    { text: "OK", onPress: () => console.log("OK Pressed") },
  ]);
}

export async function setAsync(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
}

export async function getAsync(key) {
  return new Promise(async (resolve, reject) => {
    try {
      await AsyncStorage.getItem(key).then((data) => {
        resolve(JSON.parse(data));
      });
      // console.log(JSON.parse(data));
    } catch (error) {
      reject(error);
    }
  });
}