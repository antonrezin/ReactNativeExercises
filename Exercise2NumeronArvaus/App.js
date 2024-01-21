import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native';

export default function App() {
  const [guess, setGuess] = useState('');
  const [targetNumber, setTargetNumber] = useState(generateRandomNumber());
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState('Guess a Number Between 1-100');

  function generateRandomNumber() {
    return Math.floor(Math.random() * 100 + 1);
  }

  function handleGuess() {
    const userGuess = parseInt(guess);

    if (userGuess < 1 || userGuess > 100) {
      Alert.alert('Error! \n Guess a number between \n 1-100');
    }

    setAttempts(attempts + 1);

    if (userGuess === targetNumber) {
      Alert.alert(`Correct! \n You guessed number in ${attempts} guesses.`);
      setTargetNumber(generateRandomNumber());
      setAttempts(0);
      setGuess('');
    } else if (userGuess < targetNumber) {
      setMessage(`Your guess ${guess} is too low`);
    } else if (userGuess > targetNumber) {
      setMessage(`Your guess ${guess} is too high`);
    }
    
  }

  return (
    <View style={styles.container}>
      <View>
        <Text>{message}</Text>
      </View>
      <View>
        <TextInput
          style={{
            width: 50,
            borderColor: 'gray',
            borderWidth: 1,
            margin: 5,
            textAlign: 'center'
          }}
          keyboardType='numeric'
          onChangeText={text => setGuess(text)}
          value={guess}
        />
      </View>
      <View>
        <Button title="Make Guess" onPress={handleGuess} />
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
