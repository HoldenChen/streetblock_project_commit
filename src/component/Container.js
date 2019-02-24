import React, {Component} from 'react';

import PropTypes from 'prop-types';

import WithMarkers from './MapWithMarkers'

// import styles from './styles.module.css';

import {GoogleApiWrapper} from 'google-maps-react'

class Container extends Component {
    static propTypes = {};

    static contextTypes = {
        router: PropTypes.object
    };

    render() {
        return (
            <WithMarkers google={this.props.google}
                         loaded={this.props.loaded}
                         filter_markers = {this.props.filtered_markers}
                         {...this.props}
            />
        );
    }
}

const Loading = () => <div>Fancy loading container</div>;

export default
    GoogleApiWrapper({
        apiKey: 'AIzaSyBq_kkDXGXgIGXOvEiACvspMAM2PvlhN_Y',
        libraries: ['places', 'visualization'],
        LoadingContainer: Loading
    })(Container)
