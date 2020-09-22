import React, { Fragment, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Grid, withStyles } from "@material-ui/core";
import palette from "../../../palette"
import { SketchPicker as ColorPicker } from "react-color";
import Typography from "@material-ui/core/Typography";
import Popover from "@material-ui/core/Popover";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import { AxiosCache } from "shared/components/AxiosCache";

const styles = (theme) => ({
	colorBox: {
		height: 24,
		maxWidth: 100,
		marginRight: 20,
	},
	themePaper: {
		marginLeft: 10,
		marginBottom: 10,
		marginTop: 10,
		marginRight: 10,
		backgroundColor:"#EEEEEE",
	},
	gridItem:{
		marginTop: 2,
		backgroundColor:"#FFFFFF",
	}
});

const decimalToHex = (alpha: number) => alpha === 0 ? '00' : Math.round(255 * alpha).toString(16)

function GetColorHex(c) {
	return `${c.hex}${decimalToHex(c.rgb.a)}`
}

function ToArray(Obj, Arr, parentKey) {
	let rightKey = parentKey;
	if (rightKey !== "") {
		rightKey += ".";
	}
	for (let key in Obj) {
		let newKey = rightKey + key;
		let item = Obj[key];
		if (typeof (item) === "object") {
			ToArray(item, Arr, newKey);
		} else if (typeof (item) === "string") {
			Arr.push({
				key: newKey,
				color: item
			});
		}
	}
}

function PaletteEdit(props) {
	const {classes, id} = props;
	const [paletteArray, setPaletteArray] = useState([]);
	const [bDisplayColorPicker, setDisplayColorPicker] = useState(false);
	const [colorIndex, setColorIndex] = useState(null);
	const [currentColor, setCurrentColor] = useState("#FFFFFFFF");
	const [anchorEl, setAnchorEl] = React.useState(null);
	
	const ChangeColor = useCallback((index, value) => {
		if (index || index === 0) {
			paletteArray[index].color = value;
			setPaletteArray(paletteArray);
		}
	}, [paletteArray]);
	
	const handleClick = useCallback((event, index) => {
		setAnchorEl(event.currentTarget);
		setColorIndex(index);
		setCurrentColor(paletteArray[index].color);
		setDisplayColorPicker(true);
	}, [paletteArray]);
	
	const handleClose = useCallback(() => {
		setDisplayColorPicker(false);
	}, [setDisplayColorPicker]);
	
	const handleChange = useCallback((color) => {
		setCurrentColor(color.rgb);
	}, [setCurrentColor])
	
	const handleChangeComplete = useCallback((color) => {
		ChangeColor(colorIndex, GetColorHex(color));
	}, [ChangeColor, colorIndex]);
	
	const handleOnSave = useCallback(() => {
		let jsonObject = {}
		paletteArray.forEach(function (item, index, arr){
			jsonObject[item.key] = item.color;
		})
		console.log(jsonObject);
	}, [paletteArray]);
	
	useEffect(() => {
		
		AxiosCache({
			url: `/data/${id}/palette.json`,
			method: 'get'
		}).then(function (res) {
			let data = res.data;
			let Arr = [];
			ToArray(palette, Arr, "");
			Arr.forEach(function (item, index,arr ){
				if (data[item.key]){
					item.color = data[item.key];
				}
			})
			setPaletteArray(Arr);
		}).catch(function (error) {
			let Arr = [];
			ToArray(palette, Arr, "");
			setPaletteArray(Arr);
		});
	}, [id, setPaletteArray])
	
	return (
		<Box md={2}>
			<Typography paragraph variant="h6">
				Theme Edit
			</Typography>
			<Paper elevation={3}>
				<Box className={classes.themePaper}>
					<Grid container spacing={1}>
						{
							paletteArray.map((item, index) => {
								return (
									<Grid item container lg={6} md={6} sm={12} xs={12} key={index} justify={"space-between"} className={classes.gridItem}>
										<Typography noWrap={true} display="inline">
											{item.key}
										</Typography>
										<Button className={classes.colorBox} variant="outlined"
										        onClick={(event) => {
											        handleClick(event, index);
										        }}
										        style={{
											        backgroundColor: item.color
										        }}
										>
										</Button>
									</Grid>
								);
							})
						}
						<Grid item container sm={12} xs={12} justify={"center"} className={classes.gridItem}>
							<Button onClick={handleOnSave} variant="contained" color="secondary">
								Save
							</Button>
						</Grid>
						<Popover onClose={handleClose} open={bDisplayColorPicker} anchorEl={anchorEl}
						         anchorOrigin={{
							         vertical: 'bottom',
							         horizontal: 'left',
						         }}
						         transformOrigin={{
							         vertical: 'top',
							         horizontal: 'left',
						         }}
						>
							<ColorPicker color={currentColor} onChange={handleChange} onChangeComplete={handleChangeComplete} disableAlpha={false} />
						</Popover>
					</Grid>
				</Box>

			</Paper>

		</Box>
	)
}

PaletteEdit.propTypes = {
	classes: PropTypes.object,
	theme: PropTypes.object,
	id: PropTypes.number,
};

export default withStyles(styles, {withTheme: true})(PaletteEdit);
