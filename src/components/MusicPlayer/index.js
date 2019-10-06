import React from 'react';
import {FirebaseContext} from '../Context';
import 'react-toastify/dist/ReactToastify.css';

export class MusicPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ready: false,
      isPlaying: false,
      isCollapsed: true,
      track: 0,
      duration: 0,
      currentTime: 0,
      isAutoPlayModalOpen: false
    }

    this.renderCurrentTime = this.renderCurrentTime.bind(this);
    this.setPlayState = this.setPlayState.bind(this);
    this.setPauseState = this.setPauseState.bind(this);
    this.playAudio = this.playAudio.bind(this);
    this.pauseAudio = this.pauseAudio.bind(this);
    this.prevTrack = this.prevTrack.bind(this);
    this.nextTrack = this.nextTrack.bind(this);
    this.togglePlayer = this.togglePlayer.bind(this);
    this.setToReady = this.setToReady.bind(this);
  }

  togglePlayer() {
    this.setState({
      isCollapsed: !this.state.isCollapsed
    });
  }

  setToReady() {
    // audio can only be played if state property ready is set to true and 
    // the DOM has rendered the audio ref
    this.setState(prevState => {
      if(!prevState.ready) {
        return {ready: true};
      }
    });
  }

  async nextTrack() {
    const {playlist} = this.context,
    {track} = this.state;
    if(this.audio && playlist && playlist[track + 1]) {
      await this.setState({
        track: track + 1,
        isPlaying: false,
        duration: 0,
        currentTime: 0,
      });
      this.playAudio();
    } else {
      console.log("Last song:(");
    }
  }

  async prevTrack() {
    const {playlist} = this.context,
    {track} = this.state;
    if(this.audio && playlist && playlist[track - 1]) {
     await this.setState({
        track: this.state.track - 1,
        isPlaying: false,
        duration: 0,
        currentTime: 0
      });
      this.playAudio()
    }
  }

  pauseAudio() {
    if (this.audio) {
      this.audio.pause();
    }
  }

  playAudio() {
    if(this.audio && this.state.ready) {
      this.audio.play();
    }    
  }

  renderCurrentTime() {
    this.setState({
      currentTime: this.audio ? this.audio.currentTime : 0,
      progress: this.audio ? this.audio.currentTime * 100 / this.audio.duration : 0,
    });
  }

  setPlayState() {
    this.setState({ isPlaying: true});
  }

  setPauseState() {
    this.setState({ isPlaying: false});
  }

  render() {
    const {playlist, toggleMusicModal, isMusicModalOpen} = this.context;
    const {track, isCollapsed, isPlaying, playbackError} = this.state;

    return (
      <React.Fragment>
        {isMusicModalOpen && (
          <div className='admin-modal music'>
              {/* <div 
                  className='material-icons close' 
                  onClick={this.toggleModal}
              >
                  close
              </div> */}
              <ul>
                <li>Musique?</li>
                <li className='modal-buttons'>
                    <span onClick={() => toggleMusicModal(false)}>NON</span>
                    <span onClick={() => 
                      {this.playAudio(); toggleMusicModal(false);
                    }}>
                      OUI
                    </span>
                </li>
              </ul>
          </div>
        )}
        {isCollapsed && (
          <span className='material-icons collapsed-player' onClick={this.togglePlayer}>play_arrow</span>
        )}
        <div className='music-player' style={{opacity: (isCollapsed ? '0' : '1'), zIndex: (isCollapsed ? 'initial' : '15')}}>
          <span className='material-icons hide-player' onClick={this.togglePlayer}>close</span>
          <div className='top'>
            <div className='track-info'>
              {playlist[track] ? `${playlist[track].title}` : '...'}
            </div>
          </div>
          <div className='bottom'>
            <div className='controls'>
              <span className='material-icons' onClick={this.prevTrack}>skip_previous</span>
              <span className='material-icons' onClick={!isPlaying ? this.playAudio : this.pauseAudio}>{(!isPlaying && !playbackError) ? 'play_arrow' : (!isPlaying && playbackError) ? 'error' : 'pause'}</span>
              <span className='material-icons' onClick={this.nextTrack}>skip_next</span>
            </div>
            <div className='progress-bar'>
              <div className='progress-bar-inner' style={{width: this.state.progress + '%'}}/>
            </div>
          </div>
          <audio
            ref={audio => (this.audio = audio)}
            onTimeUpdate={this.renderCurrentTime}
            onPlaying={this.setPlayState}
            onPause={this.setPauseState}
            preload
            // set state to ready once the audio has been loaded
            onLoadedData={this.setToReady}
            src={playlist.length > 0 ? playlist[track].mp3  : ''} type='audio/mp3'
            onLoadedMetadata={this.setState(prevState => {
              if(prevState.duration !== this.state.duration) {
                return {duration: this.duration}
              }
            })}
          />
        </div>
      </React.Fragment>
    );
  }
}

MusicPlayer.contextType = FirebaseContext;