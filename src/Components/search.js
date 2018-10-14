import React, { Component } from "react";
import axios from "axios";
import { css } from "emotion";
import { ListItem } from "./listItem";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      items: null,
      filter: "movie"
    };
  }
  list = css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(275px, 1fr));
    margin: 0 auto;
    grid-gap: 30px;
    max-height: 100vh;
    overflow: scroll;
  `;

  itemContainer = css`
  display= flex;
  margin-top: 2%;
`;

  input = css`
    width: 90%;
    outline: none;
    border-radius: 5px;
    padding: 0.75%;
  `;

  handleFormSubmit = event => {
    event.preventDefault();
    this.search();
  };

  handleChange(event) {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  }

  displayItems() {
    return this.state.items.map((item, i) => (
      <ListItem key={i} type={0} prefix={"Popular Movies"} {...item} />
    ));
  }

  search() {
    if (this.state.search !== "") {
      axios
        .get(
          `https://api.themoviedb.org/3/search/${this.state.filter}?query=${
            this.state.search
          }&api_key=${process.env.REACT_APP_API_KEY}&format=json`
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
  }

  render() {
    return (
      <div className={this.itemContainer}>
        <form onSubmit={this.handleFormSubmit}>
          <input
            className={this.input}
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
