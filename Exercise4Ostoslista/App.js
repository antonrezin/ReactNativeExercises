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
      <View>
        <Text>Add to Shopping List</Text>
      </View>
      <View>
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
      </View>
      <View style={{ flexDirection: "row", marginTop: 30 }}>
        <Button title="Add" onPress={handleAdd} />
        <Button title="Clear" onPress={handleClear} />
      </View>
      <View style={{ height: 400, margin: 30 }}>
        <View>
          <Text style={{ textAlign: "center", color: "blue" }}>
            Shopping List
          </Text>
        </View>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Text style={{ textAlign: "center" }}>{item.key}</Text>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
