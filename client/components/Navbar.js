import React from 'react';
import { connect } from 'react-redux';
import { updateHomePage } from '../store';

const Navbar = props => {
  const { setView } = props;
  return (
    <div className="navbar">
      <div className="nav-content">
        <button onClick={() => setView('portfolio')}>Portfolio</button>
        <span>|</span>
        <button onClick={() => setView('transactions')}>Transactions</button>
      </div>
    </div>
  );
};

const mapDispatch = dispatch => {
  return {
    setView(view) {
      dispatch(updateHomePage(view));
    },
  };
};

export default connect(
  null,
  mapDispatch
)(Navbar);
