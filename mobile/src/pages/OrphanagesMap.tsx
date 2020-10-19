import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';

import mapMarker from '../images/map-marker.png';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import api from '../services/api';
import Orphanage from '../Interfaces/Orphanage';

function OrphanagesMap() {

  const navigation = useNavigation();

  const [orphanages, setOrphanages] = useState<Orphanage[]>([])

  const incialRegion: Region = {
    latitude: -23.1884808,
    longitude: -46.8836557,
    latitudeDelta: 0.008,
    longitudeDelta: 0.008,
  }

  useFocusEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data);
    })
  })


  function handleNavigateOrphanageDetails(id : number) {
    navigation.navigate('OrphanageDetails', {
      id
    });
  }

  function handleNavigatToCreateOrphanage() {
    navigation.navigate('SelectMapPosition');
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={incialRegion} >


        {orphanages.map(orphanage => {
          return (
            <Marker
              key={orphanage.id}
              icon={mapMarker}
              coordinate={{
                latitude: orphanage.latitude,
                longitude: orphanage.longitude
              }}
              calloutAnchor={{
                x: 1.7,
                y: 0.
              }}
            >
              <Callout tooltip onPress={() => handleNavigateOrphanageDetails(orphanage.id)}>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutText}>{orphanage.name}</Text>
                </View>
              </Callout>
            </Marker>
          )
        })}


      </MapView>

      <View style={styles.footer}>
      <Text style={styles.footerText}>{ orphanages.length } { orphanages.length > 1 ? 'Orfanatos encontrados.' : 'Orfanato encontrado.' } </Text>

        <TouchableOpacity style={styles.createOrphanagesButton} onPress={handleNavigatToCreateOrphanage}>
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