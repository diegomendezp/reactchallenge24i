import React, { Component } from "react";
import axios from "axios";
import { ListItem } from "./listItem";
import {css} from 'emotion'

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: null
    };
  }
  
  listStyle = css`
  margin-top: 4%;
`
  list = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(275px, 1fr));
  margin: 0 auto;
  grid-gap: 30px;
  max-height:100vh;
  overflow:scroll;
  `

  componentDidMount() {
    axios
      .get(`https://api.themoviedb.org/3/discover/${this.props.url}sort_by=popularity.desc&api_key=${process.env.REACT_APP_API_KEY}&format=json`)
      .then((res, test) => {
        this.setState({
          items: res.data.results
        })
      });
  }

  displayItems(){
    return this.state.items.slice(0,15).map((item, i) => <ListItem key={i} type={this.props.type} prefix={this.props.title} {...item}/>)
  }
  render() {
    return (
      <div className={this.listStyle}>
        <h2>
        	{this.props.title}
        </h2>
        <div className={this.list}>
          {this.state.items ? this.displayItems() : <p>Loading...</p>}
        </div>
      </div>
    );
  }
}
