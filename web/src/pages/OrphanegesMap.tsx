import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Map, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css'

import mapMarkerImg from '../images/map-marker.svg';
import '../styles/pages/orphaneges-map.css';

function OrphanegesMap() {

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

            <Map center={[-23.187878, -46.887724]} zoom={15} style={{ width: '100%', height: '100%' }}>
                <TileLayer url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png' />
            </Map>

            <Link to='' className="create-orphanege" >
                <FiPlus size={32} color="#FFF" />
            </Link>
        </div>
    )
}

export default OrphanegesMap;