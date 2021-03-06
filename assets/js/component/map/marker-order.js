import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { divIcon } from 'leaflet/dist/leaflet-src.esm';
import { Marker, Popup } from 'react-leaflet';
import PropTypes from 'prop-types';
import AppContext from '../../context/app-context';

class MarkerOrder extends React.Component {

  static get propTypes() {
    return {
      order: PropTypes.object,
      openModal: PropTypes.func
    };
  }

  render() {
    const requester = this.props.order.requester;
    const iconMarkup = renderToStaticMarkup(
      <div className="map-marker-order">
        <i className="fas fa-map-marker-alt text-primary fa-3x" />
        <span className="quantity-wrapper rounded">
          <span className="text-secondary border-secondary p-1"
                title="Zugesagte Prints">{this.props.order.printed}</span>
          /
          <span className="text-primary border-primary p-1" title="Benötigte Menge">{this.props.order.quantity}</span>
        </span>
      </div>,
    );
    const customMarkerIcon = divIcon({
      html: iconMarkup,
      popupAnchor: [10, 0],
    });
    return <Marker
      icon={customMarkerIcon}
      position={[requester.latitude, requester.longitude]}
    >
      <Popup>
        <address>
          <h4>{requester.name}</h4>
          <p>
            {requester.streetAddress}<br />
            {requester.postalCode} {requester.city}
          </p>
        </address>
        <p>
          <span className="label">Bedarf:</span> <strong
          className="text-primary">{this.props.order.quantity}</strong><br />
          <span className="label">Zugesagt:</span> <strong
          className="text-secondary">{this.props.order.printed}</strong>
        </p>
        <a
          className="btn btn-outline-secondary btn-sm"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            this.props.openModal(this.props.order);
          }}>
          Herstellung zusagen
          <i className="fas fa-plus-circle fa-fw"></i>
        </a>
      </Popup>
    </Marker>;
  }
}

MarkerOrder.contextType = AppContext;

export default MarkerOrder;
