import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useState, useContext } from "react";
import { login } from "../api/auth.api";
import { AuthContext } from "../context/AuthContext";

export default function LoginScreen({ navigation }) {
  const { loginUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Email aur Password dono bhariye!");
      return;
    }

    setLoading(true);
    try {
      // 🔥 API call
      const data = await login({
        email: email.toLowerCase().trim(),
        password: password.trim(),
      });

      console.log("Login Success Data:", data);

      // ✅ Correct token read
      const token = data?.access_token;

      if (!token) {
        throw new Error("Token missing in response");
      }

      // 🔐 Save token & switch auth state
      await loginUser(token);
      // Navigation AuthContext handle karega
    } catch (err) {
      console.error("Login Error:", err);

      const backendError =
        err?.error ||
        err?.response?.data?.error ||
        "Invalid email or password";

      Alert.alert("Login Failed", backendError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Login to your account</Text>

        <TextInput
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholderTextColor="#999"
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
          placeholderTextColor="#999"
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.disabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.link}>
            Don&apos;t have an account?{" "}
            <Text style={{ fontWeight: "bold", color: "#0984e3" }}>
              Sign Up
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f7f6",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 20,
    width: "100%",
    maxWidth: 400,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2d3436",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#636e72",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#dfe6e9",
    padding: 15,
    marginBottom: 15,
    borderRadius: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#0984e3",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  disabled: {
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
  },
});
