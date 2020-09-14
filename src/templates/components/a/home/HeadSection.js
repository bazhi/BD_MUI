import React, { Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Box, Card, Grid, Hidden, withStyles, withWidth, } from "@material-ui/core";
import WaveBorder from "shared/components/WaveBorder";
import QRCode from "qrcode.react";

const styles = (theme) => ({
	card: {
		boxShadow: theme.shadows[4],
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
		[theme.breakpoints.up("xs")]: {
			paddingTop: theme.spacing(3),
			paddingBottom: theme.spacing(3),
		},
		[theme.breakpoints.up("sm")]: {
			paddingTop: theme.spacing(5),
			paddingBottom: theme.spacing(5),
			paddingLeft: theme.spacing(4),
			paddingRight: theme.spacing(4),
		},
		[theme.breakpoints.up("md")]: {
			paddingTop: theme.spacing(5.5),
			paddingBottom: theme.spacing(5.5),
			paddingLeft: theme.spacing(5),
			paddingRight: theme.spacing(5),
		},
		[theme.breakpoints.up("lg")]: {
			paddingTop: theme.spacing(6),
			paddingBottom: theme.spacing(6),
			paddingLeft: theme.spacing(6),
			paddingRight: theme.spacing(6),
		},
		[theme.breakpoints.down("lg")]: {
			width: "auto",
		},
	},
	wrapper: {
		position: "relative",
		backgroundColor: theme.palette.secondary.main,
		paddingBottom: theme.spacing(2),
	},
	image: {
		maxWidth: "100%",
		verticalAlign: "middle",
		borderRadius: theme.shape.borderRadius,
		boxShadow: theme.shadows[4],
	},
	container: {
		marginTop: theme.spacing(6),
		marginBottom: theme.spacing(12),
		[theme.breakpoints.down("md")]: {
			marginBottom: theme.spacing(9),
		},
		[theme.breakpoints.down("sm")]: {
			marginBottom: theme.spacing(6),
		},
		[theme.breakpoints.down("sm")]: {
			marginBottom: theme.spacing(3),
		},
	},
	containerFix: {
		[theme.breakpoints.up("md")]: {
			maxWidth: "none !important",
		},
	},
	waveBorder: {
		paddingTop: theme.spacing(4),
	},
});

function HeadSection(props) {
	const {classes, theme} = props;
	
	return (
		<Fragment>
			<div className={classNames("lg-p-top", classes.wrapper)}>
				<div className={classNames("container-fluid", classes.container)}>
					<Box display="flex" justifyContent="center" className="row">
						<Card className={classes.card}>
							<div className={classNames(classes.containerFix, "container")}>
								<Box justifyContent="space-between" className="row">
									<Grid item xs={12} md={5}>
										<Box display="flex" flexDirection="column" justifyContent="space-between" height="100%">
											<QRCode value="http://192.168.50.193:8081/t/a">
											</QRCode>
										</Box>
									</Grid>
									<Hidden smDown>
										<Grid item md={4}>
										
										</Grid>
									</Hidden>
								</Box>
							</div>
						</Card>
					</Box>
				</div>
			</div>
			<WaveBorder upperColor={theme.palette.secondary.main} lowerColor="#FFFFFF" className={classes.waveBorder} animationNegativeDelay={2} />
		</Fragment>
	);
}

HeadSection.propTypes = {
	classes: PropTypes.object,
	width: PropTypes.string,
	theme: PropTypes.object,
};

export default withWidth()(
	withStyles(styles, {withTheme: true})(HeadSection)
);
