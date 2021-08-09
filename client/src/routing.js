import React from 'react'
import {BrowserRouter,Route} from 'react-router-dom'
import Home from './home'
import Detail from './detail'
import Navbar from './navbar'
import Footer from './footer'
import Finaldetail from './finaldetail'
import Order from './order'
import Result from './result'

const Routing = ()=> {
  return(
    <BrowserRouter>
      <div>
        <Navbar/>
        <Route exact path = '/' component={Home}></Route>
        <Route path = '/detail/:id' component={Detail}></Route>
        <Route path = '/rest/:id' component={Finaldetail}></Route>
        <Route path = '/order/:id' component={Order}></Route>
        <Route path = '/allorders' component={Result}></Route>
        <hr/>
        <Footer year="2020"/>
      </div>
    </BrowserRouter>
  )
}

export default Routing