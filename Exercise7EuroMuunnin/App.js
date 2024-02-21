import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Image } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function App() {
  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    const fetchCurrencies = () => {
      fetch("https://api.apilayer.com/exchangerates_data/latest", {
        headers: { apikey: "JnPXPD6uUISLh2RlBXuSXbj0O8wpzczJ" },
      })
        .then((response) => response.json())
        .then(({ rates }) => {
          const currencyCodes = Object.keys(rates).filter(
            (currency) => currency !== "EUR"
          );
          setCurrencies(currencyCodes);
          setSelectedCurrency(currencyCodes[0] || "");
        })
        .catch((error) =>
          console.error("Error fetching currency rates", error)
        );
    };

    fetchCurrencies();
  }, []);

  const convertCurrency = () => {
    const apiKey = "JnPXPD6uUISLh2RlBXuSXbj0O8wpzczJ";
    const url = `https://api.apilayer.com/exchangerates_data/latest?symbols=EUR&base=${selectedCurrency}`;

    fetch(url, { headers: { apikey: apiKey } })
      .then((response) => response.json())
      .then(({ rates }) => {
        setConvertedAmount(parseFloat(amount) * rates["EUR"]);
      })
      .catch((error) => console.error("Error converting currency", error));
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.picture}
        source={{
          uri: "https://media.istockphoto.com/id/620368398/photo/gold-euro-symbol.jpg?s=612x612&w=0&k=20&c=ifLlaWhFRMUUggaMsaex13wWR6AWg4cVSFkZIgN3sWs=",
        }}
      />
      <Text style={styles.label}>EUR Converter</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={selectedCurrency}
            onValueChange={setSelectedCurrency}
          >
            {currencies.map((currency) => (
              <Picker.Item key={currency} label={currency} value={currency} />
            ))}
          </Picker>
        </View>
      </View>

      <Button
        title="Convert to EUR"
        onPress={convertCurrency}
        color="#2196F3"
      />

      {convertedAmount !== null && (
        <Text style={styles.resultText}>
          Converted amount: {convertedAmount.toFixed(2)} €
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 8,
    borderRadius: 8,
    marginRight: 8,
    textAlign: "center",
  },
  pickerContainer: {
    flex: 1,
    borderRadius: 8,
    overflow: "hidden",
  },
  picker: {
    height: 40,
    borderRadius: 8,
    backgroundColor: "#d3d3d3",
    width: "100%",
  },
  resultText: {
    marginTop: 20,
    fontSize: 18,
    textAlign: "center",
  },
  picture: {
    width: 200,
    height: 200,
    borderColor: "gray",
  },
});
