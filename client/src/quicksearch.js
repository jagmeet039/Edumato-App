import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const mealurl = "/mealtype";

class Quicksearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mealtype: ''
    }
  }
  mealdisplay = (data) => {
    if (data) {
      return data.map((item) => {
        var y= item.name.charAt(0).toUpperCase() + item.name.slice(1)
        return (
            <Link to={`/detail/${item.mealtype}`}>

              <div class="info-box">
                <div class="box-image">
                  <img src={`./images/${item.name}.jpg`} alt="alternative" />
                </div>
                <div class="info-box-details">
                  <div class="info-box-heading">{y}</div>
                  <div class="info-box-subheading">Start your day with exclusive {`${item.name}`} options</div>
                </div>
              </div>

            </Link>
        )
      })
    }
  }
  render() {
    return (
      <div className="container">
        <div class="search-container ">
          <p class="quick-search-heading">Quick Searches</p>
          <p class="quick-search-subheading">Discover restaurants by type of meal</p>
          <div className="text-center">{this.mealdisplay(this.state.mealtype)}</div>
        </div>
      </div>
    )
  }
  componentDidMount() {
    fetch(mealurl, { method: 'GET' })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ mealtype: data })
      })
  }
}

export default Quicksearch;