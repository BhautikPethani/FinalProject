import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import HomeScreen from "./screens/HomeScreen";
import ManageWorkspace from "./screens/manageWorkspace";
import CreateNewWorkspace from "./screens/CreateNewWorkspace";
import CreateNewTask from "./screens/CreateNewTask";
import ManageTask from "./screens/manageTask";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Sign Up"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dashboard"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Manage Workspace"
          component={ManageWorkspace}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Add Workspace" component={CreateNewWorkspace} />

        <Stack.Screen
          name="Manage Task"
          component={ManageTask}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Add Task" component={CreateNewTask} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
