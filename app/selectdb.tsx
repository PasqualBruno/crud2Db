import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SelectDB() {
  const router = useRouter();

  async function choose(dbType: string) {
    await AsyncStorage.setItem("db_type", dbType);
    router.replace("/"); // navega para a tela inicial (index)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecione o banco de dados</Text>

      <TouchableOpacity style={styles.button} onPress={() => choose("mongodb")}>
        <Text style={styles.textButton}>MongoDB</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => choose("sqlite")}>
        <Text style={styles.textButton}>SQLite</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 30 },
  button: {
    backgroundColor: "#ddd",
    padding: 20,
    borderRadius: 12,
    width: "70%",
    alignItems: "center",
    marginBottom: 20,
  },
  textButton: { fontSize: 18 },
});
