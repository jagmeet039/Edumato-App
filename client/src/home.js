import React, { Component } from 'react'
import Quicksearch from './quicksearch'
import './style/home.css'

const locurl = "/location"
const resurl = "/restauranthome?city="

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      city: '',
      location: '',
      restaurants: ''
    }
  }

  textselector = (event) => {
    console.log(event.target.value)
    this.setState({restaurants:''})
    this.setState({ city: event.target.value })
    var cityid = parseInt(event.target.value)
    sessionStorage.setItem('cityID',cityid)

    fetch(`${resurl}${cityid}`, { method: 'GET' })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ restaurants: data })
      })
  }

  optionbringer = (data) => {
    if (data) {
      return data.map((item) => {
        return (
          <option className="optionstyle" value={item.city}>{item.name} || { item.city_name}</option>
        )
      })
    }
  }

  optionfetcher = (data) => {
    if (data) {
      return data.map((item) => {
        console.log(item)
        return (
          <option className="optionstyle" value={item._id}>{item.name}</option>
        )
      })
    }
  }
  handleChange = (event) =>{
    console.log(event.target.value)
    this.props.history.push(`/rest/${Number(event.target.value)}`)
  }

  render() {
    return (
      <div>
        <div className="image-container">
            <div className="main-logo">e!</div>
            <div className="main-heading">
                Find the best reataurants, cafés, bars
            </div>
            <div className="input-boxes">
              <select className="select-location" onChange={this.textselector}>
                  <option selected disabled>Please select a Location</option>
                  {this.optionbringer(this.state.location)}
              </select>
              <select className="search-restaurant" onChange={this.handleChange}>
                  <option selected disabled>Search for Restaurants</option>
                  {this.optionfetcher(this.state.restaurants)}
              </select>
            </div>
        </div>
        <Quicksearch/>
      </div>
    )
  }

  componentDidMount() {
    fetch(locurl, { method: 'GET' })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ location: data })
      })
  }
}

export default Home;