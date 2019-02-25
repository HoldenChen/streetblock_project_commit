import React, { Component } from 'react';
import { Map, InfoWindow, Marker } from 'google-maps-react';
import * as foursquarapi from '../api/foursquar_api'


class WithMarkers extends Component {
    state = {
        activeMarker: {},
        selectedPlace: {},
        showingInfoWindow: false,
        markers : this.props.markers,
        fetchApiComplete : false,
        foursquareVenue : {}
    };

    onMarkerClick = (props, marker) => {

        const that = this
        this.setState({
            activeMarker: marker,
            selectedPlace: props,
            showingInfoWindow: true,
            fetchApiComplete : false
        });

        const selectedPlace = this.state.selectedPlace
        const ll = `${selectedPlace.position.lat},${selectedPlace.position.lng}`
        foursquarapi.getVenusDetailsByKey(selectedPlace.name,ll)
            .then(
                    res => {
                        const ven = res.response.venue
                        that.setState({
                            foursquareVenue : ven,
                            fetchApiComplete : true
                        })
                    }
            ).catch( e => {
                alert(`${e}  please try latter`)
        })
    }


    onInfoWindowClose = () =>{
        this.setState({
            activeMarker: null,
            showingInfoWindow: false
        });
    }


    onMapClicked = () => {
        if (this.state.showingInfoWindow)
            this.setState({
                activeMarker: null,
                showingInfoWindow: false
            });
    };

    render() {
        if (!this.props.loaded) return <div>Something Wrong ,pls check your network. For more information,see Console output.</div>
        const { markers } = this.state
        const {filtered_markers} = this.props
        return (
            <Map
                google={this.props.google}
                onClick={this.onMapClicked}
                initialCenter={{ lat: 31.2287016, lng: 121.4730378 }}
                style={{ height: '100%', position: 'relative', width: '100%' }}
                zoom={15}>

                {
                    filtered_markers.length!== markers.length  &&  filtered_markers
                        .map(
                            marker => (
                               <Marker
                                   key = { marker.location_id }
                                   name = { marker.location_title }
                                   position ={
                                       {
                                           lat: marker.lat,
                                           lng: marker.long
                                       }
                                   }
                                   onClick = {this.onMarkerClick}
                               />
                            )
                        )
                }

                {
                    filtered_markers.length === markers.length && markers.map(
                        marker => (
                            <Marker
                                key = { marker.location_id }
                                name = { marker.location_title }
                                position ={
                                    {
                                        lat: marker.lat,
                                        lng: marker.long
                                    }
                                }
                                onClick = {this.onMarkerClick}
                            />
                        )
                    )

                }

                <InfoWindow
                    marker={this.state.activeMarker}
                    onClose={this.onInfoWindowClose}
                    visible={this.state.showingInfoWindow}>
                    <div>
                        {
                            this.state.fetchApiComplete && <div>
                                <p > <h3 className='detail_text_color'>{this.state.foursquareVenue.name}</h3></p>
                                <p className='detail_text_color'>地址：{this.state.foursquareVenue.location.address}</p>
                                <a href={this.state.foursquareVenue.canonicalUrl}>在 foursquare 上查看</a>
                            </div>
                        }

                        {
                            !this.state.fetchApiComplete && <div>
                                <h1>Loading</h1>
                            </div>
                        }
                    </div>

                </InfoWindow>
            </Map>
        );
    }
}

export default WithMarkers;
