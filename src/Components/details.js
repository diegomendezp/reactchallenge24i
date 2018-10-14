import React, { Component } from "react";
import axios from "axios";
import DetailsItem from "./detailsItem";

export default class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null
    }
    
  }

  params = this.props.match.params
  url = this.props.match.url.includes('movie') || this.props.match.url.includes('family')?
  'movie' : 'tv'
  componentWillMount(){
    axios.get(`https://api.themoviedb.org/3/${this.url}/${this.params.id}?api_key=${process.env.REACT_APP_API_KEY}&external_source=imdb_id`)
    .then(res => {
      this.setState({
        item: res.data
      })
    })
    .catch(err => {throw new Error(err)})
  }

 
  render() {
    
    return (
      
      <div>
        {this.state.item ? <DetailsItem url={this.url} {...this.state.item}/> : <p>Loading...</p>}
      </div>
    );
  }
}