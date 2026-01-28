import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  RefreshControl,
} from "react-native";
import { useEffect, useState } from "react";
import api from "../api/axiosClient";

export default function DashboardScreen({ navigation }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      const res = await api.get("/dashboard");
      setVideos(Array.isArray(res.data) ? res.data : []);
    } catch (e) {
      console.log("Dashboard error:", e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadVideos();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() =>
        navigation.navigate("VideoPlayer", { videoId: item.id })
      }
    >
      <Image
        source={{
          uri:
            item.thumbnail_url ||
            "https://via.placeholder.com/400x200.png?text=Video",
        }}
        style={styles.thumb}
      />

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.desc} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* 🔝 HEADER WITH SETTINGS */}
      <View style={styles.headerRow}>
        <Text style={styles.header}>📺 Video Dashboard</Text>

        <TouchableOpacity
          style={styles.settingsBtn}
          onPress={() => navigation.navigate("Settings")}
        >
          <Text style={styles.settingsText}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={videos}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        ListEmptyComponent={
          <View style={styles.center}>
            <Text style={{ color: "#64748b" }}>
              No videos available
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  /* HEADER */
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0f172a",
  },
  settingsBtn: {
    backgroundColor: "#e2e8f0",
    padding: 10,
    borderRadius: 12,
  },
  settingsText: {
    fontSize: 20,
  },

  /* CARD */
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    marginBottom: 18,
    overflow: "hidden",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  thumb: {
    height: 190,
    width: "100%",
    backgroundColor: "#e5e7eb",
  },
  info: {
    padding: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#020617",
  },
  desc: {
    marginTop: 6,
    fontSize: 14,
    color: "#475569",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
