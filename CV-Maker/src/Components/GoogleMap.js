import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import React, { Component } from 'react'
import '../CSS/Maps.css'


export class GoogleMap extends Component {

  render() {

    return (
      <div className="mapBox">
        <Map
          initialCenter={this.props.position}
          center={this.props.position}
          google={this.props.google} zoom={14}
          style={{ width: '100%', height: '695px', position: 'relative' }}
        >
          <Marker
            title={'Selected position'}
            name={'Your position'}
            position={this.props.position}
          />

        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("PutYourAPIKeyHere")
})(GoogleMap)