import React, { memo } from "react";
import PropTypes from "prop-types";
import { Switch } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import PropsRoute from "shared/components/PropsRoute";

import Dashboard from "./dashboard/Dashboard";
import Activity from "logged_in/components/activities/Main";
import Subscription from "./subscription/Subscription";
import * as Pages from "../constants/TabPage"

const styles = (theme) => ({
	wrapper: {
		margin: theme.spacing(1),
		width: "auto",
		[theme.breakpoints.up("xs")]: {
			width: "95%",
			marginLeft: "auto",
			marginRight: "auto",
			marginTop: theme.spacing(4),
			marginBottom: theme.spacing(4),
		},
		[theme.breakpoints.up("sm")]: {
			marginTop: theme.spacing(6),
			marginBottom: theme.spacing(6),
			width: "90%",
			marginLeft: "auto",
			marginRight: "auto",
		},
		[theme.breakpoints.up("md")]: {
			marginTop: theme.spacing(6),
			marginBottom: theme.spacing(6),
			width: "82.5%",
			marginLeft: "auto",
			marginRight: "auto",
		},
		[theme.breakpoints.up("lg")]: {
			marginTop: theme.spacing(6),
			marginBottom: theme.spacing(6),
			width: "70%",
			marginLeft: "auto",
			marginRight: "auto",
		},
	},
});

function Routing(props) {
	const {
		classes,
		showMessage,
		posts,
		transactions,
		toggleAccountActivation,
		statistics,
		targets,
		setTargets,
		setPosts,
		isAccountActivated,
		selectPage,
	} = props;
	return (
		<div className={classes.wrapper}>
			<Switch>
				<PropsRoute
					path={Pages.Activity.Path}
					component={Activity}
					pushMessageToSnackbar={showMessage}
					posts={posts}
					setPosts={setPosts}
					selectPage={selectPage}
				/>
				<PropsRoute
					path={Pages.Subscription.Path}
					component={Subscription}
					transactions={transactions}
					pushMessageToSnackbar={showMessage}
					selectPage={selectPage}
				/>
				<PropsRoute
					path={Pages.Dashboard.Path}
					component={Dashboard}
					toggleAccountActivation={toggleAccountActivation}
					pushMessageToSnackbar={showMessage}
					statistics={statistics}
					targets={targets}
					setTargets={setTargets}
					isAccountActivated={isAccountActivated}
					selectPage={selectPage}
				/>
			</Switch>
		</div>
	);
}

Routing.propTypes = {
	classes: PropTypes.object.isRequired,
	showMessage: PropTypes.func,
	setTargets: PropTypes.func.isRequired,
	transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
	toggleAccountActivation: PropTypes.func,
	statistics: PropTypes.object.isRequired,
	targets: PropTypes.arrayOf(PropTypes.object).isRequired,
	isAccountActivated: PropTypes.bool.isRequired,
	selectPage: PropTypes.func.isRequired,
};

export default withStyles(styles, {withTheme: true})(memo(Routing));
