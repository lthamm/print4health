import React from 'react';
import { Config } from '../../config';
import ThingList from './../../component/thing/list.js';
import Search from './../../component/search/search';
import axios from 'axios';

class ThingListContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      things: [],
    };
    this.executeSearch = this.executeSearch.bind(this);
  }

  componentDidMount() {
    this.executeSearch('');
  }

  executeSearch(query) {
    query = query.trim();
    let url = Config.apiBasePath + '/things';
    if (query.length > 0) {
      url += '/search/' + query;
    }

    axios.get(url)
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
        <div className="row">
          <div className="col-xl-6 offset-xl-3">
            <Search executeSearch={this.executeSearch} />
          </div>
        </div>
        <div className="row mt-5">
          <div className="col">
            <div className="row">
              <div className="col">
                <h2>
                  <i className="fas fa-user-md fa-fw mr-2"></i>
                  Bedarf an Ersatzteilen
                </h2>
                <p>
                  Du benötigst dringend Infektionsschutz oder Ersatzteile für Geräte?
                </p>
                <p>
                  Hier findest Du eine Übersicht der druckbaren Produkte.<br />
                  Für diese Produkte existieren bereits Vorlagen um eine direkte Fertigung zu realisieren.
                </p>
                <p>
                  Teile, für die bereits bestätigt wurde, dass sie gedruckt sind, sind grün gekennzeichnet!
                </p>
              </div>
              <div className="col">
                <h2>
                  <i className="fas fa-print fa-fw mr-2"></i>
                  Dein Drucker steht noch still?
                </h2>
                <p>
                  Dann schaue hier, ob Du Deine Kapazität einsetzen kannst!
                </p>
                <p>
                  Besteht bei bestimmten Produkten noch Druckbedarf, so ist dies in rot gekennzeichnet. Hilf mit die
                  bestehende Nachfrage nach den benötigten Produkten zu decken!
                </p>
              </div>
              <div className="col">
                <h2>
                  <i className="fas fa-question-circle fa-fw mr-2"></i>
                  Für Dein gewünschtes Produkt existiert noch keine Druckvorlage?
                </h2>
                <p>
                  Wende Dich mit den Anforderungen an unsere Community und entwickle gemeinsam die Druckvorlage für
                  Deinen konkreten Anwendungsfall.
                </p>
              </div>
            </div>

          </div>
        </div>
        <div className="row">
          <div className="col">
            <ThingList things={things} />
          </div>
        </div>
      </div>
    );
  }
}

export default ThingListContainer;
