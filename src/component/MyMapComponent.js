/*global google*/

import React from 'react'
import { compose, withProps , withStateHandlers} from 'recompose'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

import * as four_api from '../api/foursquar_api'

import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox'


const MyMapComponent = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBq_kkDXGXgIGXOvEiACvspMAM2PvlhN_Y&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
        center: { lat: 31.2287016, lng: 121.4730378 },
    }),
    withStateHandlers(() => ({
        isOpen : false,
        currentClickedId : -1,

    }), {
        onToggleOpen: ({isOpen }) => (currentid) => (

            {
                isOpen : !isOpen,
                currentClickedId : currentid
            }
        ),
    }
    ),
    withScriptjs,
    withGoogleMap
)(props =>
    <GoogleMap
        defaultZoom={15}
        defaultCenter={props.center}
    >
            {
                props.markers.map(marker => (
                <Marker
                    key={marker.location_id}
                    position={{ lat: marker.lat, lng: marker.long }}
                    onClick = {(event) => {
                        props.onToggleOpen( marker.location_id )
                        }
                    }
                >
                    {
                        console.log(`${props.currentClickedId}   ${props.isOpen}` )
                    }
                    {( props.currentClickedId === marker.location_id) && <InfoBox
                        onCloseClick={props.onToggleOpen}
                        options={{ closeBoxURL: ``, enableEventPropagation: true }}
                    >


                        <div style={{ backgroundColor: `yellow`, opacity: 0.75, padding: `12px` }}>
                            {
                                four_api.search(marker.location_title,`${marker.lat},${marker.lng}`).then(
                                    res => res.json()
                                ).then(
                                    data => console.log(data)
                                )
                            }

                            <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
                                Hello, {marker.location_title}!
                            </div>
                        </div>
                    </InfoBox>}


                </Marker>
            ))}
    </GoogleMap>
);



export  default MyMapComponent