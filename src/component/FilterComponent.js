import React, {  Component } from 'react'

import escapeRegExp from 'escape-string-regexp'


class FilterComponent extends Component {

    state = {
        query : '',
    }


    updateQuery = (key) => {
        const { filter_markers ,filter_persist_datas } = this.props
        console.log(filter_markers)
        key = key.trim()
        this.setState(
            {
                query:key
            }
        )
        let markers

        if(key){
            const match = new RegExp(escapeRegExp(key),'i')
            markers = filter_markers.filter(
                (marker) => match.test(marker.location_title)
            )

        }else{
            markers = filter_persist_datas
        }

        this.props.updateMapMarker(markers)
    }

    clearQuery = () => {
        this.updateQuery('')
    }

    render(){

        const { query  } = this.state
        const { filter_persist_datas } = this.props
        let showingLocations
        if(query){
            const match = new RegExp(escapeRegExp(query),'i')
            showingLocations = filter_persist_datas.filter(
                (location) => match.test(location.location_title)
            )
        }else{
            showingLocations = filter_persist_datas
        }

        return (
            <div className='address_filter'>
                <div >
                    <input className='filter_input'
                        type = 'text'
                        value = {query}
                        onChange={ (event) => this.updateQuery(event.target.value)}
                        placeholder= 'Search Location'
                    />
                </div>
                {
                    showingLocations.length !== filter_persist_datas.length && (
                        <div className='filter_msg_container_div'>
                            <span className='filter_result_msg_span'>Now Showing {showingLocations.length} of {filter_persist_datas.length} totally</span>
                            <button className='filter_btn' onClick={this.clearQuery}>Show All</button>
                        </div>
                    )
                }
                <ol>
                    {
                        showingLocations.map(
                            (location) => (
                                <li key = {location.location_id} >
                                    <div>
                                        <p>{location.location_title}</p>
                                    </div>
                                </li>
                            )
                        )
                    }
                </ol>
            </div>
        )
    }
}

export default FilterComponent