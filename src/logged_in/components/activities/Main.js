import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Content from "logged_in/components/activities/Content";
import Edit from "logged_in/components/activities/Edit";
import { Activity as Page } from "logged_in/constants/TabPage";
import * as ModalState from "./ModalState"

function Main(props) {
	const {selectPage, pushMessageToSnackbar} = props;
	const [modalState, setModalState] = useState(ModalState.Content);
	const [editData, setEditData] = useState(null);
	
	const OpenModal = useCallback((state, data) => {
		setEditData(data);
		setModalState(state);
	}, [setModalState]);
	
	const CloseModal = useCallback(() => {
		setModalState(ModalState.Content);
	}, [setModalState]);
	
	useEffect(()=>{
		if(selectPage){
			selectPage(Page);
		}
	}, [selectPage]);

	switch (modalState){
		case ModalState.Content:
			return <Content
				openModal={OpenModal}
				pushMessageToSnackbar={pushMessageToSnackbar}
			/>
			break;
		case ModalState.Add:
			return <Edit
				onClose={CloseModal}
				showMessage={pushMessageToSnackbar}
			/>
			break;
		case ModalState.Edit:
			return <Edit
				data={editData}
				onClose={CloseModal}
				showMessage={pushMessageToSnackbar}
			/>
			break;
		default:
			break;
	}
	return <div></div>
}

Main.propTypes = {
	pushMessageToSnackbar: PropTypes.func,
	selectPage: PropTypes.func.isRequired,
};

export default Main;
