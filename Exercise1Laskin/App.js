import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [result, setResult] = useState(0);

  const handleMinus = () => {
    setResult(parseInt(value1) - parseInt(value2));
  }

  const handleSum = () => {
    setResult(parseInt(value1) + parseInt(value2));
  }

  return (
    <View style={styles.container}>
      <View>
        <Text>Result: {result}</Text>
      </View>
      <View>
        <TextInput
          style={{ width: 200, borderColor: 'gray', borderWidth: 1, margin: 1, textAlign: 'center' }}
          onChangeText={(text) => setValue1(text)}
          defaultValue={value1}
          keyboardType='numeric'
        />
      </View>
      <View>
        <TextInput
          style={{ width: 200, borderColor: 'gray', borderWidth: 1, margin: 1, textAlign: 'center' }}
          onChangeText={(text) => setValue2(text)}
          defaultValue={value2}
          keyboardType='numeric'
        />
      </View>
      <View style={{flexDirection:'row'}}>
      <Button title="-" onPress={handleMinus} />
      <Button title="+" onPress={handleSum} />
      </View>
    <View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
