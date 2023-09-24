import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { Marker, Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css";

const Map = ({handleLatLng, position, draggable}) => {

  const handleMarkerEvent = (e) => {
    if(!draggable) return
    handleLatLng(e.target._latlng.lat, e.target._latlng.lng)
  }

  return(
    <MapContainer center={position} style={{ height: '400px', width: '100%' }} zoom={13} scrollWheelZoom={false} >
        <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} draggable={draggable} eventHandlers={{dragend: handleMarkerEvent}}>
        <Popup>
            Drag the mark to set <br></br>the location of your property
        </Popup>
        </Marker>
    </MapContainer>
  )
}

export default Map;