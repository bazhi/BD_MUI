import React, { Fragment } from "react";
import { Box, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import classNames from "classnames";
import Typography from "@material-ui/core/Typography";

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

function Rule(props) {
	const {classes, userData} = props
	
	return (
		<Fragment>
			<div className={classNames("lg-p-top", classes.wrapper)}>
				<div className={classNames("container-fluid", classes.container)}>
					<Box display="flex" justifyContent="center" className="row">
						<Box className={classes.card}>
							<Typography variant="h5" align="center">
								规则说明
							</Typography>
							{
								userData && userData.map((element, index) => {
									return (<div className={classes.item} key={index}>
										{element}
									</div>)
								})
							}
						</Box>
					</Box>
				</div>
			</div>
		</Fragment>
	);
}

Rule.propTypes = {
	theme: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	userData: PropTypes.array.isRequired,
};

export default withStyles(styles, {withTheme: true})(Rule)
