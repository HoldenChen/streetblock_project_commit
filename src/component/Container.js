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

    handleToggleClicked = () =>{
        this.props.toggle()

    }

    handleKeyDown = () =>{
        this.props.toggle()
    }





    render() {
        return (

            <div>
                <WithMarkers google={this.props.google}
                             loaded={this.props.loaded}
                             filter_markers = {this.props.filtered_markers}
                             {...this.props}
                />

                <i role='img' className='container_toggle' onClick={(event) => this.handleToggleClicked()}
                  onKeyDown={event => this.handleKeyDown()
                  }
                   tabIndex='0'
                >
                    <svg viewBox="0 0 32 32"  xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 23a1 1 0 0 1 0-2h16a1 1 0 0 1 0 2H8zm0-6a1 1 0 0 1 0-2h16a1 1 0 0 1 0 2H8zm0-6a1 1 0 0 1 0-2h16a1 1 0 0 1 0 2H8z" fillRule="nonzero">
                        </path>
                    </svg>
                </i>

            </div>

        )
    }

}



class LoadingContainer extends Component {
    state = {
        content : 'Loading...'
    }


    componentDidMount(){
        this.timer = setTimeout(
            () => {
                this.setState(
                    {
                        content : 'TimeOut, Pls Check your NerWork!'
                    }
                )
            }
            ,3000);
    }

    componentWillUnmount(){
        clearTimeout(this.timer)
    }


    render (){
        return (

            <div>
                {this.state.content}
            </div>
        )

    }

}

export default
    GoogleApiWrapper({
        apiKey: 'AIzaSyBq_kkDXGXgIGXOvEiACvspMAM2PvlhN_Y',
        libraries: ['places', 'visualization'],
        LoadingContainer: LoadingContainer
    })(Container)
