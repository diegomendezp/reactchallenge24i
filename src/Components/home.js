import React from 'react'
import List from './list';

export const Home = (props) => {
  const titles = ["Popular Movies", "Popular Series", "Family", "Documentary"];
  const urls = ["movie?", "tv?", "movie?with_genres=10751&", "tv?with_genres=99&"];
  const  displayLists = () => {
    return titles.map((title, i) => (
      <List key={i} type={i} title={title} url={urls[i]} />
    ));
  }
  return(
    displayLists()
  )
}