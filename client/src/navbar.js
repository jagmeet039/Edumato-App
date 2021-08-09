import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './style/navbar.css'

class Navbar extends Component {
  render() {
    return (
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link to='/' className="navbar-brand">Edumato!</Link>
            </div>
          </div>
        </nav>
    )
  }
}

export default Navbar