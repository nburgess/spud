import tw from "tailwind.macro"
import React, { Component } from "react"
import SEO from "../components/seo"
import github from "../images/github.svg"
import { graphql } from "gatsby"

import jam from "../sounds/beat.mp3"

const logos = [
  {
    name: "gatsby",
    logo: require("../images/gatsby.svg"),
  },
  {
    name: "tailwind",
    logo: require("../images/tailwind.svg"),
  },
  {
    name: "emotion",
    logo: require("../images/emotion.png"),
  },
]

const Wrapper = tw.div`
  flex items-center justify-center flex-col h-screen
`

const Main = tw.div`
  p-6 bg-gray-100 rounded-lg shadow-2xl
`

const Heading = tw.h1`
  text-2xl text-gray-500 uppercase
`

const Text = tw.p`
  text-xl text-gray-700
`

const Logos = tw.div`
  flex items-center justify-around mb-6 px-16
`

const Icon = tw.img`
  h-10
`

const Footer = tw.footer`
  mt-6 text-center
`

const SmallIcon = tw.img`
  inline-block h-6
`
// export default ({data}) => {
//   console.log(data,markdownRemark)
//   return(<div>d</div>)
// }
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
      switch (this.state.selectedTrack) {
        case "Campfire Story":
          track = campfireStory;
          break;
        case "Booting Up":
          track = bootingUp;
          break;
        default:
          break;
      }
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
  playAudio() {
    const audioEl = document.getElementsByClassName("audio-element")[0]
    this.player.src = jam
    this.player.play()
  }
  render(){
    console.log(this.props.data.markdownRemark)
    return(
      <div>
        <div className="h-screen bg-no-repeat bg-position-center bg-fixed flex" style={{backgroundImage: "url("+ require("../images/bg.jpg") +")"}}>
          <div className="m-auto text-white font-mono text-center">
              <div className="text-6xl">SOCKO</div>
              <div className="text-2xl">by Spud</div>
          </div>
        </div>
        <div className="px-2 bg-no-repeat bg-position-center bg-fixed" style={{backgroundImage: "url("+ require("../images/bg.jpg") +")"}}>
          <div className="flex flex-wrap -mx-2 -mb-4">
            {this.props.data.allMarkdownRemark.edges.map(({ node }) => (
              <div className="w-1/3 px-2 mb-4">
                <div className="opacity-25 rounded-3g shadow-2xl hover:shadow-inner hover:opacity-50">
                  {/* <p>{node.frontmatter.title}</p> */}
                  <img className="object-cover" src={require("../images/rose.jpg")} onClick={this.playAudio}></img>
                  {/* <div dangerouslySetInnerHTML={{__html: node.html}}></div> */}
                </div>
              </div>
            ))}
            <div className="w-1/3 px-2 mb-4"><div className="opacity-25 rounded-3g shadow-2xl">
              <img className="object-cover" src={require("../images/rose.jpg")} onClick={this.playAudio}></img>
              <audio ref={ref => this.player = ref} />
              {/* <audio className="audio-element">
                <source src="google" type="audio/mp3"></source>
                <source src="https://api.coderrocketfuel.com/assets/pomodoro-times-up.mp3"></source>
              </audio> */}
            </div></div>
          </div>
        </div>
      </div>

        /* <div className="p-6">
        <Main>
          <button onClick={this.playAudio}>
            <span>Play Audio</span>
          </button>
          <audio className="audio-element">
            <source src="https://api.coderrocketfuel.com/assets/pomodoro-times-up.mp3"></source>
          </audio>
        </Main>
        </div>
        <div className="bg-white rounded-t-lg overflow-hidden border-t border-l border-r border-gray-400 p-4 ">
          <div className="relative h-32 text-center">
            <div className="z-40 absolute w-24 h-24 ml-0 mt-0 bg-gray-400 flex justify-center items-center" style={{backgroundImage: "url("+ require("../images/bg.jpg") +")"}}>z-40</div>
            <div className="z-30 absolute w-24 h-24 ml-2 mt-2 bg-gray-500 flex justify-center items-center">z-30</div>
            <div className="z-20 absolute w-24 h-24 ml-4 mt-4 bg-gray-600 flex justify-center items-center">z-20</div>
            <div className="z-10 absolute w-24 h-24 ml-6 mt-6 bg-gray-700 flex justify-center items-center">z-10</div>
            <div className="z-0 absolute w-24 h-24 ml-8 mt-8 bg-gray-800 flex justify-center items-center">z-0</div>
          </div>
        </div>
      </div> */



        // <Wrapper>
        //   <Fuk style={{backgroundImage: "url(" + "../images/gatsby.svg+" + ")"}}>sdfg</Fuk>
        //   <div className="z-40 ml-0 mt-0 bg-gray-400">z-40</div>
        //   <div className="z-30 ml-2 mt-2 bg-gray-500">z-30</div>
      
        //   <SEO title="Home" />
        //   <Main>
        //     <p>adsf</p>
        //   </Main>
        //   <Main>
        //     <Logos>
        //       {logos &&
        //         logos.map(({ name, logo }, index) => (
        //           <Icon src={logo} alt={`${name} Logo`} key={index} />
        //         ))}
        //     </Logos>
        //     <Heading>Hello, world!</Heading>
        //     <Text>Welcome to the Gatsby Tailwind CSS + Emotion Starter.</Text>
        //     <Footer>
        //       <a
        //         href="https://github.com/pauloelias/gatsby-tailwind-emotion-starter"
        //         target="_blank"
        //         rel="noopener noreferrer"
        //       >
        //         <SmallIcon src={github} alt="Githib Icon" />
        //       </a>
        //     </Footer>
        //   </Main>
        // </Wrapper>
    )
  }
}
export const query = graphql`
  query{
    allMarkdownRemark {
      edges {
        node {
          html
          frontmatter {
            date
            title
          }
        }
      }
    }
  }
`