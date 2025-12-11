import {AdvancedMarker, APIProvider, Map} from '@vis.gl/react-google-maps';
import '../index.css';

//iNFORMACION SOBRE LIBRERIA  https://github.com/visgl/react-google-maps 

 const position = {
     lat: -32.4837462, 
     lng: -58.2315257  
 };

function MapaOficina() {
    const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY; 

    return (
      <div className='h-full w-full min-h-[300px] md:min-h-[400px] rounded-lg overflow-hidden shadow-md'>
           <APIProvider apiKey={API_KEY}>
              <Map style={{ width: '100%', height: '100%' }} defaultCenter={position} defaultZoom={15} mapId="UBICACION_OFICINA">
                <AdvancedMarker position={position} />
              </Map>
          </APIProvider>
      </div>      
        
    );
}

export default MapaOficina;