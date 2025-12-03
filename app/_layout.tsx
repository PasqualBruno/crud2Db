import { initDB } from "@/database/sqlite";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

export default function Layout() {
  useEffect(() => {
    initDB();
  }, []);

  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    async function checkDB() {
      const selected = await AsyncStorage.getItem("db_type");

      // se o usuário abriu o app e não escolheu DB → vai para selectdb
      if (!selected && segments[0] !== "selectdb") {
        router.replace("/selectdb");
      }
    }

    checkDB();
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="selectdb" />
    </Stack>
  );
}
