import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';

import mapMarker from '../images/map-marker.png';

function OrphanagesMap() {

  const incialRegion: Region = {
    latitude: -23.1884808,
    longitude: -46.8836557,
    latitudeDelta: 0.008,
    longitudeDelta: 0.008,
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={incialRegion} >
        <Marker
          icon={mapMarker}
          coordinate={incialRegion}
          calloutAnchor={{
            x: 1.7,
            y: 0.
          }}
        >

          <Callout tooltip onPress={() => alert('Oi')}>
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutText}>Lar das Meninas</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>2 Orfanatos encontrados.</Text>

        <TouchableOpacity style={styles.createOrphanagesButton} onPress={() => { }}>
          <Feather name="plus" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default OrphanagesMap;

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height
    },
    calloutContainer: {
      width: 160,
      height: 46,
      paddingHorizontal: 16,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderRadius: 16,
      justifyContent: 'center'
    },
    calloutText: {
      color: '#0089A5',
      fontSize: 14,
      fontFamily: 'Nunito_700Bold'
    },
    footer: {
      position: 'absolute',
      left: 24,
      right: 24,
      bottom: 32,
  
      backgroundColor: '#FFF',
      borderRadius: 20,
      height: 56,
      paddingLeft: 24,
  
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  
      elevation: 3
  
    },
    footerText: {
      color: '#8FA7B3',
      fontFamily: "Nunito_700Bold",
    },
    createOrphanagesButton: {
      width: 56,
      height: 56,
      backgroundColor: "#15C3D6",
      borderRadius: 20,
  
      justifyContent: 'center',
      alignItems: 'center'
    }
  });