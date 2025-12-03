import { createDish } from "@/database/sqlite";
import { mongoCreate } from "@/services/mongoService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function DishForm() {
  const [dbType, setDbType] = useState<"sqlite" | "mongodb">("sqlite");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  console.log("dbType atual:", dbType);

  useEffect(() => {
    AsyncStorage.getItem("db_type").then((value) => {
      setDbType(value === "mongodb" ? "mongodb" : "sqlite");
    });
  }, []);

  async function save() {
    if (!name || !price) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    try {
      if (dbType === "mongodb") {
        await mongoCreate({ name, price: Number(price) });
      } else {
        await createDish(name, Number(price));
      }

      Alert.alert("Sucesso", "Prato salvo!");
      setName("");
      setPrice("");
    } catch (err) {
      console.log(err);
      Alert.alert("Erro ao salvar prato");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome</Text>
      <TextInput value={name} onChangeText={setName} style={styles.input} />

      <Text style={styles.label}>Preço</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
      />

      <Button title="Salvar" onPress={save} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, gap: 15 },
  label: { fontSize: 16, fontWeight: "600" },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    borderColor: "#aaa",
  },
});
