import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import AppNavigator from "./navigation/AppNavigator";
import { useContext } from "react";
import { ActivityIndicator, View } from "react-native";

function RootNavigation() {
  const { loading } = useContext(AuthContext);

  // 🔹 Jab tak SecureStore se auth state load ho rahi ho
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0984e3" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <RootNavigation />
    </AuthProvider>
  );
}
