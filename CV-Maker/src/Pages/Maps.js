import React, { Component } from 'react'
import * as mapAction from '../Store/action/locationAction'
import { connect } from 'react-redux'
import '../CSS/Maps.css'
import { Link, NavLink, withRouter } from 'react-router-dom'
import GMap from '../Components/GoogleMap'
import Search from '../Components/LocationSearchInput'


var usedLocation = 0;//we need to make better check=>
// if i turn it ON myLocation is dominant.
// if i turn it OFF searchInput is dominant.


const geocoder = new window.google.maps.Geocoder();

const initState = {
  address: "",
  position: {
    lat: "1",
    lng: "1"
  },
}

export class Maps extends Component {
  state = { ...initState }

  componentDidUpdate() {//you need to check a spefipic value against value and not object against object
    if(this.props.location.state){
      if ((this.props.location.state.position.lat !== this.state.position.lat) && (this.props.location.state.position.lng !== this.state.position.lng)) {
        if (!usedLocation) {
          this.setState(this.props.location.state, ()=>{this.props.locationTouched()})
        }
      }
    }
  }

  componentWillUnmount() {
    this.props.saveLocation(this.state)
    this.props.history.push({
      pathname: "/",
      state: this.state,
    })
  }

  componentDidMount() {
    if (this.props.locState.address) {
      this.setState(this.props.locState, () => { console.log("didMount setate=>", this.props.locState) })
    }
  }

  onClickHandler = () => {
    usedLocation = 1;
    navigator.geolocation.getCurrentPosition(this.locationSuccess, this.locationError);
  }

  locationSuccess = (pos) => {
    var crd = {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude,
    }
    let copyState = JSON.parse(JSON.stringify(this.state))
    copyState.position = crd
    this.setState(copyState, () => {
      this.getLocName(crd).then(res => {
        this.setState({ address: res }, () => {
          usedLocation = 0
        })
      }).catch(err => { console.log(err) })
    })
    this.props.locationTouched()
  }

  locationError = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  getLocName = (my_location) => {
    return new Promise((resolve, reject) => {
      var country = ""
      var city = ""
      geocoder.geocode({ 'latLng': my_location }, function (results, status) {
        if (status === window.google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            let adrs_comp = results[0].address_components, loc_name, area_name;
            for (let i = 0; i < adrs_comp.length; i++) {
              if (adrs_comp[i].types[0] === "country") {
                loc_name = adrs_comp[i].long_name;
                country = loc_name
              }
              if (adrs_comp[i].types[0] === "locality") {
                area_name = adrs_comp[i].long_name;
                city = area_name
              }
            }
          }
          if (country && city) {
            resolve({ country: country, city: city })
          }
          else {
            reject("error")
          }
        }
      })
    })
  }
  render() {
    return (
      <div style={{ position: "relative", zIndex: "3" }}>
        <span className="inputSearchContainer">
          <Search position={this.state.position} init={usedLocation} />
        </span>
        <span className="buttonContainer">
          <button onClick={() => { this.onClickHandler() }} className="btnStyle"><i className="fas fa-map-marker-alt" /><span>  Use my location</span></button>
        </span>
        <GMap position={this.state.position} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    locState: state.location,
    isTouched: state.location.locSaved
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveLocation: (data) => dispatch(mapAction.saveLocation(data)),
    locationTouched: () => dispatch(mapAction.locationTouched())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Maps))
