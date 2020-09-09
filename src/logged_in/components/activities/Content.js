import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, Divider, Grid, Paper, TablePagination, Toolbar, Typography, withStyles, } from "@material-ui/core";
import HighlightedInformation from "shared/components/HighlightedInformation";
import ConfirmationDialog from "shared/components/ConfirmationDialog";
import LoadImage from "logged_in/components/activities/LoadImage";
import persons from "../../dummy_data/persons";
import GridList from "@material-ui/core/GridList";

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
	const [rowsPerPage, setRowsPerPage] = React.useState(12);
	const [deleteId, setDeleteId] = useState(-1);
	const [isDeleteDialogLoading, setIsDeleteDialogLoading] = useState(
		false
	);
	const [posts, setPosts] = useState([]);
	
	const fetchRandomPosts = useCallback(() => {
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
		setPosts(posts);
	}, [setPosts]);
	
	useEffect(() => {
		fetchRandomPosts();
	}, [fetchRandomPosts]);
	
	const closeDeletePostDialog = useCallback(() => {
		setDeleteId(-1);
		setIsDeleteDialogLoading(false);
	}, [setDeleteId, setIsDeleteDialogLoading]);
	
	const deletePost = useCallback(() => {
		setIsDeleteDialogLoading(true);
		setTimeout(() => {
			const NewItems = [...posts];
			const index = NewItems.findIndex((element) => element.id === deleteId);
			NewItems.splice(index, 1);
			setPosts(NewItems);
			pushMessageToSnackbar({
				text: "Your post has been deleted:" + deleteId,
			});
			closeDeletePostDialog();
		}, 1500);
	}, [
		posts,
		setPosts,
		setIsDeleteDialogLoading,
		pushMessageToSnackbar,
		closeDeletePostDialog,
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
		setRowsPerPage(+event.target.value);
		setPage(0);
	}
	
	const printImageGrid = useCallback(() => {
		if (posts.length > 0) {
			return (
				<Box p={1}>
					<GridList cellHeight={'auto'} spacing={4}>
						{posts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((post) => (
								<Grid item xs={6} sm={4} md={3} key={post.id}>
									<LoadImage
										post={post}
										onDelete={() => {
											onDelete(post);
										}}
										onEdit={()=>{
											onEdit(post);
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
	}, [posts, onDelete, page, rowsPerPage, onEdit]);
	
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
				count={posts.length}
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
					actions: posts.length > 0 ? classes.dBlock : classes.dNone,
					caption: posts.length > 0 ? classes.dBlock : classes.dNone,
				}}
				labelRowsPerPage=""
				rowsPerPageOptions = {[4, 8, 12, 24, 48]}
				onChangeRowsPerPage={handleChangePerPage}
			/>
			<ConfirmationDialog
				open={deleteId>=0}
				title="Confirmation"
				content="Do you really want to delete the post?"
				onClose={closeDeletePostDialog}
				loading={isDeleteDialogLoading}
				onConfirm={deletePost}
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
