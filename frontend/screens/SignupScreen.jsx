import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { signup } from "../api/auth.api";

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    // Validation
    if (!name || !email || !password) {
      Alert.alert("Opps!", "Saare boxes bharo pehle.");
      return;
    }

    setLoading(true);
    try {
      // API call to your Flask backend - normalize data like LoginScreen does
      await signup({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: password.trim(),
      });

      Alert.alert("Success! 🎉", "Account ban gaya. Ab login karo.");
      navigation.navigate("Login");
    } catch (err) {
      // Backend se error message nikaalna
      const errorMsg =
        err.response?.data?.error || "Signup fail ho gaya. Backend check karo!";
      Alert.alert("Error", errorMsg);
      console.error("Full Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <Text style={styles.title}>Join Us</Text>
          <Text style={styles.subtitle}>Create your account to start</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
              style={styles.input}
              placeholderTextColor="#999"
            />

            <Text style={styles.label}>Email Address</Text>
            <TextInput
              placeholder="example@mail.com"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholderTextColor="#999"
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              placeholder="Minimum 6 characters"
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              secureTextEntry
              placeholderTextColor="#999"
            />
          </View>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSignup}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Sign Up</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.link}>
              Already have an account?{" "}
              <Text style={styles.boldText}>Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f7f6",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center", // Vertical center
    alignItems: "center", // Horizontal center
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 20,
    width: "100%",
    maxWidth: 420, // Web par professional dikhne ke liye
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2d3436",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#636e72",
    textAlign: "center",
    marginBottom: 30,
    marginTop: 5,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2d3436",
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#dfe6e9",
    padding: 15,
    marginBottom: 15,
    borderRadius: 12,
    fontSize: 16,
    color: "#2d3436",
  },
  button: {
    backgroundColor: "#0984e3",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#0984e3",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonDisabled: {
    backgroundColor: "#b2bec3",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    marginTop: 25,
    textAlign: "center",
    color: "#636e72",
    fontSize: 15,
  },
  boldText: {
    color: "#0984e3",
    fontWeight: "bold",
  },
});