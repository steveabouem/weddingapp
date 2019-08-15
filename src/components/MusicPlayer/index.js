import React from 'react';
import { FirebaseContext } from '../Context';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class MusicPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
      isCollapsed: true,
      track: 0,
      duration: 0,
      currentTime: 0,
      isAutoPlayModalOpen: true
    }

    this.renderCurrentTime = this.renderCurrentTime.bind(this);
    this.setPlayState = this.setPlayState.bind(this);
    this.setPauseState = this.setPauseState.bind(this);
    this.playAudio = this.playAudio.bind(this);
    this.pauseAudio = this.pauseAudio.bind(this);
    this.prevTrack = this.prevTrack.bind(this);
    this.nextTrack = this.nextTrack.bind(this);
    this.togglePlayer = this.togglePlayer.bind(this);
  }

  togglePlayer() {
    this.setState({
      isCollapsed: !this.state.isCollapsed
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
        currentTime: 0
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
      this.audio.play()
      .then( () => {
        toast.info('Lecture automatique en cours', {
            position:'bottom-right'
        });
      })
      .catch( () => {
        this.setState({playbackError: true});
        toast.error('Le lecteur audio est indisponible.', {
          position:'bottom-right'
      });
      });
  }

  renderCurrentTime() {
    this.setState({
      currentTime: this.audio ? this.audio.currentTime : 0,
      progress: this.audio ? this.audio.currentTime * 100 / this.audio.duration : 0
    });
  }

  setPlayState() {
    this.setState({ isPlaying: true });
  }

  setPauseState() {
    this.setState({ isPlaying: false });
  }

  componentDidMount() {
    if(this.audio) {
      this.playAudio()
    }
  }

  render() {
    const {playlist} = this.context;
    const {track, isCollapsed, isPlaying, playbackError} = this.state;

    return (
      <React.Fragment>
        {isCollapsed && (
          <span className='material-icons collapsed-player' onClick={this.togglePlayer}>play_arrow</span>
        )}
        <div className='music-player' style={{opacity: isCollapsed ? '0' : '1'}}>
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