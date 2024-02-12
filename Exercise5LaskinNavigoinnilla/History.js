import { View, Text, FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";

export default function History() {
  const route = useRoute();
  const { data } = route.params;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ margin: 10 }}>History</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Text style={{ textAlign: "center" }}>{item.key}</Text>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
