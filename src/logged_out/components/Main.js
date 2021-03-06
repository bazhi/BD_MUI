import React, { memo, useCallback, useEffect, useState } from "react";
import intl from 'react-intl-universal';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import NavBar from "./navigation/NavBar";
import Footer from "./footer/Footer";
import CookieRulesDialog from "./cookies/CookieRulesDialog";
import CookieConsent from "./cookies/CookieConsent";
import dummyBlogPosts from "../dummy_data/blogPosts";
import DialogSelector from "./register_login/DialogSelector";
import Routing from "./Routing";
import smoothScrollTop from "shared/functions/smoothScrollTop";
import * as URL from "shared/constants/Url";
import * as Key from "shared/constants/Keyword"
import storage from "shared/storage/local";
import { withRouter } from "react-router-dom";

const styles = (theme) => ({
	wrapper: {
		backgroundColor: theme.palette.common.white,
		overflowX: "hidden",
	},
});

function Main(props) {
	const {classes, history} = props;
	const [selectedTab, setSelectedTab] = useState(null);
	const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
	const [blogPosts, setBlogPosts] = useState([]);
	const [dialogOpen, setDialogOpen] = useState(null);
	const [isCookieRulesDialogOpen, setIsCookieRulesDialogOpen] = useState(false);
	
	const selectHome = useCallback(() => {
		smoothScrollTop();
		document.title = intl.get("HomeTitle");
		setSelectedTab("Home");
	}, [setSelectedTab]);
	
	const selectBlog = useCallback(() => {
		smoothScrollTop();
		document.title = "WaVer - Blog";
		setSelectedTab("Blog");
	}, [setSelectedTab]);
	
	const openLoginDialog = useCallback(() => {
		var rememberMe = storage.get(Key.RememberMe);
		if (rememberMe) {
			setTimeout(() => {
				history.push(URL.Dashboard);
			}, 150);
		} else {
			setDialogOpen("login");
			setIsMobileDrawerOpen(false);
		}
	}, [setDialogOpen, setIsMobileDrawerOpen, history]);
	
	const closeDialog = useCallback(() => {
		setDialogOpen(null);
	}, [setDialogOpen]);
	
	const openRegisterDialog = useCallback(() => {
		setDialogOpen("register");
		setIsMobileDrawerOpen(false);
	}, [setDialogOpen, setIsMobileDrawerOpen]);
	
	const openTermsDialog = useCallback(() => {
		setDialogOpen("termsOfService");
	}, [setDialogOpen]);
	
	const handleMobileDrawerOpen = useCallback(() => {
		setIsMobileDrawerOpen(true);
	}, [setIsMobileDrawerOpen]);
	
	const handleMobileDrawerClose = useCallback(() => {
		setIsMobileDrawerOpen(false);
	}, [setIsMobileDrawerOpen]);
	
	const openChangePasswordDialog = useCallback(() => {
		setDialogOpen("changePassword");
	}, [setDialogOpen]);
	
	const fetchBlogPosts = useCallback(() => {
		const blogPosts = dummyBlogPosts.map((blogPost) => {
			let title = blogPost.title;
			title = title.toLowerCase();
			/* Remove unwanted characters, only accept alphanumeric and space */
			title = title.replace(/[^A-Za-z0-9 ]/g, "");
			/* Replace multi spaces with a single space */
			title = title.replace(/\s{2,}/g, " ");
			/* Replace space with a '-' symbol */
			title = title.replace(/\s/g, "-");
			blogPost.url = `/blog/post/${title}`;
			blogPost.params = `?id=${blogPost.id}`;
			return blogPost;
		});
		setBlogPosts(blogPosts);
	}, [setBlogPosts]);
	
	const handleCookieRulesDialogOpen = useCallback(() => {
		setIsCookieRulesDialogOpen(true);
	}, [setIsCookieRulesDialogOpen]);
	
	const handleCookieRulesDialogClose = useCallback(() => {
		setIsCookieRulesDialogOpen(false);
	}, [setIsCookieRulesDialogOpen]);
	
	useEffect(fetchBlogPosts, []);
	
	return (
		<div className={classes.wrapper}>
			{!isCookieRulesDialogOpen && (
				<CookieConsent
					handleCookieRulesDialogOpen={handleCookieRulesDialogOpen}
				/>
			)}
			<DialogSelector
				openLoginDialog={openLoginDialog}
				dialogOpen={dialogOpen}
				onClose={closeDialog}
				openTermsDialog={openTermsDialog}
				openRegisterDialog={openRegisterDialog}
				openChangePasswordDialog={openChangePasswordDialog}
			/>
			<CookieRulesDialog
				open={isCookieRulesDialogOpen}
				onClose={handleCookieRulesDialogClose}
			/>
			<NavBar
				selectedTab={selectedTab}
				selectTab={setSelectedTab}
				openLoginDialog={openLoginDialog}
				openRegisterDialog={openRegisterDialog}
				mobileDrawerOpen={isMobileDrawerOpen}
				handleMobileDrawerOpen={handleMobileDrawerOpen}
				handleMobileDrawerClose={handleMobileDrawerClose}
			/>
			<Routing
				blogPosts={blogPosts}
				selectHome={selectHome}
				selectBlog={selectBlog}
			/>
			<Footer />
		</div>
	);
}

Main.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles, {withTheme: true})(memo(Main)));


