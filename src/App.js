import React, { Component } from 'react';
import Particles from 'react-particles-js';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImagelinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
// const Clarifai = require('clarifai');

// const app = new Clarifai.App({
//   apiKey: 'a4fc26a9cae1419d8982ab6677271247'
// });

const particleParam = {
  particles: {
    line_linked: {
      shadow: {
        enable: true,
        color: "#3CA9D1",
        blur: 5
      }
    }
  }
}
const initialState = {
  input: '',
  imgUrl: '',
  boxList: [],
  route: 'signin',
  isSignedin: false,
  user: {
    id: '',
    name: '',
    email: '',
    password: '',
    entries: 0,
    joined: new Date()
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState
  }
  // componentDidMount(){
  //   fetch('http://localhost:3000/').then((response)=>response.json()).then(console.log)
  // }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
        entries: data.entries
      }
    })
  }

  calculateFaceLoc = (data) => {
    const clflength = data.outputs[0].data.regions.length
    let boxList = []
    for (let i = 0; i < clflength; i++) {
      const clarifaiFace = data.outputs[0].data.regions[i].region_info.bounding_box
      const image = document.getElementById('inputimage');
      const width = image.width;
      const height = image.height;
      // bonding box is percentage of image
      //to get width and heigtht we do-->image.height
      //--> image.width
      let bx = {
        top: clarifaiFace.top_row * height,
        right: width - (clarifaiFace.right_col * width),
        bottom: height - (clarifaiFace.bottom_row * height),
        left: clarifaiFace.left_col * width
      }
      boxList.push(bx)
    }
    return boxList
  }

  displayFaceBox = (boxList) => {
    console.log(boxList);
    this.setState({ boxList: boxList })
  }

  onInputChange = (evnt) => {
    this.setState({ input: evnt.target.value });
  }

  onSubmitImgBtn = () => {
    this.setState({ imgUrl: this.state.input })
    fetch('https://cryptic-reaches-61275.herokuapp.com/imageUrl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
          input: this.state.input
        })
    })
      .then((response) => response.json())
      // app.models
      //   .predict(
      //     Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => {
        if (response) {
          fetch('https://cryptic-reaches-61275.herokuapp.com/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
              {
                id: this.state.user.id
              })
          }).then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }))
            })
        }
        this.displayFaceBox(this.calculateFaceLoc(response))
      })
      // console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      // there was an error
      .catch(err => console.log(err))

  }

  onRouteChange = (route) => {
    if (route === 'home') {
      this.setState({ isSignedin: true })
    } else if (route === 'signout') {
      this.setState(initialState)
    }

    this.setState({ route: route })

  }





  render() {
    const { isSignedin, route, boxList, imgUrl } = this.state
    return (
      <div className="App" >
        <Particles className='particles' params={particleParam} />
        <Navigation onRouteChange={this.onRouteChange} isSignedin={isSignedin} />
        {route === 'home' ?
          <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm onInputChange={this.onInputChange} onSubmitBtn={this.onSubmitImgBtn} />
            <FaceRecognition boxList={boxList} imgUrl={imgUrl} />
          </div>
          : ((route === 'signin' || route === 'signout') ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> :
            <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />)
        }
      </div>
    );
  }
}

export default App;
