import React, { ChangeEvent, FormEvent, useState } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { FiPlus } from "react-icons/fi";

import '../styles/pages/create-orphanage.css';
import Sidebar from "../components/sidebar";
import mapIcon from "../Utils/mapIcon";
import { LatLng, LeafletMouseEvent } from "leaflet";
import api from "../service/api";
import { useHistory } from "react-router-dom";

export default function CreateOrphanage() {

  const history = useHistory()


  const [latLng, setLatLng] = useState<LatLng>(new LatLng(0, 0));
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstrictions] = useState('');
  const [opening_hours, setOpenigHours] = useState('');
  const [open_on_weekend, setOpenOnweekend] = useState(true);
  const [images, setImages] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<string[]>([])

  function handleClickMap(event: LeafletMouseEvent) {
    console.log(event.latlng);
    setLatLng(event.latlng);
  }

  function handleSelectImage(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {

      const selectedImages = Array.from(event.target.files);

      setImages(selectedImages);

      const selectedImagesPreview = selectedImages.map(image => {
        return URL.createObjectURL(image);
      })

      setPreviewImages(selectedImagesPreview);
    }
  }

  async function handleSubmit(event: FormEvent) {
    try {
      event.preventDefault();

      const data = new FormData();

      data.append('name', name)
      data.append('latitude', String(latLng.lat))
      data.append('longitude', String(latLng.lng))
      data.append('about', about)
      data.append('instructions', instructions)
      data.append('opening_hours', opening_hours)
      data.append('open_on_weekend', String(open_on_weekend))

      images.forEach(image => {
        data.append('images', image)
      })


      await api.post('orphanages', data);

      alert('Cadastro realizado com sucesso');

      history.push('/app');

    } catch (err) {
      console.log(err)
    }

  }

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form className="create-orphanage-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[-23.1891663, -46.8848351]}
              style={{ width: '100%', height: 280 }}
              zoom={13}
              onclick={handleClickMap}
            >
              <TileLayer
                url={`https://a.tile.openstreetmap.org/{z}/{x}/{y}.png`}
              />
              {latLng.lat !== 0 && (
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={latLng} />
              )}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea
                id="name"
                maxLength={300}
                value={about}
                onChange={(event) => setAbout(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map((image, index) => {
                  return (
                    <img key={index} src={image} alt={name} />
                  )
                })}

                <label className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                  <input multiple onChange={handleSelectImage} type='file' id='image[]' />
                </label>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={(event) => setInstrictions(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de Funcionamento</label>
              <input
                id="opening_hours"
                value={opening_hours}
                onChange={(event) => setOpenigHours(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  className={open_on_weekend ? 'active' : ''}
                  onClick={() => setOpenOnweekend(true)}
                >
                  Sim
                </button>

                <button
                  type="button"
                  className={!open_on_weekend ? 'active' : ''}
                  onClick={() => setOpenOnweekend(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
