import React, { Component } from 'react';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: '',
      error: '',
    };
  }

  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value });
  };
  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value });
  };

  onSubmitSignIn = () => {
    this.props.toggleSpinner();

    fetch(`${process.env.REACT_APP_BACKEND_URL}/signin`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          this.props.onRouteChange('home');
          this.props.loadUser(data);
        } else {
          this.setState({ error: data });
        }
        this.props.toggleSpinner();
      })
      .catch((err) => {
        console.log(err);
        this.props.toggleSpinner();
      });
  };

  render() {
    const { onRouteChange } = this.props;

    return (
      <article className="br3-ns bg-white-90 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  onChange={this.onEmailChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  onChange={this.onPasswordChange}
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.onSubmitSignIn}
                className="b ph3 pv2 input-reset ba black-80 b--black-80 hover-bg-light-purple grow pointer f6 dib br2"
                type="submit"
                value="Sign in"
              />
            </div>
            <div className="lh-copy mt3">
              <p
                onClick={() => onRouteChange('register')}
                className="f6 link dim black-80 db pointer"
              >
                Register
              </p>
            </div>
            <div className="mt3">&nbsp;</div>
            {this.state.error && (
              <div>
                <p className="red b">{this.state.error}</p>
              </div>
            )}
          </div>
        </main>
      </article>
    );
  }
}

export default Signin;
