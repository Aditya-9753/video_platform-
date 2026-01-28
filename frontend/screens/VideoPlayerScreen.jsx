import {
  View,
  ActivityIndicator,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Text,
} from "react-native";
import { useEffect, useState } from "react";
import { WebView } from "react-native-webview";
import api from "../api/axiosClient";

export default function VideoPlayerScreen({ route, navigation }) {
  const { videoId } = route.params;

  const [embedUrl, setEmbedUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVideo();
  }, []);

  const loadVideo = async () => {
    try {
      const tokenRes = await api.get(`/video/${videoId}/stream`);
      const token = tokenRes.data.playback_token;

      const playRes = await api.get(`/video/${videoId}/play`, {
        params: { token },
      });

      setEmbedUrl(playRes.data.embed_url);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      {/* 🔙 BACK BUTTON */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      {/* 🌐 WEB */}
      {Platform.OS === "web" ? (
        <iframe
          src={embedUrl}
          style={{ width: "100%", height: "100vh", border: "none" }}
          allow="autoplay; fullscreen"
        />
      ) : (
        <WebView
          source={{ uri: embedUrl }}
          style={{ flex: 1 }}
          javaScriptEnabled
          domStorageEnabled
          allowsFullscreenVideo
          mediaPlaybackRequiresUserAction={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backBtn: {
    position: "absolute",
    top: 40,
    left: 16,
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  backText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
