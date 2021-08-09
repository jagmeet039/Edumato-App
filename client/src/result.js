import React, { Component } from 'react'
import axios from 'axios'

const resulturl = "/orderlist"

class Result extends Component {
  constructor() {
    super()
    this.state = {
      order: ''
    }
  }
  renderorder=(data)=>{
    if(data){
      return data.map((item)=>{
        return(
            <tr>
              <td>{item._id}</td>
              <td>{item.rest_id}</td>
              <td>{item.name}</td>
              <td>{item.contact}</td>
              <td>{item.email}</td>
              <td>{item.address}</td>
            </tr>
        )
      })
    }
  }
  render() {
    return (
      <div className="container">
        <h2>Placed Orders List</h2>
        <center><p className="text-success">Congratulations, Order is placed Successfully!</p></center>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Rest ID</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
          {this.renderorder(this.state.order)}
          </tbody>
        </table>
      </div>
    )
  }
  componentDidMount(){
    axios.get(resulturl)
    .then((res)=>{
      this.setState({
        order:res.data
      })
    })
  }
}


export default Result