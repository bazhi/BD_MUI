import React, { Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Box, Card, Grid, withStyles, withWidth, } from "@material-ui/core";
import WaveBorder from "shared/components/WaveBorder";
import QRCode from "qrcode.react";

const styles = (theme) => ({
	card: {
		boxShadow: theme.shadows[4],
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
		width: "auto",
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2),
	},
	wrapper: {
		position: "relative",
		paddingBottom: theme.spacing(1),
	},
	image: {
		maxWidth: "100%",
		verticalAlign: "middle",
		borderRadius: theme.shape.borderRadius,
		boxShadow: theme.shadows[4],
	},
	container: {
		marginTop: theme.spacing(0),
		marginBottom: theme.spacing(0),
	},
	waveBorder: {
		paddingTop: theme.spacing(0),
	},
});

function HeadSection(props) {
	const {classes, userStyle} = props;
	
	return (
		<Fragment>
			<div className={classNames("lg-p-top", classes.wrapper)} style={{backgroundColor: userStyle.wave}}>
				<div className={classNames("container-fluid", classes.container)}>
					<Box display="flex" justifyContent="center" className="row">
						<Card className={classes.card}>
							<Grid container ajustify="space-between" spacing={6}>
								<Grid item xs={6} md={6}>
									<QRCode value="http://192.168.137.1:8081/t/a">
									</QRCode>
								</Grid>
								<Grid item xs={6} md={6}>
									<QRCode value="http://192.168.50.193:8081/t/a">
									</QRCode>
								</Grid>
							</Grid>
						</Card>
					</Box>
				</div>
			</div>
			<WaveBorder upperColor={userStyle.wave} lowerColor={userStyle.background} className={classes.waveBorder} animationNegativeDelay={2} />
		</Fragment>
	);
}

HeadSection.propTypes = {
	classes: PropTypes.object.isRequired,
	width: PropTypes.string,
	theme: PropTypes.object.isRequired,
	userStyle: PropTypes.object.isRequired,
};

export default withWidth()(
	withStyles(styles, {withTheme: true})(HeadSection)
);
