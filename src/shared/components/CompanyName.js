import { CSSTransition } from "react-transition-group";
import { Typography, withStyles } from "@material-ui/core";
import React, { memo } from "react";

const styles = theme => ({
	brandText: {
		fontFamily: "'Baloo Bhaijaan', cursive",
		fontWeight: 400
	},
});

function CompanyName(props) {
	const {
		classes,
	} = props;
	return (
		<CSSTransition in={true} appear={true} classNames={"bz-fade"} timeout={300} unmountOnExit>
			<div>
				<Typography variant="h4" className={classes.brandText} display="inline" color="primary">
					B
				</Typography>
				<Typography variant="h5" className={classes.brandText} display="inline" color="textSecondary">
					&
				</Typography>
				<Typography variant="h4" className={classes.brandText} display="inline" color="secondary">
					D
				</Typography>
			</div>
		</CSSTransition>);
}

export default withStyles(styles, {withTheme: true})(memo(CompanyName));
