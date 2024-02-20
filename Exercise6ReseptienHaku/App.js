import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  FlatList,
  Image,
} from "react-native";

export default function App() {
  const [ingredient, setIngredient] = useState("");
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
      .then((response) => response.json())
      .then((data) => setRecipes(data.meals))
      .catch((error) => {
        Alert.alert("Error", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Ingredient</Text>
      <TextInput
        style={styles.input}
        placeholder="Search Meals"
        value={ingredient}
        onChangeText={(text) => setIngredient(text)}
      />
      <Button title="Find" onPress={fetchRecipes} />
      <StatusBar style="auto" />

      <FlatList
        data={recipes}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <View style={styles.recipeContainer}>
            <Text style={styles.recipeText}>{item.strMeal}</Text>
            <Image
              source={{ uri: item.strMealThumb }}
              style={styles.recipeImage}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    textAlign: "center",
    marginBottom: 10,
    borderRadius: 30,
  },
  recipeContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
  recipeText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  recipeImage: {
    width: "90%",
    height: 200,
    borderRadius: 10,
  },
});
