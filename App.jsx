import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function App() {

  const [dogData, setDogData] = useState(null);
  const [error, setError] = useState(null);
  const [dogImage, setDogImage] = useState('');
  const handleDogImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
  
    if (!result.canceled) {
      setDogImage(result.assets[0].uri),
      setDogData(null)
    }
  };
  

  const dogImageDelete = () => {
    setDogImage(''); 
    setDogData('');
  }

  const fetchDogApp = async () => {
    try {
      const res = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await res.json();
      setDogData(data);
      setDogImage(null);
      setError(null);
    } catch (error) {
      console.error(error);
      setError('Error fetching Dog data');
    }
  };

  useEffect(() => {
    fetchDogApp();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Random Dog App</Text>

        {error && <Text>{error}</Text>}

        <View style={styles.clima}>
          {dogData && (<Image style={styles.imgdog} source={{ uri: dogData.message }}/>)}
          {dogImage && (<Image style={styles.imgdog} source={{ uri: dogImage }}/>)}
        </View>

        <TouchableOpacity style={styles.button} onPress={fetchDogApp}>
          <Text>RANDOM</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleDogImage}>
          <Text>SELECT</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={dogImageDelete}>
          <Text>DELETE</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#59D5E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#F4538A',
    width: 250,
    height: 35,
    marginLeft: 48,
    marginVertical: 20,
    color: 'white',
  },
  button: {
    backgroundColor: '#FAA300',
    width: 250,
    height: 35,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    marginLeft: 48,
  },
  imgdog: {
    width: 300,
    height: 300,
  },
  clima: {
    width: 350,
    height: 350,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
