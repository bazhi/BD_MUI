import React, { Fragment, useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import MusicOffIcon from '@material-ui/icons/MusicOff';
import IconButton from "@material-ui/core/IconButton";

function AudioFrame(props)
{
	const {src} = props;
	const [playing, setPlaying] = useState(false);
	const bgMusic = useRef();
	
	const OnAction = useCallback(() =>{
		if (bgMusic.current) {
			if (playing) {
				bgMusic.current.pause();
			}else{
				bgMusic.current.play();
			}
		}
		setPlaying(!playing);
	}, [setPlaying, bgMusic, playing]);
	
	useEffect(()=>{
		bgMusic.current.pause();
	}, [bgMusic]);
	
	return(
		<Fragment>
			<audio autoPlay={"autoplay"} loop={"loop"} preload={"auto"} ref={bgMusic}
			       src={src}>
				你的浏览器不支持audio标签
			</audio>
			{
				playing && <IconButton onClick={OnAction}>
					<MusicNoteIcon/>
				</IconButton>
			}
			{
				!playing && <IconButton onClick={OnAction}>
					<MusicOffIcon/>
				</IconButton>
			}
		</Fragment>
	);
}

AudioFrame.propTypes = {
	src: PropTypes.string.isRequired,
};


export default AudioFrame;
