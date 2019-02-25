import React, { Component } from 'react';
import './App.css';
import FilterComponent from './component/FilterComponent'
import Container from './component/Container'


class App extends Component {

    componentWillMount() {
        this.setState({
            map_markers: [] ,
            persist_datas :[],
            filtered_markers : [],
            showingSidebar : true
        })
    }

    updateMarkerByQuery = (filtered_locations) => {
        this.setState({
            filtered_markers : filtered_locations
        })
    }


    toggleSideBar = () => {
        const {showingSidebar}  = this.state
          this.setState(
              {
                  showingSidebar : !showingSidebar
              }
          )
   }

    componentDidMount() {
        const url = [
            // Length issue
            `https://gist.githubusercontent.com`,
            `/HoldenChen/3e23638d44149a138e2c690fd7ac7564`,
            `/raw/2615e7f0c257e050e157493661e6aad0adc8975e/data3.json`
        ].join("")

        fetch(url)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    map_markers: data.locations,
                    persist_datas : data.locations,
                    filtered_markers : data.locations
                    }
                );
            });
    }

  render() {
    return (
      <div className="container">

          <div className='wrapper'>
              {
                  this.state.showingSidebar ? <div className='filter_wrapper_div'>
                      <FilterComponent
                          filter_markers = {this.state.map_markers }
                          filter_persist_datas = {this.state.persist_datas}
                          {...this.props}
                          updateMapMarker = {locations => this.updateMarkerByQuery(locations)}/>
                  </div> : <div></div>
              }

              <div className='content'>
                  <Container
                      markers = {this.state.map_markers}
                      filtered_markers = {this.state.filtered_markers}
                      toggle = {()=>this.toggleSideBar()}
                  />
              </div>
          </div>



      </div>
    );
  }
}

export default App;
