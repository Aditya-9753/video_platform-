import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  StatusBar,
  Switch,
} from "react-native";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function SettingsScreen({ navigation }) {
  const { logoutUser } = useContext(AuthContext);
  const [darkMode, setDarkMode] = useState(false);

  /* 🔹 LOGOUT */
  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            await logoutUser();
          },
        },
      ]
    );
  };

  /* 🔹 DARK MODE (REAL TOGGLE) */
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);

    Alert.alert(
      "Dark Mode",
      !darkMode
        ? "Dark mode enabled (UI demo)"
        : "Light mode enabled"
    );
  };

  /* 🔹 ABOUT */
  const showAbout = () => {
    Alert.alert(
      "About App",
      "Video Platform App\nVersion 1.0.0\n\nBuilt with React Native + Flask"
    );
  };

  return (
    <View style={[styles.container, darkMode && styles.darkBg]}>
      <StatusBar barStyle={darkMode ? "light-content" : "dark-content"} />

      {/* HEADER */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.header, darkMode && styles.darkText]}>
          Settings
        </Text>
        <View style={{ width: 24 }} />
      </View>

      {/* ACCOUNT */}
      <View style={[styles.card, darkMode && styles.darkCard]}>
        <Text style={styles.sectionTitle}>Account</Text>

        <TouchableOpacity
          style={styles.item}
          onPress={() =>
            Alert.alert("Profile", "Profile screen coming soon")
          }
        >
          <Text style={[styles.itemText, darkMode && styles.darkText]}>
            👤 Profile
          </Text>
        </TouchableOpacity>
      </View>

      {/* APP */}
      <View style={[styles.card, darkMode && styles.darkCard]}>
        <Text style={styles.sectionTitle}>App</Text>

        <View style={styles.switchRow}>
          <Text style={[styles.itemText, darkMode && styles.darkText]}>
            🌙 Dark Mode
          </Text>
          <Switch value={darkMode} onValueChange={toggleDarkMode} />
        </View>

        <TouchableOpacity style={styles.item} onPress={showAbout}>
          <Text style={[styles.itemText, darkMode && styles.darkText]}>
            ℹ️ About
          </Text>
        </TouchableOpacity>
      </View>

      {/* LOGOUT */}
      <View style={[styles.card, darkMode && styles.darkCard]}>
        <TouchableOpacity style={styles.logoutItem} onPress={handleLogout}>
          <Text style={styles.logoutText}>🚪 Logout</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footerText}>© 2026 Video Platform</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    padding: 16,
  },

  /* DARK MODE */
  darkBg: {
    backgroundColor: "#020617",
  },
  darkCard: {
    backgroundColor: "#020617",
    borderWidth: 1,
    borderColor: "#1e293b",
  },
  darkText: {
    color: "#f8fafc",
  },

  /* HEADER */
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  header: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0f172a",
  },
  backText: {
    fontSize: 22,
    color: "#2563eb",
    fontWeight: "700",
  },

  /* CARD */
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginBottom: 16,
    elevation: 4,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#64748b",
    marginVertical: 10,
  },

  item: {
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  itemText: {
    fontSize: 16,
    color: "#020617",
  },

  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },

  /* LOGOUT */
  logoutItem: {
    paddingVertical: 14,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#dc2626",
    textAlign: "center",
  },

  footerText: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 12,
    color: "#94a3b8",
  },
});
