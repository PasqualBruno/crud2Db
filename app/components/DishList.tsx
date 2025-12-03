import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { deleteDish, getAllDishes } from "@/database/sqlite";
import { mongoDelete, mongoGetAll } from "@/services/mongoService";
import { Dish } from "../types/Dish";

export default function DishList() {
  const [dbType, setDbType] = useState<"sqlite" | "mongodb" | null>(null);
  const [items, setItems] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);

  // Carregar qual banco usar
  useEffect(() => {
    async function loadDB() {
      const v = await AsyncStorage.getItem("db_type");
      const type = v === "mongodb" ? "mongodb" : "sqlite";
      setDbType(type);
    }
    loadDB();
  }, []);

  // Carregar lista APÓS dbType estar definido
  useEffect(() => {
    if (!dbType) return;

    async function loadData() {
      setLoading(true);

      if (dbType === "mongodb") {
        const result = await mongoGetAll();
        setItems(result);
      } else {
        const result = await getAllDishes();
        setItems(result);
      }

      setLoading(false);
    }

    loadData();
  }, [dbType]);

  async function remove(item: Dish) {
    if (!dbType) return;

    if (dbType === "mongodb") {
      await mongoDelete(item._id!);
    } else {
      await deleteDish(item.id!);
    }

    // Recarregar lista após excluir
    if (dbType === "mongodb") {
      setItems(await mongoGetAll());
    } else {
      setItems(await getAllDishes());
    }
  }

  // Não mostrar nada até dbType estar carregado
  if (!dbType) {
    return (
      <View style={{ padding: 20 }}>
        <ActivityIndicator size="large" />
        <Text>Carregando banco escolhido...</Text>
      </View>
    );
  }

  // Mostrar loading enquanto busca dados
  if (loading) {
    return (
      <View style={{ padding: 20 }}>
        <ActivityIndicator size="large" />
        <Text>Carregando dados...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listagem de pratos ({dbType})</Text>

      {items.length === 0 && <Text>Nenhum prato cadastrado...</Text>}

      {items.map((item: Dish) => (
        <View key={(item.id ?? item._id)!} style={styles.card}>
          <Text style={styles.name}>{item.name}</Text>
          <Text>R$ {item.price}</Text>

          <Button title="Excluir" color="#d33" onPress={() => remove(item)} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, gap: 10 },
  title: { fontSize: 20, fontWeight: "bold" },
  card: {
    padding: 15,
    backgroundColor: "#eee",
    borderRadius: 8,
    marginTop: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
  },
});
