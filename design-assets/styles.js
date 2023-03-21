import { StyleSheet } from "react-native";
import * as Colors from "../design-assets/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blackColor,
  },
  tabContainer: {
    backgroundColor: Colors.blackColor,
  },
  bottomNavigationContainer: {
    height: "12%",
    backgroundColor: Colors.blackColor,
    padding: 17,
    alignItems: "center",
  },
  bgWhite: {
    backgroundColor: Colors.whiteColor,
  },
  bgBlack: {
    backgroundColor: Colors.blackColor,
  },
  preLoginContainer: {
    flex: 1,
    padding: 10,
    marginTop: "10%",
    borderTopLeftRadius: "50%",
    borderTopEndRadius: "50%",
    paddingTop: "20%",
    backgroundColor: Colors.whiteColor,
  },
  row: { flexDirection: "row" },
  heading: {
    fontSize: 26,
    color: Colors.whiteColor,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "40%",
  },
  inputFlex1: {
    flex: 1,
  },
  textInput: {
    backgroundColor: Colors.greyColor,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 10,
    fontSize: 18,
    paddingHorizontal: 20,
    marginVertical: 8,
    marginHorizontal: 8,
  },
  button: {
    backgroundColor: Colors.blackColor,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    fontSize: 20,
    paddingHorizontal: 20,
    marginHorizontal: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  bold: {
    fontWeight: "bold",
  },
  link: {
    color: Colors.blackColor,
    textAlign: "right",
    marginHorizontal: 13,
    marginVertical: 10,
    fontSize: 15,
  },
  linkSpan: {
    fontWeight: "bold",
  },
  tabIcon: {
    height: 25,
    width: 25,
    marginHorizontal: 25,
  },
});
