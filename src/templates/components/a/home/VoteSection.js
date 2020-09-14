import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Grid, Typography, withWidth } from "@material-ui/core";
import CalculateSpacing from "./CalculateSpacing"
import { CSSTransition } from "react-transition-group";
import LazyLoad from "react-lazyload";
import AxiosCache from "shared/components/AxiosCache";
import VoteItem from "./VoteItem";

function FeatureSection(props) {
	const {width} = props;
	
	const [voteList, setVoteList] = useState([]);
	
	const LoadVoteList = useCallback(()=>{
		AxiosCache({
			url: `/data/VoteList.json`,
			method: 'get'
		}).then(function (res) {
			setVoteList(res.data);
		}).catch(function (error) {
			console.log(error);
		});
	}, [setVoteList]);
	
	useEffect(()=>{
		setTimeout(LoadVoteList, 500);
	}, [LoadVoteList]);
	
	return (
		<div style={{backgroundColor: "#FFFFFF"}}>
			<div className="container-fluid lg-p-top">
				<Typography variant="h3" align="center" className="lg-mg-bottom">
					Vote Center
				</Typography>
				<div className="container-fluid">
					<Grid container spacing={CalculateSpacing(width)}>
						{voteList.map(element => (
							<Grid item xs={6} md={6} key={element.id}>
								<LazyLoad once={false} key={element.id} debounce={200} height={100} overflow>
									<CSSTransition in={true} appear={true} classNames="bz-fade" timeout={Math.random()*150+350} unmountOnExit={true} overflow={"true"}>
										<div>
											<VoteItem
												id = {element.id}
												image={element.image}
												color={element.color}
												name={element.name}
												description={element.description}
												brief = {element.brief}
											/>
										</div>
									</CSSTransition>
								</LazyLoad>
							</Grid>
						))}
					</Grid>
				</div>
			</div>
		</div>
	);
}

FeatureSection.propTypes = {
	width: PropTypes.string.isRequired
};

export default withWidth()(FeatureSection);
