import React, { useCallback, useRef, useState } from "react";
import PropTypes from "prop-types";
import { GridListTileBar, withStyles } from "@material-ui/core";
import VertOptions from "./VertOptions";

const styles = {
	imageContainer: {
		width: "100%",
		paddingTop: "100%",
		overflow: "hidden",
		position: "relative",
	},
	image: {
		position: "absolute",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		margin: "auto",
	},
	titleBar: {
		background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0) 100%)',
		height: 24,
	},
};

function SelfAligningImage(props) {
	const {
		classes,
		src,
		title,
		options,
		useBorder,
		theme,
		id,
	} = props;
	const Image = useRef();
	const [hasMoreWidthThanHeight, setHasMoreWidthThanHeight] = useState(null);
	const [hasLoaded, setHasLoaded] = useState(false);
	
	const onLoad = useCallback(() => {
		if (Image.current.naturalHeight < Image.current.naturalWidth) {
			setHasMoreWidthThanHeight(true);
		} else {
			setHasMoreWidthThanHeight(false);
		}
		setHasLoaded(true);
	}, [Image, setHasLoaded, setHasMoreWidthThanHeight]);
	
	return (
		<div className={classes.imageContainer}>
			<img
				style={{
					height: hasMoreWidthThanHeight ? "100%" : "auto",
					width: hasMoreWidthThanHeight ? "auto" : "100%",
					display: hasLoaded ? "block" : "none",
					borderRadius: useBorder ? theme.shape.borderRadius : 0,
				}}
				ref={Image}
				className={classes.image}
				onLoad={onLoad}
				src={src}
				alt=""
			/>
			{id && (
				<GridListTileBar
					subtitle={"ID: " + id}
					titlePosition={"top"}
					className={classes.titleBar}
				/>
			)}
			{title && (
				<GridListTileBar
					title={title}
					subtitle={""}
					actionIcon={
						options.length > 0 && (
							<VertOptions color={theme.palette.common.white} items={options} />
						)
					}
				/>
			)}
		</div>
	);
}

SelfAligningImage.propTypes = {
	classes: PropTypes.object.isRequired,
	src: PropTypes.string.isRequired,
	theme: PropTypes.object.isRequired,
	title: PropTypes.string,
	id: PropTypes.string,
	useBorder: PropTypes.bool,
	options: PropTypes.arrayOf(PropTypes.object),
};

export default withStyles(styles, {withTheme: true})(SelfAligningImage);
