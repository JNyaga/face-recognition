// import react from "react";

import { Component } from "react";

class SignIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    onSubmitEmail = (evnt) => {
        this.setState({ email: evnt.target.value })
    }
    onSubmitPassword = (evnt) => {
        this.setState({ password: evnt.target.value })
    }

    onSubmitButton = () => {
        console.log(this.state)
        fetch('https://cryptic-reaches-61275.herokuapp.com/signin', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    email: this.state.email,
                    name: this.state.name,
                    password: this.state.password
                })
        }).then((response) => response
            .json()).then(data => {
                if (data.id) {
                    this.props.loadUser(data)
                    this.props.onRouteChange('home')
                }
            }
            )
    }

    render() {
        const { onRouteChange } = this.props
        return (
            <main className="pa4 black-80">
                <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="email"
                                    name="email-address"
                                    id="email-address"
                                    onChange={this.onSubmitEmail} />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange={this.onSubmitPassword} />
                            </div>
                            <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" /> Remember me</label>
                        </fieldset>
                        <div className="">
                            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Sign in"
                                onClick={this.onSubmitButton} />
                        </div>
                        <div className="lh-copy mt3">
                            <p onClick={() => onRouteChange('register')}
                                className="f6 link dim black db pointer">Register</p>
                        </div>
                    </div>
                </article>
            </main>

        )
    }
}


export default SignIn;
