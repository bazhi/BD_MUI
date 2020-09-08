import React, { Fragment, lazy, memo, Suspense, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core";
import Routing from "./Routing";
import NavBar from "./navigation/NavBar";
import ConsecutiveSnackbarMessages from "shared/components/ConsecutiveSnackbarMessages";
import smoothScrollTop from "shared/functions/smoothScrollTop";
import persons from "../dummy_data/persons";
import intl from 'react-intl-universal';

const AddBalanceDialog = lazy(() => import("./subscription/AddBalanceDialog"));

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

function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

function Main(props) {
	const {classes} = props;
	const [selectedTab, setSelectedTab] = useState(null);
	const [transactions, setTransactions] = useState([]);
	const [statistics, setStatistics] = useState({views: [], profit: []});
	const [posts, setPosts] = useState([]);
	const [targets, setTargets] = useState([]);
	const [messages, setMessages] = useState([]);
	const [isAccountActivated, setIsAccountActivated] = useState(false);
	const [isAddBalanceDialogOpen, setIsAddBalanceDialogOpen] = useState(false);
	const [pushMessageToSnackbar, setPushMessageToSnackbar] = useState(null);
	
	const fetchRandomTargets = useCallback(() => {
		const targets = [];
		for (let i = 0; i < 35; i += 1) {
			const randomPerson = persons[Math.floor(Math.random() * persons.length)];
			const target = {
				id: i,
				number1: Math.floor(Math.random() * 251),
				number2: Math.floor(Math.random() * 251),
				number3: Math.floor(Math.random() * 251),
				number4: Math.floor(Math.random() * 251),
				name: randomPerson.name,
				profilePicUrl: randomPerson.profilePicUrl,
				isActivated: Math.round(Math.random()) ? true : false,
			};
			targets.push(target);
		}
		setTargets(targets);
	}, [setTargets]);
	
	const openAddBalanceDialog = useCallback(() => {
		setIsAddBalanceDialogOpen(true);
	}, [setIsAddBalanceDialogOpen]);
	
	const closeAddBalanceDialog = useCallback(() => {
		setIsAddBalanceDialogOpen(false);
	}, [setIsAddBalanceDialogOpen]);
	
	const onPaymentSuccess = useCallback(() => {
		pushMessageToSnackbar({
			text: "Your balance has been updated.",
		});
		setIsAddBalanceDialogOpen(false);
	}, [pushMessageToSnackbar, setIsAddBalanceDialogOpen]);
	
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
	
	const fetchRandomMessages = useCallback(() => {
		shuffle(persons);
		const messages = [];
		const iterations = persons.length;
		const oneDaySeconds = 60 * 60 * 24;
		let curUnix = Math.round(
			new Date().getTime() / 1000 - iterations * oneDaySeconds
		);
		for (let i = 0; i < iterations; i += 1) {
			const person = persons[i];
			const message = {
				id: i,
				profilePicUrl: person.profilePicUrl,
				date: curUnix,
				text: "fetch random messages.",
			};
			curUnix += oneDaySeconds;
			messages.push(message);
		}
		messages.reverse();
		setMessages(messages);
	}, [setMessages]);
	
	const fetchRandomPosts = useCallback(() => {
		shuffle(persons);
		const posts = [];
		const iterations = persons.length;
		const oneDaySeconds = 60 * 60 * 24;
		let curUnix = Math.round(
			new Date().getTime() / 1000 - iterations * oneDaySeconds
		);
		for (let i = 0; i < iterations; i += 1) {
			const person = persons[i];
			const post = {
				id: i,
				importImage: person.importImage,
				timestamp: curUnix,
				name: person.name,
			};
			curUnix += oneDaySeconds;
			posts.push(post);
		}
		posts.reverse();
		setPosts(posts);
	}, [setPosts]);
	
	const toggleAccountActivation = useCallback(() => {
		if (pushMessageToSnackbar) {
			if (isAccountActivated) {
				pushMessageToSnackbar({
					text: "Your account is now deactivated.",
				});
			} else {
				pushMessageToSnackbar({
					text: "Your account is now activated.",
				});
			}
		}
		setIsAccountActivated(!isAccountActivated);
	}, [pushMessageToSnackbar, isAccountActivated, setIsAccountActivated]);
	
	const selectPage = useCallback((PageInfo)=>{
		smoothScrollTop();
		document.title = intl.get("WebName") + " " + intl.get(PageInfo.Name);
		setSelectedTab(PageInfo.Name);
	}, [setSelectedTab]);
	
	const getPushMessageFromChild = useCallback(
		(pushMessage) => {
			setPushMessageToSnackbar(() => pushMessage);
		},
		[setPushMessageToSnackbar]
	);
	
	useEffect(() => {
		fetchRandomTargets();
		fetchRandomStatistics();
		fetchRandomTransactions();
		fetchRandomMessages();
		fetchRandomPosts();
	}, [
		fetchRandomTargets,
		fetchRandomStatistics,
		fetchRandomTransactions,
		fetchRandomMessages,
		fetchRandomPosts,
	]);
	
	return (
		<Fragment>
			<Suspense fallback={<Fragment></Fragment>}>
				{
					isAddBalanceDialogOpen && (
						<AddBalanceDialog
							open={isAddBalanceDialogOpen}
							onClose={closeAddBalanceDialog}
							onSuccess={onPaymentSuccess}
						/>
					)
				}
			</Suspense>
			<NavBar
				selectedTab={selectedTab}
				messages={messages}
				openAddBalanceDialog={openAddBalanceDialog}
			/>
			<ConsecutiveSnackbarMessages
				getPushMessageFromChild={getPushMessageFromChild}
			/>
			<main className={classNames(classes.main)}>
				<Routing
					isAccountActivated={isAccountActivated}
					toggleAccountActivation={toggleAccountActivation}
					pushMessageToSnackbar={pushMessageToSnackbar}
					transactions={transactions}
					statistics={statistics}
					posts={posts}
					targets={targets}
					selectPage={selectPage}
					openAddBalanceDialog={openAddBalanceDialog}
					setTargets={setTargets}
					setPosts={setPosts}
				/>
			</main>
		</Fragment>
	);
}

Main.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(memo(Main));
