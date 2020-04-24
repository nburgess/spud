import tw from "tailwind.macro"
import React, { Component } from "react"
import { graphql } from "gatsby"

import beat from "../sounds/beat.mp3"
import purplecat from "../sounds/purplecat.mp3"
import distancia from "../sounds/distancia.mp3"

import crane from "../images/crane.webp"
import rose from "../images/rose.jpg"

import Song from "./song"

function getTime(time) {
  if (!isNaN(time)) {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  }
}

const songs = {
  "beat": beat,
  "purplecat": purplecat,
  "distancia": distancia
}

const images = {
  "rose": rose,
  "crane": crane
}

const BackgroundImage = tw.div`
  h-screen bg-no-repeat bg-position-center bg-fixed flex
`

export default class extends Component {
  state = {
    selectedTrack: null,
    player: "stopped",
    currentTime: null,
    duration: null
  }
  componentDidMount(){
    this.player.addEventListener("timeupdate", e => {
      this.setState({
        currentTime: e.target.currentTime,
        duration: e.target.duration
      })
    })
  }
  componentWillUnmount() {
    this.player.removeEventListener("timeupdate", () => {})
  }



  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedTrack !== prevState.selectedTrack) {
      let track;
      track = songs[this.state.selectedTrack]
      if (track) {
        this.player.src = track;
        this.player.play();
        this.setState({ player: "playing", duration: this.player.duration });
      }
    }
    if (this.state.player !== prevState.player) {
      if (this.state.player === "paused") {
        this.player.pause();
      } else if (this.state.player === "stopped") {
        this.player.pause();
        this.player.currentTime = 0;
        this.setState({ selectedTrack: null });
      } else if (
        this.state.player === "playing" &&
        prevState.player === "paused"
      ) {
        this.player.play();
      }
    }
  }

  render(){
    const currentTime = getTime(this.state.currentTime);
    const duration = getTime(this.state.duration);

    return(
      <div>
        <BackgroundImage style={{backgroundImage: "url("+ require("../images/bg.jpg") +")"}}>
          <div className="m-auto text-white font-mono text-center">
              <div className="text-6xl">SOCKO</div>
              <div className="text-2xl">by Spud</div>
          </div>
        </BackgroundImage>
        <div className="px-2 bg-no-repeat bg-position-center bg-fixed" style={{backgroundImage: "url("+ require("../images/bg.jpg") +")"}}>
          <div className="flex flex-wrap -mx-2 -mb-4">
            {this.props.data.allMarkdownRemark.edges.map(({ node }) => (
              <div key={node.id} className="w-1/3 px-2 mb-4">
                <div className="opacity-25 rounded-3g shadow-2xl hover:shadow-inner hover:opacity-50">
                  <img className="object-cover" src={images[node.frontmatter.image]} onClick={() => this.setState({selectedTrack: node.frontmatter.track})}></img>
                  {/* <div dangerouslySetInnerHTML={{__html: node.html}}></div> src={require(node.image)} */}
                </div>
              </div>
            ))}
          </div>
        </div>
        <BackgroundImage style={{backgroundImage: "url("+ require("../images/bg.jpg") +")"}}>
              <Song className="w-1"/>
        </BackgroundImage>
        <audio ref={ref => this.player = ref} />
      </div>
    )
  }
}

export const query = graphql`
  query{
    allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___id]}) {
      edges {
        node {
          frontmatter {
            id
            image
            title
            track
          }
        }
      }
    }
  }
`