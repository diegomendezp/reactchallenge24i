import React from 'react'
import {css} from 'emotion'
import {Link} from 'react-router-dom'

export const ListItem = (props) => {
  const itemStyle = css`
    margin-left:2%;
    width: 100%;
  `
  const itemImg = css `
  width: 200px;
  @media (max-width: 680px) {
    width: 250px;
  }
  `
  const prefix = props.prefix.replace(/(\s)/g, "").toLowerCase();

  const imageUrl = `http://image.tmdb.org/t/p/w342/${props.poster_path}`
  return (<div className={itemStyle}>
    <p>{props.type === 0  || props.type === 2 ? props.title : props.name}</p>
    <img src={imageUrl} alt="poster" className={itemImg}/>
    <p><Link to={`/${prefix}/${props.id}`}>Show details</Link></p>
  </div>)
}