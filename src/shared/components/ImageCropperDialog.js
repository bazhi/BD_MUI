import React, { Fragment, lazy, Suspense, useCallback, useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, Dialog, DialogActions, DialogContent, withStyles, } from "@material-ui/core";

const ImageCropper = lazy(() => import("shared/components/ImageCropper"));

const styles = (theme) => ({
	dialogPaper: {maxWidth: `${theme.breakpoints.values.md}px !important`},
	dialogContent: {
		paddingTop: theme.spacing(2),
		paddingRight: theme.spacing(2),
		paddingLeft: theme.spacing(2),
	},
});

function ImageCropperDialog(props) {
	const {
		classes,
		onClose,
		open,
		src,
		onCrop,
		aspectRatio,
		theme,
	} = props;
	const [crop, setCrop] = useState(null);
	
	const getCropFunctionFromChild = useCallback(
		(cropFunction) => {
			setCrop(() => cropFunction);
		},
		[setCrop]
	);
	
	return (
		<Dialog open={open} onEscapeKeyDown={onClose} classes={{paper: classes.dialogPaper}} style={{overflowX: "visible"}}>
			<DialogContent className={classes.dialogContent}>
				<Suspense fallback={<Fragment />}>
					<ImageCropper
						src={src}
						setCropFunction={getCropFunctionFromChild}
						onCrop={onCrop}
						aspectRatio={aspectRatio}
						color={theme.palette.primary.main}
					/>
				</Suspense>
			</DialogContent>
			<DialogActions>
				<Box mr={1}>
					<Button onClick={onClose}>Close</Button>
				</Box>
				<Button variant="contained" color="secondary" onClick={crop}>
					Crop
				</Button>
			</DialogActions>
		</Dialog>
	);
}

ImageCropperDialog.propTypes = {
	classes: PropTypes.object.isRequired,
	onClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	onCrop: PropTypes.func.isRequired,
	src: PropTypes.string,
	aspectRatio: PropTypes.number,
};

export default withStyles(styles, {withTheme: true})(ImageCropperDialog);
