import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, Divider, Grid, Paper, TablePagination, Toolbar, Typography, withStyles, } from "@material-ui/core";
import HighlightedInformation from "shared/components/HighlightedInformation";
import ConfirmationDialog from "shared/components/ConfirmationDialog";
import LoadImage from "logged_in/components/activities/LoadImage";
import persons from "../../dummy_data/persons";
import GridList from "@material-ui/core/GridList";
import Storage from "shared/storage/local"
import * as Key from "shared/constants/Keyword"

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
		openAddPostModal,
		classes,
	} = props;
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(Storage.get(Key.RowsPerPage, 12));
	const [deleteId, setDeleteId] = useState(-1);
	const [deleteDialogLoading, setDeleteDialogLoading] = useState(
		false
	);
	const [activities, setActivities] = useState([]);
	
	const fetchRandomPosts = useCallback(() => {
		const items = [];
		const iterations = persons.length;
		const oneDaySeconds = 60 * 60 * 24;
		let curUnix = Math.round(
			new Date().getTime() / 1000 - iterations * oneDaySeconds
		);
		for (let i = 0; i < iterations; i += 1) {
			const person = persons[i];
			const item = {
				id: i,
				importImage: person.importImage,
				timestamp: curUnix,
				name: person.name,
			};
			curUnix += oneDaySeconds;
			items.push(item);
		}
		setActivities(items);
	}, [setActivities]);
	
	useEffect(() => {
		fetchRandomPosts();
	}, [fetchRandomPosts]);
	
	const closeDeleteDialog = useCallback(() => {
		setDeleteId(-1);
		setDeleteDialogLoading(false);
	}, [setDeleteId, setDeleteDialogLoading]);
	
	const deleteItem = useCallback(() => {
		setDeleteDialogLoading(true);
		setTimeout(() => {
			const NewItems = [...activities];
			const index = NewItems.findIndex((element) => element.id === deleteId);
			NewItems.splice(index, 1);
			setActivities(NewItems);
			pushMessageToSnackbar({
				text: "Your post has been deleted:" + deleteId,
			});
			closeDeleteDialog();
		}, 1500);
	}, [
		activities,
		setActivities,
		setDeleteDialogLoading,
		pushMessageToSnackbar,
		closeDeleteDialog,
		deleteId,
	]);
	
	const onDelete = useCallback((post) => {
		setDeleteId(post.id);
	}, [setDeleteId]);
	
	const onEdit = useCallback((post) => {
		console.log(post.id);
	}, []);
	
	const handleChangePage = useCallback(
		(event, page) => {
			setPage(page);
		},
		[setPage]
	);
	
	const handleChangePerPage = (event)=>{
		setRowsPerPage(event.target.value);
		Storage.set(Key.RowsPerPage, event.target.value);
		setPage(0);
	}
	
	const printImageGrid = useCallback(() => {
		if (activities.length > 0) {
			return (
				<Box p={1}>
					<GridList cellHeight={'auto'} spacing={4}>
						{activities.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((item) => (
								<Grid item xs={6} sm={4} md={3} key={item.id}>
									<LoadImage
										item={item}
										onDelete={() => {
											onDelete(item);
										}}
										onEdit={()=>{
											onEdit(item);
										}}
									/>
								</Grid>
							))}
					</GridList >
				</Box>
			);
		}
		return (
			<Box m={2}>
				<HighlightedInformation>
					No posts added yet. Click on &quot;NEW&quot; to create your first one.
				</HighlightedInformation>
			</Box>
		);
	}, [activities, onDelete, page, rowsPerPage, onEdit]);
	
	return (
		<Paper>
			<Toolbar className={classes.toolbar}>
				<Typography variant="h6">Your Posts</Typography>
				<Button
					variant="contained"
					color="secondary"
					onClick={openAddPostModal}
					disableElevation
				>
					Add Post
				</Button>
			</Toolbar>
			<Divider />
			{printImageGrid()}
			<TablePagination
				component="div"
				count={activities.length}
				rowsPerPage={rowsPerPage}
				page={page}
				backIconButtonProps={{
					"aria-label": "Previous Page",
				}}
				nextIconButtonProps={{
					"aria-label": "Next Page",
				}}
				onChangePage={handleChangePage}
				classes={{
					select: classes.dBlock,
					selectIcon: classes.dBlock,
					actions: activities.length > 0 ? classes.dBlock : classes.dNone,
					caption: activities.length > 0 ? classes.dBlock : classes.dNone,
				}}
				labelRowsPerPage=""
				rowsPerPageOptions = {[4, 8, 12, 24, 48]}
				onChangeRowsPerPage={handleChangePerPage}
			/>
			<ConfirmationDialog
				open={deleteId>=0}
				title="Confirmation"
				content="Do you really want to delete the post?"
				onClose={closeDeleteDialog}
				loading={deleteDialogLoading}
				onConfirm={deleteItem}
			/>
		</Paper>
	);
}

Content.propTypes = {
	openAddPostModal: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
	pushMessageToSnackbar: PropTypes.func,
};

export default withStyles(styles)(Content);
