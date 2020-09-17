import { Box, Card, Grid, withStyles } from "@material-ui/core";
import QRCode from "qrcode.react";
import React, { Fragment } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

const styles = (theme) => ({
	wrapper: {
		position: "relative",
		paddingBottom: theme.spacing(1),
	},
	container: {
		marginTop: theme.spacing(0),
		marginBottom: theme.spacing(0),
	},
	card: {
		boxShadow: theme.shadows[4],
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
		maxWidth: 600,
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2),
	},
	item: {
		paddingTop: theme.spacing(1),
	}
});

function Share(props) {
	const {classes} = props
	
	return (
		<Fragment>
			<div className={classNames("lg-p-top", classes.wrapper)}>
				<div className={classNames("container-fluid", classes.container)}>
					<Box display="flex" justifyContent="center" className="column">
						<Card className={classes.card}>
							<Grid container ajustify="space-between" spacing={3}>
								<Grid item xs={6} md={6}>
									<QRCode value="http://192.168.137.1:8081/t/a?id=01">
									</QRCode>
								</Grid>
								<Grid item xs={6} md={6}>
									<QRCode value="http://192.168.50.193:8081/t/a?id=01">
									</QRCode>
								</Grid>
							</Grid>
						</Card>
					</Box>
				</div>
			</div>
		</Fragment>
	);
}

Share.propTypes = {
	theme: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(Share)
