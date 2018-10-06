import React from 'react';
import {css} from 'emotion'
import {Link} from 'react-router-dom'
export const Navbar = () => {
  const navbar = css`
  background-color: #3C6E71;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    position:fixed;
    top:0;
    color: white;
    align-items:center;
  `
  const linkStyle= css`
  text-decoration: none; 
  color:white;
  margin-left: 2%;
  margin-right: 2%;
  `
  return(
    <div className={navbar}>
      <Link className={linkStyle} to='/'>Home</Link>
      <Link className={linkStyle} to='/search'>Search</Link>
    </div>
  )
}