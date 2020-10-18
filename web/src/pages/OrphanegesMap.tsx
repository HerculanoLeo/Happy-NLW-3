import React, { useEffect, useState } from 'react';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Leaflet from 'leaflet'

import mapMarkerImg from '../images/map-marker.svg';
import '../styles/pages/orphaneges-map.css';
import mapIcon from '../Utils/mapIcon';
import api from '../service/api';
import Orphanage from '../Interfaces/Orphanage';

function OrphanegesMap() {

  const mark = Leaflet.latLng([-23.187878, -46.887724])

  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    api.get("orphanages").then(response => {
      setOrphanages(response.data);
    })
  }, [])

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy" />

          <h2>Escolha um orfanato no mapa.</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Jundiaí</strong>
          <span>São Paulo</span>
        </footer>
      </aside>

      <Map center={mark} zoom={15} style={{ width: '100%', height: '100%' }}>

        <TileLayer url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png' />

        {orphanages.map(orphanage => {
          return (
            <Marker
              position={[orphanage.latitude, orphanage.longitude]}
              icon={mapIcon}
              key={orphanage.id}
            >
              <Popup closeButton={false} maxWidth={240} minWidth={240} className='map-popup'>
                {orphanage.name}
                <Link to={`/orphanages/${orphanage.id}`}>
                  <FiArrowRight size={20} color='#FFF' />
                </Link>
              </Popup>
            </Marker>
          )
        })}

      </Map>

      <Link to='/orphanages/create' className="create-orphanege" >
        <FiPlus size={32} color="#FFF" />
      </Link>

    </div>
  )
}

export default OrphanegesMap;