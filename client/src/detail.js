import React,{Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import './style/detail.css'

const resturl = "/restaurantlist"

class Detail extends Component {
  constructor(props){
    super(props)
    this.state = {
      cityID: parseInt(sessionStorage.getItem('cityID'))?parseInt(sessionStorage.getItem('cityID')):1,
      restlist:[],
    }
  }
  cuisinefilter = (event)=>{
    sessionStorage.setItem('mealID',this.props.match.params.id)
    let mealID= parseInt(this.props.match.params.id);
    let cuisine = Number(event.target.value)
    let url;
    
   if(cuisine === ''){  // 
      url= `${resturl}/${this.state.cityID}/${mealID}`
    }else{
      url= `${resturl}/${this.state.cityID}/${mealID}?cuisine=${cuisine}`
    }
    axios.get(url)
    .then((res)=>{
      this.setState({
        restlist:res.data
      })
    })
  }
  costfilter = (event) =>{
    sessionStorage.setItem('mealID',this.props.match.params.id)
    let mealID= parseInt(this.props.match.params.id);
    let cost = (event.target.value).split(',')
    let lcost = Number(cost[0]);
    let hcost = Number(cost[1]);
    let url;
    if(cost === ''){ 
      url= `${resturl}/${this.state.cityID}/${mealID}`
    }else{
      url= `${resturl}/${this.state.cityID}/${mealID}?lcost=${lcost}&hcost=${hcost}`
    }
    axios.get(url)
    .then((res)=>{
      this.setState({
        restlist:res.data
      })
    })

  }
  sortfilter = (event)=>{
    sessionStorage.setItem('mealID',this.props.match.params.id)
    let mealID= parseInt(this.props.match.params.id);
    let sort = Number(event.target.value)
    let url = `${resturl}/${this.state.cityID}/${mealID}?sort=${sort}`
    axios.get(url)
    .then((res)=>{
      this.setState({
        restlist:res.data
      })
    })
  }
  detaildisplay = (data)=>{
    if(data){
      return data.map((item)=>{
        return(
          <Link to={`/rest/${item._id}`}>     
                <div class="dp-info-box">
                  <div class="dp-box-image">
                    <img src={`${item.thumb}`} alt="alterntive" />
                  </div>
                  <div class="dp-info-box-details">
                    <div class="dp-info-box-heading">{item.name}</div>
                    <div class="dp-info-box-subheading">{item.address}</div>
                  </div> 
                  <hr/>
                  <div class="subheading-down">
                      <div id="cost">COST : <span>Rs&nbsp;{item.cost}</span></div>
                      <div id="cnum">CONTACT NUMBER : <span>+91&nbsp;{item.contact_number}</span></div>
                  </div>              
                </div>
          </Link>
        )
      })
    }
  }
  render(){
    return(
      <div className="fluid-container">
        <div className="panel panel-success">
              <div className="panel-heading">
                <center><h3>Available Restaurant List</h3></center>
              </div>
              <div className="panel-body">
                <div className="row">
                  <div className="col-xs-3 side-box">
                    <div onChange={this.cuisinefilter}>
                          <h5><b>Apply Filters</b></h5><hr/>
                          <p>Cuisine Filter</p> 
                          <label className="radio" >
                              <input type="radio" value='' name="cuisine"/>See All
                          </label>
                          <label className="radio">
                              <input type="radio" value='1' name="cuisine"/>North Indian
                          </label>
                          <label className="radio">
                              <input type="radio" value='2' name="cuisine"/>South Indian
                          </label>
                          <label className="radio">
                              <input type="radio" value='3' name="cuisine"/>Chinese
                          </label>
                          <label className="radio">
                              <input type="radio" value='4' name="cuisine"/>Fast Food
                          </label>
                          <label className="radio">
                              <input type="radio" value='5' name="cuisine"/>Street Food
                          </label>         
                    </div>
                    <hr/>
                    <div onChange={this.costfilter}>
                          <h5>Cost Filter</h5>
                          <label className="radio" >
                              <input type="radio" value='' name="range"/>See All
                          </label>
                          <label className="radio">
                              <input type="radio" value='0,200' name="range"/>Less than Rs 200
                          </label>
                          <label className="radio">
                              <input type="radio" value='201,400' name="range"/>Rs 200 to Rs 400
                          </label>
                          <label className="radio">
                              <input type="radio" value='401,600' name="range"/>Rs 400 to Rs 600
                          </label>
                          <label className="radio">
                              <input type="radio" value='601,800' name="range"/>Rs 600 to Rs 800
                          </label>
                          <label className="radio">
                              <input type="radio" value='801,1000' name="range"/>More than Rs 800
                          </label>         
                      </div>
                      <hr/>
                      <div onChange={this.sortfilter}>
                          <h5>Sort Filter</h5>
                          <label className="radio" >
                              <input type="radio" value='1' name="sort"/>Price Low to High
                          </label>
                          <label className="radio">
                              <input type="radio" value='-1' name="sort"/>Price High to Low
                          </label>
                      </div>   
                  </div>
                  <div className="col-xs-9">
                  {this.detaildisplay(this.state.restlist)}
                  </div>
                </div> 
              </div>  
            </div>  
        </div>
    )
  }
  componentDidMount(){
    sessionStorage.setItem('mealID',this.props.match.params.id)
    let mealID= parseInt(this.props.match.params.id);
    axios.get(`${resturl}/${this.state.cityID}/${mealID}`)
    .then((res)=>{
      this.setState({
        restlist:res.data
      })
    })
  }
}



export default Detail;