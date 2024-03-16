import React, { useState, useEffect } from "react";
import { StatusBar, Alert } from "expo-status-bar";
import * as Location from "expo-location";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Keyboard,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

export default function App() {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("No permission to get location");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setLocation({
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      setCoordinates({ latitude, longitude });
    })();
  }, []);

  const handleMapPress = () => {
    Keyboard.dismiss();
  };

  handleShowButton = () => {
    Keyboard.dismiss();
    const apiKey = "apiKey";

    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        const { lat, lng } = data.results[0].geometry.location;
        setCoordinates({
          latitude: parseFloat(lat),
          longitude: parseFloat(lng),
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
        });
      })
      .catch((error) => {
        console.error("Error Fetching Coordinates:", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search for Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={(text) => setAddress(text)}
      />
      <Button title="Show" onPress={handleShowButton} />
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={coordinates}
        onPress={handleMapPress}
      >
        {coordinates && <Marker coordinate={coordinates} title={address} />}
      </MapView>
      <StatusBar style="auto" />
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
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
  input: {
    textAlign: "center",
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  map: {
    width: "100%",
    height: "70%",
    marginTop: 20,
  },
});
