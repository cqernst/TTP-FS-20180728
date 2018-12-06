import React from 'react';
import { connect } from 'react-redux';
import { auth } from '../store';

/**
 * COMPONENT
 */
const AuthForm = props => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div className="auth-form">
      <h4>{name}</h4>
      <form onSubmit={handleSubmit} name={name}>
        {name === 'signup' ? (
          <div>
            <input name="username" type="text" placeholder="name" />
          </div>
        ) : null}
        <div>
          <input name="email" type="text" placeholder="email" />
        </div>
        <div>
          <input name="password" type="password" placeholder="password" />
        </div>
        <div className="cta-container">
          <button className="button" type="submit">
            {displayName}
          </button>
        </div>
        {error && error.response && (
          <div className="error-container"> {error.response.data} </div>
        )}
      </form>
      {/*add a link here. name === 'signup' ? login link : "New to this app? <signup link>"}*/}
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error,
  };
};

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Register',
    error: state.user.error,
  };
};

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username
        ? event.target.username.value
        : undefined;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(auth(email, password, formName, username));
    },
  };
};

export const Login = connect(
  mapLogin,
  mapDispatch
)(AuthForm);
export const Signup = connect(
  mapSignup,
  mapDispatch
)(AuthForm);
