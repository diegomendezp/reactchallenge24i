import React, {Component} from "react";
import { css } from "emotion";
import { Link } from "react-router-dom";
import * as shaka from "shaka-player";
//import Hls from 'hls.js/src/hls'


export default class DetailsItem extends Component{
  constructor(props) {
    super(props);
  }
  manifestUri =
    "../playlist.m3u8";

  
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

  componentDidMount(){
    this.initApp()
  }

  initPlayer = () => {
    // Create a Player instance.
    let video = document.getElementById("video");
    console.log(video);
    let player = new shaka.Player(video);


    
   //

    // Attach player to the window to make it easy to access in the JS console.
    window.player = player;

    // Listen for error events.

    // Try to load a manifest.
    // This is an asynchronous process.
    player
      .load(this.manifestUri)
      .then(function() {
        // This runs if the asynchronous load is successful.
        console.log("The video has now been loaded!");
      })
      .catch(err => console.log(err)); // onError is executed if the asynchronous load fails.
  };

  itemImg = css`
    width: 400px;
    @media (max-width: 680px) {
      width: 300px;
    }
  `;
  imageUrl = `http://image.tmdb.org/t/p/w342/${this.props.poster_path}`;
  render() {
    return (
      <div>
        <Link to="/">Home</Link>
        {this.props.url === "movie" ? (
          <h2>{this.props.title}</h2>
        ) : (
          <h2>{this.props.name}</h2>
        )}
        <p>
          <strong>Description: </strong>
          {this.props.overview}
        </p>
        <img src={this.imageUrl} alt="poster" className={this.itemImg} />
        <ul>
          <li>
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
          </li>
          <li>
            <p>
              <strong>Puntuation: </strong> {this.props.vote_average}
            </p>
          </li>
        </ul>
        <video
          id="video"
          width="200"
          poster={this.imageUrl}
          controls
          autoPlay
        />
        <p>
          <a href={this.props.homepage}>Go to the official site</a>
        </p>
      </div>
    );
  }
}
