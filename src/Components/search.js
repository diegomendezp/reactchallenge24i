import React, { Component } from "react";
import axios from "axios";
import {css} from 'emotion'
import { ListItem } from "./listItem";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      items: null
    };
  }
  list = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(275px, 1fr));
  margin: 0 auto;
  grid-gap: 30px;
  max-height:100vh;
  overflow:scroll;
  `

  handleFormSubmit = event => {
    event.preventDefault();
    this.search();
  };

  handleChange(event) {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  }

  displayItems(){
    return this.state.items.map((item, i) => <ListItem key={i} type={0} prefix={"Popular Movies"} {...item}/>)
  }

  search() {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?query=${
          this.state.search
        }&api_key=9d065cdf80054d8b30619f0fc15776d6&format=json`
      )
      .then(res => {
        this.setState({ 
          search: "",
          items: res.data.results
       });
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <input
            type="text"
            placeholder="Search for a movie.."
            name="search"
            value={this.state.search}
            onChange={e => this.handleChange(e)}
          />
          <input type="submit" value="Search" />
        </form>
         <div className={this.list}>
           {this.state.items ? this.displayItems() : ""}
         </div>
      </div>
    );
  }
}
