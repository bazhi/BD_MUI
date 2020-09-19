import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Content from "logged_in/components/activities/Content";
import Add from "logged_in/components/activities/Add";
import { Activity as Page } from "logged_in/constants/TabPage";

function Main(props) {
	const {selectPage, pushMessageToSnackbar} = props;
	const [bAddModalOpen, setAddModalOpen] = useState(false);
	
	const OpenAddModal = useCallback(() => {
		setAddModalOpen(true);
	}, [setAddModalOpen]);
	
	const CloseAddModal = useCallback(() => {
		setAddModalOpen(false);
	}, [setAddModalOpen]);
	
	useEffect(()=>{
		if(selectPage){
			selectPage(Page);
		}
	}, [selectPage]);
	
	if (bAddModalOpen) {
		return <Add
			onClose={CloseAddModal}
			pushMessageToSnackbar={pushMessageToSnackbar}
		/>
	}else{
		return <Content
			openAddModal={OpenAddModal}
			pushMessageToSnackbar={pushMessageToSnackbar}
		/>
	}
}

Main.propTypes = {
	pushMessageToSnackbar: PropTypes.func,
	selectPage: PropTypes.func.isRequired,
};

export default Main;
