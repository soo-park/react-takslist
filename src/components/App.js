// component that contains the contents that we need in every page
import React, {Component} from 'react';
import Header from './common/Header';

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <Header />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.object.isRequired
};

export default App;