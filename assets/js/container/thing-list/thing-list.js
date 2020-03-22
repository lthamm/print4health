import React from 'react';
import { Config } from '../../config';
import ThingListItem from './../../component/thing/list-item.js';
import axios from 'axios';

class ThingList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      things: [],
    };
  }

  componentDidMount() {

    axios.get(Config.apiBasePath + '/things')
      .then((res) => {
        this.setState({
          isLoaded: true,
          things: res.data.things,
        });
      })
      .catch((error) => {
        this.setState({
          isLoaded: true,
          error,
        });
      });
  }

  render() {
    const { error, isLoaded, things } = this.state;
    if (error) {
      return <div className="alert alert-danger">Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <h2>Verfügbare 3D-Modelle / Ersatzteile</h2>
        <p>
          Diese 3D Modelle wurden bisher von unserem Team ausgewählt und stehen für...
          Lorem Ipsum Dolor sid
        </p>
        <div className="container">
          <div className="row">
              {things.map((thing, idx) => (
              <div className="col-md-4" key={idx} >
                <ThingListItem thing={thing} />
              </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default ThingList;
