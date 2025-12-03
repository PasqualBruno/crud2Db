import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DishForm from "./components/DishForm";
import DishList from "./components/DishList";

export default function Index() {
  const router = useRouter();
  const [tab, setTab] = useState<"list" | "form" | "settings">("list");

  async function resetDBSelection() {
    await AsyncStorage.clear();
    router.replace("/selectdb");
  }

  return (
    <View style={{ flex: 1, paddingTop: 60 }}>
      <View style={styles.chipContainer}>
        <TouchableOpacity
          style={[styles.chip, tab === "list" && styles.chipActive]}
          onPress={() => setTab("list")}
        >
          <Text style={styles.chipText}>Listagem</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.chip, tab === "form" && styles.chipActive]}
          onPress={() => setTab("form")}
        >
          <Text style={styles.chipText}>Formulário</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.chip, tab === "settings" && styles.chipActive]}
          onPress={() => setTab("settings")}
        >
          <Text style={styles.chipText}>Config</Text>
        </TouchableOpacity>
      </View>

      {/* Conteúdo das abas */}
      <View style={{ flex: 1 }}>
        {tab === "list" && <DishList />}
        {tab === "form" && <DishForm />}
        {tab === "settings" && (
          <View style={{ padding: 20 }}>
            <Text
              style={{ fontSize: 20, fontWeight: "bold", marginBottom: 15 }}
            >
              Configurações
            </Text>

            <Button
              title="Trocar banco de dados"
              color="#d33"
              onPress={resetDBSelection}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chipContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginBottom: 20,
  },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#ddd",
    borderRadius: 20,
  },
  chipActive: {
    backgroundColor: "#4A90E2",
    color: "#fff",
  },
  chipText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
