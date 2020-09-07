import React, { Fragment, lazy, Suspense, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@material-ui/core";
import SettingsArea from "./SettingsArea";
import UserDataArea from "./UserDataArea";
import AccountInformationArea from "./AccountInformationArea";
import {Dashboard as TabDashboard } from "../../constants/TabPage";

const StatisticsArea = lazy(() => import("./StatisticsArea"));

function Dashboard(props) {
	const {
		selectPage,
		CardChart,
		statistics,
		toggleAccountActivation,
		pushMessageToSnackbar,
		targets,
		setTargets,
		isAccountActivated,
	} = props;
	
	useEffect(()=>{
		if(selectPage){
			selectPage(TabDashboard);
		}
	}, [selectPage]);
	
	return (
		<Fragment>
			<Suspense fallback={<Fragment> Loading </Fragment>}>
				<StatisticsArea CardChart={CardChart} data={statistics} />
			</Suspense>
			<Box mt={4}>
				<Typography variant="subtitle1" gutterBottom>
					Your Account
				</Typography>
			</Box>
			<AccountInformationArea
				isAccountActivated={isAccountActivated}
				toggleAccountActivation={toggleAccountActivation}
			/>
			<Box mt={4}>
				<Typography variant="subtitle1" gutterBottom>
					Settings
				</Typography>
			</Box>
			<SettingsArea pushMessageToSnackbar={pushMessageToSnackbar} />
			<UserDataArea
				pushMessageToSnackbar={pushMessageToSnackbar}
				targets={targets}
				setTargets={setTargets}
			/>
		</Fragment>
	);
}

Dashboard.propTypes = {
	CardChart: PropTypes.elementType,
	statistics: PropTypes.object.isRequired,
	toggleAccountActivation: PropTypes.func,
	pushMessageToSnackbar: PropTypes.func,
	targets: PropTypes.arrayOf(PropTypes.object).isRequired,
	setTargets: PropTypes.func.isRequired,
	isAccountActivated: PropTypes.bool.isRequired,
	selectPage: PropTypes.func.isRequired,
};

export default Dashboard;
