import './App.css';
import Navigation from './Components/Navigation'
import Logo from './Components/Logo'
import ImageLinkForm from './Components/ImageLinkForm'
import Rank from './Components/Rank'
import Particles from 'react-particles-js'
import { Component } from 'react';
import Clarifai from 'clarifai'
import FaceDetect from './Components/FaceDetect'
import SignIn from './Components/SignIn'
import Register from './Components/Register'

const app = new Clarifai.App({
 apiKey: ' create your api key and add it here'
});
const particlesOptions={ particles: { number :{ value:200,
  density:{ 
     enable:true , value_area:1000 
    }}}}

class App extends Component{
  constructor(){
    super();
    this.state={
      input:'',
      imageUrl:'',
      box:{},
      route:'signin',
      isSignedIn:false
    }
  }
  calculateFaceLocation =(data) =>{
    const clarifaiFace =  data.outputs[0].data.regions[0].region_info.bounding_box;
    const image=document.getElementById('inputImage');
    const width=Number(image.width);
    const height=Number(image.height);
    return {
      leftCol:clarifaiFace.left_col*width,
      topRow:clarifaiFace.top_row *height,
      rightCol:width-(clarifaiFace.right_col * width),
      bottomRow:height-(clarifaiFace.bottom_row *height)
    }
  }

  displayFaceBox= (box) =>{
    this.setState({box:box});
  }

  onInputChange = (event) =>{
    this.setState({input :event.target.value});
  }
  onButtonSubmit =()=>{
    this.setState({imageUrl:this.state.input})
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
  }
  onRouteChange = (route) =>{ 
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }
  render(){ 
    const {isSignedIn,imageUrl,route,box}=this.state;
  return (
    <div className="App">
     
    <Particles  className="particles" params={particlesOptions}/>
    <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
    {
      route==='home'
      ?
      <div>
      <Logo />
     <Rank/>
     <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
     <FaceDetect box={box} imageUrl={imageUrl}/>
    </div>
    :(
      route==='signin'?
      <SignIn onRouteChange={this.onRouteChange} />
      :<Register onRouteChange={this.onRouteChange}/>
     )
       }     
       </div>
  );
}
}

export default App;
