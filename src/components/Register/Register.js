// import react from "react";

import { Component } from "react";

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            name: '',
            id: ''
        }
    }

    onSubmitEmail = (evnt) => {
        this.setState({ email: evnt.target.value })
    }

    onSubmitPassword = (evnt) => {
        this.setState({ password: evnt.target.value })
    }

    onSubmitName = (evnt) => {
        this.setState({ name: evnt.target.value })
    }


    onSubmitButton = () => {
        console.log(this.state)
        fetch('https://cryptic-reaches-61275.herokuapp.com/register', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    email: this.state.email,
                    name: this.state.name,
                    password: this.state.password
                })
        }).then((response) => response
            .json()).then(user => {
                if (user.id) {
                    this.props.loadUser(user)
                    this.props.onRouteChange('home')
                }
            }
            )
    }
    onKeyPress = (e) => {
        const div = document.querySelector("#sign_up");

        const input = div.querySelectorAll("input")
        const length = input.length
        const index = [...input].indexOf(e.target);
        if (e.key === "Enter" && (index !== length - 1)) {

            input[index + 1].focus();
            //event.preventDefault();
        }
    }

    render() {
        // const {onRouteChange}= this.props
        return (
            <main className="pa4 black-80">
                <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0" onKeyDown={this.onKeyPress} >
                            <legend className="f4 fw6 ph0 mh0">Register</legend>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="text"
                                    name="name"
                                    id="name"
                                    onChange={this.onSubmitName}
                                    required
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="email"
                                    name="email-address"
                                    id="email-address"
                                    onChange={this.onSubmitEmail}
                                    required
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange={this.onSubmitPassword}
                                    required
                                />
                            </div>
                            <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" /> Remember me</label>
                        </fieldset>
                        <div className="">
                            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Register"
                                onClick={this.onSubmitButton} />
                        </div>
                        <div className="lh-copy mt3">
                        </div>
                    </div>
                </article>
            </main>

        )
    }
}

export default Register;
