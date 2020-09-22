import React, { Fragment, lazy, Suspense, useCallback, useState } from "react";
import PropTypes from "prop-types";
import { Box, FormControl, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, MenuItem, OutlinedInput, Select, Typography, withStyles, } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Bordered from "shared/components/Bordered";
import ImageCropperDialog from "shared/components/ImageCropperDialog";

const Dropzone = lazy(() => import("shared/components/Dropzone"));
const EmojiTextArea  = lazy(() => import("shared/components/EmojiTextArea"));
const DateTimePicker  = lazy(() => import("shared/components/DateTimePicker"));

const styles = (theme) => ({
	floatButtonWrapper: {
		position: "absolute",
		top: theme.spacing(1),
		right: theme.spacing(1),
		zIndex: 1000,
	},
	inputRoot: {
		width: 190,
		"@media (max-width:  400px)": {
			width: 160,
		},
		"@media (max-width:  360px)": {
			width: 140,
		},
		"@media (max-width:  340px)": {
			width: 120,
		},
	},
	uploadIcon: {
		fontSize: 48,
		transition: theme.transitions.create(["color", "box-shadow", "border"], {
			duration: theme.transitions.duration.short,
			easing: theme.transitions.easing.easeInOut,
		}),
	},
	imgWrapper: {
		position: "relative",
	},
	img: {
		width: "100%",
		border: "1px solid rgba(0, 0, 0, 0.23)",
		borderRadius: theme.shape.borderRadius,
		borderTopLeftRadius: 0,
		borderBottomLeftRadius: 0,
	},
	uploadText: {
		transition: theme.transitions.create(["color", "box-shadow", "border"], {
			duration: theme.transitions.duration.short,
			easing: theme.transitions.easing.easeInOut,
		}),
	},
	numberInput: {
		width: 110,
	},
	numberInputInput: {
		padding: "9px 34px 9px 14.5px",
	},
	emojiTextArea: {
		borderTopRightRadius: 0,
		borderBottomRightRadius: 0,
		marginRight: -1,
		width: "100%",
	},
	dNone: {
		display: "none",
	},
});

const inputOptions = ["None", "Slow", "Normal", "Fast"];
const inputs = [
	{
		label: "Option 1",
	},
	{
		label: "Option 2",
	},
	{
		label: "Option 3",
	},
	{
		label: "Option 4",
	},
];

function AddOptions(props) {
	const {
		classes,
		files,
		deleteItem,
		onDrop,
		cropperFile,
		onCrop,
		onCropperClose,
		uploadAt,
		onChangeUploadAt,
	} = props;
	const [options, setOptions] = useState(["None","None","None","None"]);
	const handleChange = useCallback(
		(event, index) => {
			const {name, value} = event.target;
			let list = options.slice(0);
			list[index] = value;
			setOptions(list);
		}, [options]);
	
	const showFile = useCallback(() => {
		if (files[0]) {
			return (
				<div className={classes.imgWrapper}>
					<img
						alt="uploaded item"
						src={files[0].preview}
						className={classes.img}
					/>
					<div className={classes.floatButtonWrapper}>
						<IconButton onClick={deleteItem}>
							<CloseIcon />
						</IconButton>
					</div>
				</div>
			);
		}
		return (
			<Suspense fallback={<Fragment />}>
				<Dropzone accept="image/png, image/jpeg" onDrop={onDrop} fullHeight>
			        <span className={classes.uploadText}>
			          Click / Drop file here
			        </span>
				</Dropzone>
			</Suspense>
		);
	}, [onDrop, files, classes, deleteItem]);
	
	return (
		<Fragment>
			<ImageCropperDialog
				open={!!cropperFile}
				src={cropperFile ? cropperFile.preview : ""}
				onCrop={onCrop}
				onClose={onCropperClose}
				aspectRatio={3 / 2}
			/>
			<Typography paragraph variant="h6">
				Upload Image
			</Typography>
			<Box mb={2}>
				<Suspense fallback={<Fragment/>}>
					<EmojiTextArea
						inputClassName={classes.emojiTextArea}
						maxCharacters={2200}
						topContent={showFile()}
						emojiSet="google"
					/>
				</Suspense>
			</Box>
			<Typography paragraph variant="h6">
				Options
			</Typography>
			<List disablePadding>
				<Bordered disableVerticalPadding disableBorderRadius>
					<ListItem divider disableGutters className="listItemLeftPadding">
						<ListItemText>
							<Typography variant="body2">Upload at</Typography>
						</ListItemText>
						<ListItemSecondaryAction>
							<Suspense fallback={<Fragment/>}>
								<DateTimePicker
									value={uploadAt}
									format="yyyy/MM/dd hh:mm a"
									onChange={onChangeUploadAt}
									disablePast
								/>
							</Suspense>
						</ListItemSecondaryAction>
					</ListItem>
					{options.map((element, index) => (
						<ListItem
							className="listItemLeftPadding"
							disableGutters
							divider={index !== options.length - 1}
							key={index}
						>
							<ListItemText>
								<Typography variant="body2">{inputs[index].label}</Typography>
							</ListItemText>
							<FormControl variant="outlined">
								<ListItemSecondaryAction>
									<Select
										value={element}
										onChange={(event => {
											handleChange(event, index);
										})}
										input={
											<OutlinedInput
												name={element}
												labelWidth={0}
												className={classes.numberInput}
												classes={{input: classes.numberInputInput}}
											/>
										}
										MenuProps={{disableScrollLock: true}}
									>
										{inputOptions.map((innerElement) => (
											<MenuItem value={innerElement} key={innerElement}>
												{innerElement}
											</MenuItem>
										))}
									</Select>
								</ListItemSecondaryAction>
							</FormControl>
						</ListItem>
					))}
				</Bordered>
			</List>
		</Fragment>
	);
}

AddOptions.propTypes = {
	onEmojiTextareaChange: PropTypes.func,
	classes: PropTypes.object,
	cropperFile: PropTypes.object,
	onCrop: PropTypes.func,
	onCropperClose: PropTypes.func,
	files: PropTypes.arrayOf(PropTypes.object).isRequired,
	deleteItem: PropTypes.func,
	onDrop: PropTypes.func,
	value: PropTypes.string,
	characters: PropTypes.number,
	uploadAt: PropTypes.instanceOf(Date),
	onChangeUploadAt: PropTypes.func,
};

export default withStyles(styles, {withTheme: true})(AddOptions);
