import React, {useCallback, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Box, Button, Divider, Grid, Paper, TablePagination, Toolbar, Typography, withStyles,} from "@material-ui/core";
import ConfirmationDialog from "shared/components/ConfirmationDialog";
import LoadImage from "logged_in/components/activities/LoadImage";
import GridList from "@material-ui/core/GridList";
import Storage from "shared/storage/local"
import * as Key from "shared/constants/Keyword"
import {AxiosCache} from "shared/components/AxiosCache";
import * as ModalState from "./ModalState"

const styles = {
	dBlock: {display: "block"},
	dNone: {display: "none"},
	toolbar: {
		justifyContent: "space-between",
	},
};

function Content(props) {
	const {
		pushMessageToSnackbar,
		openModal,
		classes,
	} = props;
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(Storage.get(Key.RowsPerPage, 12));
	const [deleteId, setDeleteId] = useState(-1);
	const [deleteDialogLoading, setDeleteDialogLoading] = useState(false);
	const [activities, setActivities] = useState(null);


	const LoadActivities = useCallback(() => {
		AxiosCache({
			url: `/data/user/activity.json`,
			method: 'get'
		}).then(function (res) {
			setActivities(res.data);
		}).catch(function (error) {
			console.log(error);
		});
	}, [setActivities]);

	useEffect(() => {
		setTimeout(() => {
			LoadActivities();
		}, 0)
	}, [LoadActivities]);

	const OnCloseDeleteDialog = useCallback(() => {
		setDeleteId(-1);
		setDeleteDialogLoading(false);
	}, [setDeleteId, setDeleteDialogLoading]);

	const deleteItem = useCallback((ID) => {
		setDeleteDialogLoading(true);
		setTimeout(() => {
			const NewItems = [...activities];
			const index = NewItems.findIndex((element) => element.id === ID);
			NewItems.splice(index, 1);
			setActivities(NewItems);
			pushMessageToSnackbar({text: "Your post has been deleted:" + ID,});
			OnCloseDeleteDialog();
		}, 1500);
	}, [activities, pushMessageToSnackbar, OnCloseDeleteDialog, setDeleteDialogLoading]);

	const onDeleteClick = useCallback((post) => {
		setDeleteId(post.id);
	}, [setDeleteId]);

	const onEditClick = useCallback((post) => {
		openModal(ModalState.Edit, post);
	}, [openModal]);

	const handleChangePage = useCallback((event, page) => {
		setPage(page);
	}, [setPage]);

	const handleChangePerPage = (event) => {
		setRowsPerPage(event.target.value);
		Storage.set(Key.RowsPerPage, event.target.value);
		setPage(0);
	}

	const ImageGrid = useCallback(() => {
		return (
			<Box p={1}>
				<GridList cellHeight={'auto'} spacing={4}>
					{activities.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
						.map((item) => (
							<Grid item xs={6} sm={4} md={3} key={item.id}>
								<LoadImage item={item}
										   onDelete={() => {
											   onDeleteClick(item);
										   }}
										   onEdit={() => {
											   onEditClick(item);
										   }}
								/>
							</Grid>
						))}
				</GridList>
			</Box>
		);
	}, [activities, page, rowsPerPage, onDeleteClick, onEditClick]);

	return (
		<div>
			{activities && (
				<Paper>
					<Toolbar className={classes.toolbar}>
						<Typography variant="h6">Your Posts</Typography>
						<Button variant="contained" color="secondary" onClick={()=>{
							openModal(ModalState.Add);
						}} disableElevation>
							Add
						</Button>
					</Toolbar>
					<Divider/>
					{ImageGrid()}
					<TablePagination
						component="div" count={activities.length} rowsPerPage={rowsPerPage} page={page}
						backIconButtonProps={{
							"aria-label": "Previous Page",
						}}
						nextIconButtonProps={{
							"aria-label": "Next Page",
						}}
						onChangePage={handleChangePage} labelRowsPerPage=""
						rowsPerPageOptions={[4, 8, 12, 24, 48]}
						onChangeRowsPerPage={handleChangePerPage}
						classes={{
							select: classes.dBlock,
							selectIcon: classes.dBlock,
							actions: activities.length > 0 ? classes.dBlock : classes.dNone,
							caption: activities.length > 0 ? classes.dBlock : classes.dNone,
						}}

					/>
					<ConfirmationDialog
						open={deleteId >= 0}
						title="Confirmation"
						content="Do you really want to delete the post?"
						onClose={OnCloseDeleteDialog}
						loading={deleteDialogLoading}
						onConfirm={deleteItem}
						data={deleteId}
					/>
				</Paper>
			)
			}
		</div>
	);
}

Content.propTypes = {
	openModal: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
	pushMessageToSnackbar: PropTypes.func,
};

export default withStyles(styles)(Content);
