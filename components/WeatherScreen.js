import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import axios from 'axios';
import MapView, { Marker } from 'react-native-maps'; 
import { API_KEY } from '@env';

function WeatherScreen({ route }) {
  const { city } = route.params;
  const [weather, setWeather] = useState('');
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      console.log(`Fetching weather for: ${city}`);
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

      try {
        const response = await axios.get(url);
        console.log(response.data);
        setWeather(`Current Temperature: ${response.data.main.temp}°C\nConditions: ${response.data.weather[0].main}`);
        const { lat, lon } = response.data.coord;
        setCoords({
          latitude: lat,
          longitude: lon,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      } catch (error) {
        console.error(error);
        setWeather('Weather not found! Please try another city.');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <Text style={styles.weather}>{weather}</Text>
          {coords && (
            <MapView
              style={styles.map}
              region={coords}
              showsUserLocation={true}
            >
              <Marker
                coordinate={{ latitude: coords.latitude, longitude: coords.longitude }}
                title={city}
              />
            </MapView>
          )}
        </>
      )}
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
  weather: {
    marginBottom: 20,
    textAlign: 'center',
  },
  map: {
    width: Dimensions.get('window').width ,
    height: Dimensions.get('window').height - 200,  
  },
});

export default WeatherScreen;
