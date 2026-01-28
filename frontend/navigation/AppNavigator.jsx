import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import DashboardScreen from "../screens/DashboardScreen";
import VideoPlayerScreen from "../screens/VideoPlayerScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { token, loading } = useContext(AuthContext);

  // 🔹 Jab tak token load ho raha ho, kuch render mat karo
  if (loading) {
    return null;
  }

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={token ? "Dashboard" : "Login"}
    >
      {!token ? (
        <>
          {/* 🔐 AUTH SCREENS */}
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </>
      ) : (
        <>
          {/* ✅ APP SCREENS (LOGGED IN) */}
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="VideoPlayer" component={VideoPlayerScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
