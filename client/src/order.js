import React, { Component } from 'react'
import './style/form.css'

const newurl = "/restauranthome"
const orderurl = "/placeorder"

class Order extends Component {
  constructor(props) {
    super(props)
    this.state = {
      order_id: Math.floor(Math.random() * 1000000),
      rest_id: this.props.match.params.id,
      rest: '',
      name: '',
      contact: '',
      email: '',
      address: '',
      person: 0
    }
  }

  handleName=(event)=>{
    this.setState({name:event.target.value})
  }

  handleContact=(event)=>{
    this.setState({contact:event.target.value})
  }

  handleEmail=(event)=>{
    this.setState({email:event.target.value})
  }

  handleAddress=(event)=>{
    this.setState({address:event.target.value})
  }

  handlePerson=(event)=>{
    this.setState({person:event.target.value})
  }

  submit=()=>{
    var data ={
      "order_id":this.state.order_id,
      "rest_id":this.state.rest_id,
      "name":this.state.name,
      "contact":this.state.contact,
      "email":this.state.email,
      "address":this.state.address,
      "person":this.state.person
    }
    fetch(orderurl,
      {
        method:'POST',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
      }).then((this.props.history.push('/allorders')))
  }

  cancel=()=>{
    this.props.history.push('/')
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-success">
          <div className="panel-heading">
            <center><h3>Place Order</h3></center>
          </div>
          <div className="panel-body">
            <form className="form-group">
              <label>Order ID:</label>
              <input type="text" className="form-control" readOnly value={this.state.order_id} />
              <br />
              <label>Restaurant Name:</label>
              <input type="text" className="form-control" readOnly value={this.state.rest} />
              <br />
              <label>Name:</label>
              <input type="text" className="form-control" placeholder="Enter your Full name" 
                      onChange={this.handleName} />
              <br />
              <label>Contact Number:</label>
              <input type="text" className="form-control" placeholder="Enter your Contact Detail" 
                      onChange={this.handleContact}/>
              <br />
              <label>Email:</label>
              <input type="email" className="form-control" placeholder="Enter your vaild Email ID" 
                      onChange={this.handleEmail}/>
              <br />
              <label>Address:</label>
              <input type="text" className="form-control" placeholder="Enter your vaild Address" 
                      onChange={this.handleAddress}/>
              <br />
              <label>Person:</label>
              <select className="form-control" onChange={this.handlePerson}>
                <option disabled selected>Please select the number of persons you want order:</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              </form>
              <br />
              <center>
                <button className="btn btn-danger" onClick={this.cancel}>Cancel</button>
              &nbsp;&nbsp;&nbsp;
              <button className="btn btn-success" 
                  onClick={this.submit}>Submit</button>
              </center>
          </div>
        </div>

      </div>
    )
  }
  componentDidMount() {
    fetch(newurl, { method: 'GET' })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          rest: data[this.props.match.params.id - 1].name
        })
      })
  }
}

export default Order