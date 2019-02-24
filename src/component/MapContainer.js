import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'
import React, { Component } from 'react'

export class MapContainer extends Component{


    onMarkerClick = ()=> {

    }

    onInfoWindowClose = () => {

    }


    render(){
        return (
            <Map className='map' google={this.props.google} zoom={15}>
                <Marker
                  onClick = {this.onMarkerClick()}
                  name = {'current location'}
                />

                <InfoWindow
                  onClose = {this.onInfoWindowClose()}
                >
                    <div>
                        <h1>hello</h1>
                    </div>

                </InfoWindow>

            </Map>
        )
    }
}

export default GoogleApiWrapper(
        {
            apiKey: '',
        }


)(MapContainer)