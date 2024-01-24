import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
} from "react-native";

export default function App() {
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);

  const handleAdd = () => {
    setData([...data, { key: value }]);
    setValue("");
  };

  const handleClear = () => {
    setData("");
  };

  return (
    <View style={styles.container}>
      <Text>Add to Shopping List</Text>
      <TextInput
        style={{
          width: 200,
          borderColor: "gray",
          borderWidth: 1,
          margin: 1,
          textAlign: "center",
        }}
        onChangeText={(text) => setValue(text)}
        defaultValue={value}
      />
      <View style={{ flexDirection: "row", marginTop: 30 }}>
        <Button title="Add" onPress={handleAdd} />
        <Button title="Clear" onPress={handleClear} />
      </View>
      <Text style={{ textAlign: "center", color: "blue" }}>Shopping List</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 5,
  },
});
