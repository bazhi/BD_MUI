import React, { Fragment } from "react";
import PropTypes from "prop-types";
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import MusicOffIcon from '@material-ui/icons/MusicOff';
import IconButton from "@material-ui/core/IconButton";


class AudioFrame extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			playing: false,
		}
		this.bgMusic = React.createRef();
		this.onAction = this.onAction.bind(this);
		this.onAudioPlay = this.onAudioPlay.bind(this);
		this.onAudioPause = this.onAudioPause.bind(this);
		this.mounted = false;
	}
	
	onAction() {
		if (this.bgMusic.current) {
			if (this.bgMusic.current.paused) {
				this.bgMusic.current.play();
			} else {
				this.bgMusic.current.pause();
			}
		}
	}
	
	onAudioPause()
	{
		if(this.mounted ){
			this.setState({
				playing:false,
			});
		}
	}
	
	onAudioPlay()
	{
		if(this.mounted ){
			this.setState({
				playing:true,
			});
		}
	}
	
	componentDidMount() {
		this.mounted = true;
		if (this.bgMusic.current) {
			this.bgMusic.current.addEventListener("pause", this.onAudioPause);
			this.bgMusic.current.addEventListener("play", this.onAudioPlay)
		}
	}
	
	componentWillUnmount() {
		this.mounted = false;
		if (this.bgMusic.current) {
			this.bgMusic.current.removeEventListener("paused", this.onAudioPause);
			this.bgMusic.current.removeEventListener("playing", this.onAudioPlay)
		}
	}
	
	render() {
		return (
			<Fragment>
				<audio autoPlay={"autoplay"} loop={"loop"} preload={"auto"} ref={this.bgMusic}
				       src={this.props.src}>
					你的浏览器不支持audio标签
				</audio>
				{
					this.state.playing && <IconButton onClick={this.onAction}>
						<MusicNoteIcon />
					</IconButton>
				}
				{
					!this.state.playing && <IconButton onClick={this.onAction}>
						<MusicOffIcon />
					</IconButton>
				}
			</Fragment>
		);
	}
}

AudioFrame.propTypes = {
	src: PropTypes.string.isRequired,
};


export default AudioFrame;
