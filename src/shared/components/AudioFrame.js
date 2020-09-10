import React, { Fragment, useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import MusicOffIcon from '@material-ui/icons/MusicOff';
import IconButton from "@material-ui/core/IconButton";

function AudioFrame(props) {
	const {src} = props;
	const [playing, setPlaying] = useState(false);
	const bgMusic = useRef();
	
	const OnAction = useCallback(() => {
		if (bgMusic.current) {
			if (bgMusic.current.paused) {
				bgMusic.current.play();
			} else {
				bgMusic.current.pause();
			}
		}
	}, [bgMusic]);
	
	const OnMount = useCallback(() => {
		if (bgMusic.current) {
			bgMusic.current.addEventListener("play", function () {
				setPlaying(true);
			});
			bgMusic.current.addEventListener("pause", function () {
				setPlaying(false);
			});
		}
	}, [bgMusic, setPlaying]);
	
	useEffect(OnMount);
	
	return (
		<Fragment>
			<audio autoPlay={"autoplay"} loop={"loop"} preload={"auto"} ref={bgMusic}
			       src={src}>
				你的浏览器不支持audio标签
			</audio>
			{
				playing && <IconButton onClick={OnAction}>
					<MusicNoteIcon />
				</IconButton>
			}
			{
				!playing && <IconButton onClick={OnAction}>
					<MusicOffIcon />
				</IconButton>
			}
		</Fragment>
	);
}

AudioFrame.propTypes = {
	src: PropTypes.string.isRequired,
};


export default AudioFrame;
