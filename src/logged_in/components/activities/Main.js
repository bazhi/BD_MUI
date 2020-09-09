import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import PostContent from "logged_in/components/activities/Content";
import Add from "logged_in/components/activities/Add";
import { Activity as Page } from "logged_in/constants/TabPage";

function Main(props) {
	const {
		selectPage,
		pushMessageToSnackbar,
	} = props;
	const [isAddPostPaperOpen, setIsAddPostPaperOpen] = useState(false);
	
	const openAddPostModal = useCallback(() => {
		setIsAddPostPaperOpen(true);
	}, [setIsAddPostPaperOpen]);
	
	const closeAddPostModal = useCallback(() => {
		setIsAddPostPaperOpen(false);
	}, [setIsAddPostPaperOpen]);
	
	useEffect(()=>{
		if(selectPage){
			selectPage(Page);
		}
	}, [selectPage]);
	
	if (isAddPostPaperOpen) {
		return <Add
			onClose={closeAddPostModal}
			pushMessageToSnackbar={pushMessageToSnackbar}
		/>
	}else{
		return <PostContent
			openAddPostModal={openAddPostModal}
			pushMessageToSnackbar={pushMessageToSnackbar}
		/>
	}
}

Main.propTypes = {
	pushMessageToSnackbar: PropTypes.func,
	selectPage: PropTypes.func.isRequired,
};

export default Main;
