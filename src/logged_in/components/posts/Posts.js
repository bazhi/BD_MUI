import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import PostContent from "./PostContent";
import AddPost from "./AddPost";
import { Posts as TabPosts } from "logged_in/constants/TabPage";

function Posts(props) {
	const {
		selectPage,
		pushMessageToSnackbar,
		posts,
		setPosts,
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
			selectPage(TabPosts);
		}
	}, [selectPage]);
	
	if (isAddPostPaperOpen) {
		return <AddPost
			onClose={closeAddPostModal}
			pushMessageToSnackbar={pushMessageToSnackbar}
		/>
	}
	return <PostContent
		openAddPostModal={openAddPostModal}
		posts={posts}
		setPosts={setPosts}
		pushMessageToSnackbar={pushMessageToSnackbar}
	/>
}

Posts.propTypes = {
	posts: PropTypes.arrayOf(PropTypes.object).isRequired,
	setPosts: PropTypes.func.isRequired,
	pushMessageToSnackbar: PropTypes.func,
	selectPage: PropTypes.func.isRequired,
};

export default Posts;
