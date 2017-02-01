import React from 'react'
import { createWriteStream, supported, version } from 'streamsaver'

class Play extends React.Component {
  handleStream = (stream) => {
    //let fr = new FileReader()
    //let mediaRecorder = new window.MediaRecorder(stream)
    //let chunks = Promise.resolve()
    ////let fileStream = createWriteStream('filename.wav')
    ////let writer = fileStream.getWriter()
    //// use .mp4 for video(camera & screen) and .wav for audio(microphone)

    //// Start recording
    //mediaRecorder.start()

    ////closeBtn.onclick = event => {
        ////mediaRecorder.stop()
        ////setTimeout(() =>
            ////chunks.then(evt => writer.close())
        ////, 1000)
    ////}

    //mediaRecorder.ondataavailable = ({blob}) => {
        //chunks = chunks.then(() => new Promise(resolve => {
            //fr.onload = () => {
                ////writer.write(new Uint8Array(fr.result))
                //resolve()
            //}
            //fr.readAsArrayBuffer(blob)
        //}))
    //}
  }
  handleStreamError = (error) => {
    console.log(error)
  }
  componentWillUnmount(){
    console.log("unmount")
  }
  componentDidMount(){
    console.log("supported",supported)
    console.log("version",version)
    let getUserMedia =navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia
    if (getUserMedia) {
      getUserMedia = getUserMedia.bind(navigator);
    } else {
      console.log("not support")
      // have to figure out how to handle the error somehow
    }
    getUserMedia(
      { video: true, audio: true },
      this.handleStream,
      this.handleStreamError
    )
  }

  render() {
    return (
      <div>play</div>
    )
  }
}

export default Play
