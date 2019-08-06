import React from 'react';
import { FirebaseContext } from '../Context';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class MusicPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
      position: 0,
      duration: 0,
      currentTime: 0
    }

    this.onTimer = this.onTimer.bind(this);
    this.onPlaying = this.onPlaying.bind(this);
    this.onPause = this.onPause.bind(this);
    this.playAction = this.playAction.bind(this);
    this.pauseAction = this.pauseAction.bind(this);
    this.prevAction = this.prevAction.bind(this);
    this.nextAction = this.nextAction.bind(this);
  }

  nextAction() {
    this.setState({
      position: this.state.position + 1,
      isPlaying: false,
      duration: 0,
      currentTime: 0
    });
  }

  prevAction() {
    this.setState({
      position: this.state.position - 1,
      isPlaying: false,
      duration: 0,
      currentTime: 0
    });
  }

  pauseAction() {
    this.audio.pause();
  }

  playAction() {
    this.audio.play();
  }

  onTimer() {
    this.setState({
      currentTime: this.audio.currentTime,
      progress: this.audio.currentTime * 100 / this.audio.duration
    });
  }

  onPlaying() {
    this.setState({ isPlaying: true });
  }

  onPause() {
    this.setState({ isPlaying: false });
  }

  componentDidMount() {
    const {loadPlaylist, playlist} = this.context;
    if(playlist.length > 0) {
        this.playAction();
        toast.success('Lecture automatique en cours', {
            position:'bottom-right'
        });
    }
  }

  render() {
    const {playlist} = this.context;
    const { position } = this.state;

    return (
      <div className='music-player'>
          {/* blue: #108fa0,
          orange: #f7792f
          white: f6ede8 */}
        {/* <div className='progress-bar'
             style={{
                color: 'black',
                backgroundColor: 'orange',
                height: '10px',
                width: '200px',
                borderRadius: '5px',
                transition: 'all .2s',
                position: 'relative'
            }}
        >
            <div className='progress-bar-inner'
                style={{
                    height: '100%',
                    position: 'absolute',
                    backgroundColor: 'yellow',
                    width: this.state.progress + '%'
                }}
            />
        </div> */}
        {/* <ButtonsBar
          playlistPosition={position}
          playlistTotal={this.props.playlists.length}
          prevAction={this.prevAction}
          nextAction={this.nextAction}
          playAction={this.playAction}
          pauseAction={this.pauseAction}
          isPlaying={this.state.isPlaying}
        /> */}

        <audio
          ref={audio => (this.audio = audio)}
          src={playlist.length > 0 ? playlist[position].mp3 : ''}
          onTimeUpdate={this.onTimer}
          onPlaying={this.onPlaying}
          onPause={this.onPause}
          onLoadedMetadata={this.setState(prevState => {
            if(prevState.duration !== this.state.duration) {
                return {duration: this.duration}
            }
        })}
        />
      </div>
    );
  }
}

MusicPlayer.contextType = FirebaseContext;