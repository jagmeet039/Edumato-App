import React,{Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import './style/finaldetail.css'

const finalurl="/restaurantdetails"

class Finaldetail extends Component{
  constructor(props){
    super(props)
    this.state={
      rest:'',
      mealid:parseInt(sessionStorage.getItem('mealID'))
    }
  }
  displayfinal = (data)=>{
    if(data){
      return data.map((item)=>{
        return(
          <div className="finalimg">
           <img src={item.sub_thumb} alt="alt"></img> 
           <br/>
           <div className="final-heading">{item.name}</div>
           <div>
        <Tabs>
          <TabList>
            <Tab><span>Overview</span></Tab>
            <Tab><span>Contact</span></Tab>
          </TabList>
          <TabPanel>
            <div>
              <div className="main-head"><span>About this Place</span></div>
              <br/>
              <div className="head">Cuisine</div>
              <div className="sub-head">{item.Cuisine[0].name} | {item.Cuisine[1].name}</div>
              <br/>
              <div className="head">Average Cost</div>
              <div className="sub-head">{`Rs ${item.cost} for two people(approx)`}</div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="main-head"><span>More Details</span></div>
            <br/>
            <div className="head">Phone Number</div>
            <div className="sub-head">+91 {item.contact_number}</div>
            <br/>
            <div className="head">{item.name}</div>
            <div className="sub-head">{item.locality}</div>
          </TabPanel>
        </Tabs>
        <hr/>
           <center>
            <div className="row">
              <Link to={`/detail/${this.state.mealid}`} className="btn btn-danger">Back</Link>
              &nbsp;&nbsp;&nbsp;
              <Link to={`/order/${this.props.match.params.id}`} className="btn btn-success">Place Order</Link>
            </div>
           </center>
      </div>
          </div>
        )
      })
    }
  }
  render(){
    return(
    <div className="container">
      {this.displayfinal(this.state.rest)}
      <br/>
      
    </div>
    )
  }
  componentDidMount(){
    let finalID = parseInt(this.props.match.params.id)
    axios.get(`${finalurl}/${finalID}`)
    .then((res)=>{
      this.setState({
        rest:res.data
      })
    })
  }
}

export default Finaldetail