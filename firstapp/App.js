import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';

export default function App() {
  const [message, setMessage] = useState('');

  const showAlert = () => {
    Alert.alert('Hello', 'Syötit Tekstin:' + message);
  }
  

  return (
    <View style={styles.container}>
      <TextInput style={{ width: 200, borderColor: 'grey', borderWidth: 1 }}
        onChangeText={text => setMessage(text)}
      />
      <Button title="Press Me" onPress={showAlert}/>
      <StatusBar style="auto" />
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
