import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

function Home({ navigation }) {
  const [city, setCity] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter City"
        value={city}
        onChangeText={setCity}
      />
      <Button
        title="Get Weather"
        onPress={() => navigation.navigate('Weather', { city })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    marginBottom: 20,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export default Home;
