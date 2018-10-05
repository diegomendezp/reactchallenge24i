import React, { Component } from "react";
import { css } from "emotion";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Details from "./Components/details";
import { Home } from "./Components/home";

export default class App extends Component {
  titles = ["Popular Movies", "Popular Series", "Family", "Documentary"];
  prefix = this.titles.reduce((acc, e) => {
    acc.push(e.replace(/(\s)/g, "").toLowerCase());
    return acc;
  }, []);
  urls = ["movie?", "tv?", "movie?with_genres=10751&", "tv?with_genres=99&"];
  container = css`
    max-width: 80%;
    margin: 0 auto;
    text-align: center;
  `;

 

  displayRoutes() {
    return this.prefix.map((e, i) => (
      <Route path={`/${e}/:id`} component={Details} key={i}/>
    ));
  }

  render() {
    //console.log(this.prefix)
    return (
      <Router>
        <div className={this.container}>
          
          <Switch>
          <Route exact path={`/`} component={Home}/>
          {this.displayRoutes()}
          </Switch>
        </div>
      </Router>
    );
  }
}
