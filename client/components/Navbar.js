import React from 'react';
import { connect } from 'react-redux';
import { updateHomePage, logout } from '../store';

const Navbar = props => {
  const { setView, dispatchLogOut } = props;
  return (
    <div className="nav-content">
      <button onClick={dispatchLogOut}>Log out</button>
      <div className="nav-tabs">
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
    dispatchLogOut() {
      dispatch(logout());
    },
  };
};

export default connect(
  null,
  mapDispatch
)(Navbar);
