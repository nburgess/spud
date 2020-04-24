import tw from "tailwind.macro"
import React, { Component } from "react"
import { graphql } from "gatsby"

import crane from "../images/crane.webp"
import rose from "../images/rose.jpg"

const images = {
  "rose": rose,
  "crane": crane
}

export default class Song extends Component {
  render(){
    return(
      <div className="w-screen rounded-t-lg overflow-hidden p-4">
        <div className="relative h-screen text-center">
          <div style={{paddingTop: "10%", marginLeft:"33%", marginTop:"45%"}} className="z-40 absolute w-1/2 flex justify-center items-end">
            <div className="absolute" style={{backgroundImage: "url("+ require("../images/eye.gif") +")", backgroundSize: "35%", width: "100%", height:"100%"}}></div>
          </div>
          <div style={{paddingTop: "50%"}} className="z-30 absolute w-1/2 flex justify-center items-end">
          <div className="absolute" style={{backgroundImage: "url("+ require("../images/tile.png") +")", backgroundSize: "20%", width: "100%", height:"100%"}}></div>
          </div>
          <div style={{paddingTop: "45%", marginLeft:"40%", marginTop:"10%"}} className="absolute z-20 w-1/3 bg-white flex justify-center items-end">
            <div className="absolute" style={{backgroundImage: "url("+ require("../images/sun-tile.png") +")", backgroundSize:"100%",width: "100%", height:"100%"}}></div>
          </div>
        </div>
      </div>
    )
  }
}