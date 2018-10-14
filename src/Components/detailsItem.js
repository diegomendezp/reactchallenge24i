import React, {Component} from "react";
import { css } from "emotion";
import shaka from "shaka-player";




export default class DetailsItem extends Component{
  constructor(props) {
    super(props);
    this.state = {
      autoPlay: false,
      hidden: true
    }
  }

  //https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd
  manifestUri =
    "https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd";

  
  
  initApp = () => {
    // Install built-in polyfills to patch browser incompatibilities.
    shaka.polyfill.installAll();

    // Check to see if the browser supports the basic APIs Shaka needs.
    if (shaka.Player.isBrowserSupported()) {
      // Everything looks good!
      this.initPlayer();
    } else {
      // This browser does not have the minimum set of APIs we need.
      console.error("Browser not supported!");
    }
  };

  play(){
    this.initApp()
  }

  initPlayer = () => {
    // Create a Player instance.
    let video = document.getElementById(`video${this.props.id}`);
    video.requestFullscreen()
    let player = new shaka.Player(video);

    this.setState({
      autoPlay: true,
      hidden: false
    })
    
   //

    // Attach player to the window to make it easy to access in the JS console.
    window.player = player;
    // Listen for error events.
    // Try to load a manifest.
    // This is an asynchronous process.
    player
    .load(this.manifestUri, {headers: {"Accept-Ranges":"bytes", "Access-Control-Allow-Origin":"*"}})
    .then(res => {
      
      // This runs if the asynchronous load is successful.
      console.log("The video has now been loaded!");
    })
    .catch(err => console.log(err));
  }

  itemImg = css`
    width: 80%;
    
  `;
  
  itemContainer = css`
  display:flex;
  margin-top: 2%;
  h1, h2, h3, h4 {
    margin: 0;
  }
  @media (max-width: 680px) {
    width: 100%;
    display:block;
  }
`
  column1 = css`
    text-align: left;
    width: 50%;
    @media (max-width: 680px) {
      width: 100%;
      display:block;
      text-align: center;
    }
  `

  column2 = css`
  width: 50%;
  display:inline-block;
  @media (max-width: 680px) {
    width: 100%;
  }
`

  imageUrl = `http://image.tmdb.org/t/p/w342/${this.props.poster_path}`;
  render() {
    return (
      <div className={this.itemContainer}>
        <div className={this.column1}>
          {this.props.url === "movie" ? (
            <h2>{this.props.title}</h2>
          ) : (
            <h2>{this.props.name}</h2>
          )}
          <p>
            <strong>Description: </strong>
            {this.props.overview}
          </p> 
            <div>
              {this.props.url === "movie" ? (
                <p>
                  <strong>Bugdet: </strong>
                  {this.props.budget} $
                </p>
              ) : (
                <p>
                  <strong>Number of seasons: </strong>
                  {this.props.seasons.length}
                </p>
              )}
            </div>
            <div>
              <p>
                <strong>Puntuation: </strong> {this.props.vote_average}
              </p>
            </div>
          
          <button className="playButton" onClick={() => this.play()}> PLAY</button>
          <video
          title={`video${this.props.id}`}
            id={`video${this.props.id}`}
            width="200"
            poster={this.imageUrl}
            controls
            hidden={this.state.hidden}
            autoPlay={this.state.autoPlay}
          >
          <source src={this.manifestUri}></source>
          </video>
          <p>
            <a href={this.props.homepage}>Go to the official site</a>
          </p>
        </div>

         <div className={this.column2}>
           <img src={this.imageUrl} alt="poster" className={this.itemImg} />
         </div>
      </div>
    );
  }
}
