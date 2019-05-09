import React from 'react';
import { withRouter } from 'react-router-dom'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import '../CSS/Maps.css'


var lock = false;
const initState = {
  address: '',
  position: {
    lat: "",
    lng: ""
  }
}

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state={...initState}
  }
 
  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    this.setState({ address: address })
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.setState({ position: latLng }, () => {
        this.props.history.push({
          pathname: "/",
          state: this.state,
        })
        this.setState(initState)
      })
      )
      .catch(error => console.error('Error', error));
  };

  // componentDidUpdate() {//you need to check a spefipic value against value and not object against object
  //   if ((this.props.location.state.position.lat !== this.state.position.lat) && (this.props.location.state.position.lng !== this.state.position.lng)) {
  //       this.setState({position: this.props.location.state})
  //   }
  // }

  render() {
    
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Insert your location...',
                className: 'location-search-input inputSearch',
              })}
            />
            <div className={this.state.address ? "autocomplete-dropdown-container suggestionDiv" : "autocomplete-dropdown-container "}>
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#FFEFBA', cursor: 'pointer', border: "1px solid gray", borderRadius: "5px" }
                  : { backgroundColor: 'rgb(255, 255, 255, 0.8)', cursor: 'pointer', };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default withRouter(LocationSearchInput)