import React, { Fragment, lazy, Suspense, useCallback, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Box, List, ListItem, ListItemSecondaryAction, ListItemText, Typography, withStyles, } from "@material-ui/core";
import Bordered from "shared/components/Bordered";
import EditUserInfo from "shared/components/EditUserInfo";
import TextField from "@material-ui/core/TextField";

const DateTimePicker = lazy(() => import("shared/components/DateTimePicker"));

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

const timeInputs = [
	{
		label: "开始时间:"
	},
	{
		label: "结束时间:"
	}
];

function AddOptions(props) {
	const {
		classes,
	} = props;
	const [timeArray, setTimeArray] = useState([new Date(), new Date()]);
	const [items, setItems] = useState([{}, {}, {}, {}, {}]);
	const refTitle = useRef();
	const refInformation = useRef();
	
	const handleChangeTime = useCallback((date, index) => {
		let array = timeArray.slice(0);
		array[index] = date;
		if (array[1] < array[0]) {
			if (0 === index) {
				array[1] = array[0];
			} else {
				array[0] = array[1];
			}
		}
		setTimeArray(array);
	}, [timeArray]);
	
	return (
		<Fragment>
			<Typography paragraph variant="h6">
				主题名称
			</Typography>
			<Box mb={2}>
				<TextField ref={refTitle} fullWidth variant="outlined" placeholder={"description"} inputProps={{
					'maxLength': '50',
					'minLength': '5',
				}} />
			</Box>
			<Typography paragraph variant="h6">
				主题信息
			</Typography>
			<Box mb={2}>
				<TextField ref={refInformation} fullWidth multiline variant="outlined" rows={6} placeholder={"description"} inputProps={{
					'maxLength': '2000',
					'minLength': '10',
				}} />
			</Box>
			<Typography paragraph variant="h6">
				时间
			</Typography>
			<Box mb={2}>
				<List disablePadding>
					<Bordered disableVerticalPadding disableBorderRadius>
						{timeInputs.map((element, index) => (
							<ListItem divider={index !== timeInputs.length - 1} disableGutters className="listItemLeftPadding" key={index}>
								<ListItemText>
									<Typography variant="body2">{element.label}</Typography>
								</ListItemText>
								<ListItemSecondaryAction>
									<Suspense fallback={<Fragment />}>
										<DateTimePicker
											value={timeArray[index]}
											format="yyyy/MM/dd hh:mm a"
											onChange={(date) => {
												handleChangeTime(date, index);
											}}
											disablePast
										/>
									</Suspense>
								</ListItemSecondaryAction>
							</ListItem>
						))}
					</Bordered>
				</List>
			</Box>
			<Typography paragraph variant="h6">
				选项
			</Typography>
			<Box mb={2}>
				{
					items.map((element, index) => (
						<EditUserInfo id={index} />
					))
				}
			</Box>
		</Fragment>
	);
}

AddOptions.propTypes = {
	onEmojiTextareaChange: PropTypes.func,
	classes: PropTypes.object,
	value: PropTypes.string,
};

export default withStyles(styles, {withTheme: true})(AddOptions);
