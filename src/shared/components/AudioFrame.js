import React, { Fragment, useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import MusicOffIcon from '@material-ui/icons/MusicOff';
import IconButton from "@material-ui/core/IconButton";

function AudioFrame(props)
{
	const {src} = props;
	const [playing, setPlaying] = useState(0);
	const bgMusic = useRef();
	
	const OnAction = useCallback(() =>{
		if (bgMusic.current) {
			if (bgMusic.current.paused) {
				bgMusic.current.play();
			}else{
				bgMusic.current.pause();
			}
		}
		if(bgMusic.current.paused){
			setPlaying(1);
		}else{
			setPlaying(2);
		}

	}, [setPlaying, bgMusic]);
	
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
				playing > 1 && <IconButton onClick={OnAction}>
					<MusicNoteIcon/>
				</IconButton>
			}
			{
				playing <= 1 && <IconButton onClick={OnAction}>
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
