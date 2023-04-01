import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveEmail } from '../actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    disabledBtn: true,
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    const { password, email } = this.state;
    const regex = /\w+@[a-z]+.com/g;
    this.setState({ [name]: value });
    const tamMin = 5;
    this.setState({ disabledBtn: true });
    if (email.match(regex) && password.length >= tamMin) {
      this.setState({ disabledBtn: false });
    }
  }

  handleSubmit = () => {
    const { history, setEmail } = this.props;
    const { email } = this.state;
    setEmail(email);
    history.push('/carteira');
  }

  render() {
    const { email, password, disabledBtn } = this.state;
    return (
      <div>
        <div className="form-login">
          <form className="form">
            <h1>Login</h1>
            <input
              type="email"
              data-testid="email-input"
              placeholder="Digite seu e-mail"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
            <input
              type="password"
              name="password"
              placeholder="Digite sua senha"
              data-testid="password-input"
              onChange={ this.handleChange }
              value={ password }
            />
            <button
              type="button"
              disabled={ disabledBtn }
              onClick={ this.handleSubmit }
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  setEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setEmail: (state) => dispatch(saveEmail(state)),
});

export default connect(null, mapDispatchToProps)(Login);
