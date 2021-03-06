import React from 'react';
import PropTypes from 'prop-types';
import ThingListItem from './list-item';

class ThingList extends React.Component {
  constructor(props) {
    super(props);
  }

  static get propTypes() {
    return {
      things: PropTypes.array,
    };
  }

  render() {
    if (this.props.things === undefined) {
      return (<div className="alert alert-danger">Error</div>);
    }

    if (this.props.things.length === 0) {
      return (<div className="alert alert-warning">Keine Ergebnisse gefunden</div>);
    }

    return (
      <div className="row">
        {this.props.things.map((thing) => (
          <div className="col-sm-12 col-md-6 col-lg-4 mb-4" key={thing.id}>
            <ThingListItem thing={thing} />
          </div>
        ))}
      </div>
    );
  }
}

export default ThingList;
