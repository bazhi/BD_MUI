import React, {Fragment, lazy, memo, Suspense, useCallback, useEffect, useState} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {withStyles} from "@material-ui/core";
import Routing from "./Routing";
import NavBar from "./navigation/NavBar";
import ConsecutiveSnackbarMessages from "shared/components/ConsecutiveSnackbarMessages";
import smoothScrollTop from "shared/functions/smoothScrollTop";
import intl from 'shared/components/IntlHelper';
import * as Pages from "../constants/TabPage"

const styles = (theme) => ({
	main: {
		marginLeft: theme.spacing(9),
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		[theme.breakpoints.down("xs")]: {
			marginLeft: 0,
		},
	},
});

function Main(props) {
	const {classes} = props;
	const [selectedTab, setSelectedTab] = useState(Pages.Dashboard.Name);
	const [transactions, setTransactions] = useState([]);
	const [statistics, setStatistics] = useState({views: [], profit: []});
	const [targets, setTargets] = useState([]);
	const [messages, setMessages] = useState([]);
	const [isAccountActivated, setIsAccountActivated] = useState(false);
	const [showMessage, setShowMessage] = useState(null);
	
	const onPaymentSuccess = useCallback(() => {
		showMessage({
			text: "Your balance has been updated.",
		});
	}, [showMessage]);

	const fetchRandomStatistics = useCallback(() => {
		const statistics = {profit: [], views: []};
		const iterations = 300;
		const oneYearSeconds = 60 * 60 * 24 * 365;
		let curProfit = Math.round(3000 + Math.random() * 1000);
		let curViews = Math.round(3000 + Math.random() * 1000);
		let curUnix = Math.round(new Date().getTime() / 1000) - oneYearSeconds;
		for (let i = 0; i < iterations; i += 1) {
			curUnix += Math.round(oneYearSeconds / iterations);
			curProfit += Math.round((Math.random() * 2 - 1) * 10);
			curViews += Math.round((Math.random() * 2 - 1) * 10);
			statistics.profit.push({
				value: curProfit,
				timestamp: curUnix,
			});
			statistics.views.push({
				value: curViews,
				timestamp: curUnix,
			});
		}
		setStatistics(statistics);
	}, [setStatistics]);
	
	const fetchRandomTransactions = useCallback(() => {
		const transactions = [];
		const iterations = 32;
		const oneMonthSeconds = Math.round(60 * 60 * 24 * 30.5);
		const transactionTemplates = [
			{
				description: "Starter subscription",
				isSubscription: true,
				balanceChange: -1499,
			},
			{
				description: "Premium subscription",
				isSubscription: true,
				balanceChange: -2999,
			},
			{
				description: "Business subscription",
				isSubscription: true,
				balanceChange: -4999,
			},
			{
				description: "Tycoon subscription",
				isSubscription: true,
				balanceChange: -9999,
			},
			{
				description: "Added funds",
				isSubscription: false,
				balanceChange: 2000,
			},
			{
				description: "Added funds",
				isSubscription: false,
				balanceChange: 5000,
			},
		];
		let curUnix = Math.round(
			new Date().getTime() / 1000 - iterations * oneMonthSeconds
		);
		for (let i = 0; i < iterations; i += 1) {
			const randomTransactionTemplate =
				transactionTemplates[
					Math.floor(Math.random() * transactionTemplates.length)
					];
			const transaction = {
				id: i,
				description: randomTransactionTemplate.description,
				balanceChange: randomTransactionTemplate.balanceChange,
				paidUntil: curUnix + oneMonthSeconds,
				timestamp: curUnix,
			};
			curUnix += oneMonthSeconds;
			transactions.push(transaction);
		}
		transactions.reverse();
		setTransactions(transactions);
	}, [setTransactions]);
	
	const toggleAccountActivation = useCallback(() => {
		if (showMessage) {
			if (isAccountActivated) {
				showMessage({
					text: "Your account is now deactivated.",
				});
			} else {
				showMessage({
					text: "Your account is now activated.",
				});
			}
		}
		setIsAccountActivated(!isAccountActivated);
	}, [showMessage, isAccountActivated, setIsAccountActivated]);
	
	const selectPage = useCallback((PageInfo) => {
		smoothScrollTop();
		document.title = intl.get("WebName") + " " + intl.get(PageInfo.Name);
		setSelectedTab(PageInfo.Name);
	}, [setSelectedTab]);
	
	const getPushMessageFromChild = useCallback(
		(pushMessage) => {
			setShowMessage(() => pushMessage);
		},
		[setShowMessage]
	);
	
	useEffect(() => {
		fetchRandomStatistics();
		fetchRandomTransactions();
	}, [
		fetchRandomStatistics,
		fetchRandomTransactions,
	]);
	
	return (
		<Fragment>
			<NavBar
				selectedTab={selectedTab}
				messages={messages}
			/>
			<ConsecutiveSnackbarMessages
				getPushMessageFromChild={getPushMessageFromChild}
			/>
			<main className={classNames(classes.main)}>
				<Routing
					isAccountActivated={isAccountActivated}
					toggleAccountActivation={toggleAccountActivation}
					showMessage={showMessage}
					transactions={transactions}
					statistics={statistics}
					targets={targets}
					selectPage={selectPage}
					setTargets={setTargets}
				/>
			</main>
		</Fragment>
	);
}

Main.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(memo(Main));
