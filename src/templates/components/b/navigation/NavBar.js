import React, { memo } from "react";
import PropTypes from "prop-types";
import { AppBar, Toolbar, withStyles } from "@material-ui/core";
import LanguageSelector from "shared/components/LanguageSelector";
import CompanyName from "shared/components/CompanyName";

const styles = theme => ({
	appBar: {
		boxShadow: theme.shadows[6],
		backgroundColor: theme.palette.background.default
	},
	toolbar: {
		display: "flex",
		justifyContent: "space-between"
	},
});


function NavBar(props) {
	const {classes,} = props;
	return (
		<div className={classes.root}>
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar className={classes.toolbar}>
					<CompanyName />
					<div>
						<LanguageSelector className={""} />
					</div>
				</Toolbar>
			</AppBar>
		</div>
	);
}

NavBar.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(memo(NavBar));
