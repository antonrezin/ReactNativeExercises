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
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [result, setResult] = useState(0);
  const [data, setData] = useState([]);

  const handleMinus = () => {
    const operationResult = parseInt(value1) - parseInt(value2);
    setResult(operationResult);
    addHistory(`${value1} - ${value2} = ${operationResult}`);
  };

  const handleSum = () => {
    const operationResult = parseInt(value1) + parseInt(value2);
    setResult(operationResult);
    addHistory(`${value1} + ${value2} = ${operationResult}`);
  };

  const addHistory = (operation) => {
    setData([...data, { key: operation }]);
    setValue1("");
    setValue2("");
  };

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
      <TextInput
        style={{
          width: 200,
          borderColor: "gray",
          borderWidth: 1,
          margin: 1,
          textAlign: "center",
        }}
        onChangeText={(text) => setValue1(text)}
        defaultValue={value1}
        keyboardType="numeric"
      />
      <TextInput
        style={{
          width: 200,
          borderColor: "gray",
          borderWidth: 1,
          margin: 1,
          textAlign: "center",
        }}
        onChangeText={(text) => setValue2(text)}
        defaultValue={value2}
        keyboardType="numeric"
      />
      <View style={{ flexDirection: "row" }}>
        <Button title="-" onPress={handleMinus} />
        <Button title="+" onPress={handleSum} />
      </View>
      <Text style={{ textAlign: "center" }}>History</Text>
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
