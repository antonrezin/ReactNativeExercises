import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Keyboard,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";

export default function App() {
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const [restaurants, setRestaurants] = useState([]);

  const handleMapPress = () => {
    Keyboard.dismiss();
  };

  const handleShowButton = () => {
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
        fetch(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=500&type=restaurant&key=${apiKey}`
        )
          .then((response) => response.json())
          .then((data) => {
            setRestaurants(data.results);
          })
          .catch((error) => {
            console.error("Error Fetching Restaurants:", error);
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
        {restaurants.map((restaurant, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: restaurant.geometry.location.lat,
              longitude: restaurant.geometry.location.lng,
            }}
          >
            <Callout>
              <Text style={styles.calloutTitle}>{restaurant.name}</Text>
              <Text>{restaurant.vicinity}</Text>
            </Callout>
          </Marker>
        ))}
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
  calloutTitle: {
    fontWeight: "bold",
  },
});
