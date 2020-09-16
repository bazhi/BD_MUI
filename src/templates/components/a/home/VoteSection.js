import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Grid, withWidth } from "@material-ui/core";
import CalculateSpacing from "./CalculateSpacing"
import { CSSTransition } from "react-transition-group";
import AxiosCache from "shared/components/AxiosCache";
import VoteItem from "./VoteItem";

function FeatureSection(props) {
	const {width} = props;
	
	const [voteList, setVoteList] = useState([]);
	
	const LoadVoteList = useCallback(() => {
		AxiosCache({
			url: `/data/VoteList.json`,
			method: 'get'
		}).then(function (res) {
			setVoteList(res.data);
		}).catch(function (error) {
			console.log(error);
		});
	}, [setVoteList]);
	
	useEffect(() => {
		setTimeout(LoadVoteList, 500);
	}, [LoadVoteList]);
	
	return (
		<div style={{backgroundColor: "#FFFFFF"}}>
			<div className="container-fluid container-gap">
				{/*<Typography variant="h3" align="center" className="lg-mg-bottom">*/}
				{/*	Vote Center*/}
				{/*</Typography>*/}
				<div className="container-fluid">
					<Grid container spacing={CalculateSpacing(width)} alignItems={"center"}>
						{voteList.map(element => (
							<Grid item xs={6} sm={6} md={4} key={element.id}>
								<CSSTransition in={true} appear={true} classNames="bz-fade" timeout={100} unmountOnExit={true} overflow={"true"}>
									<div>
										<VoteItem
											id={element.id}
											image={element.image}
											color={element.color}
											name={element.name}
											description={element.description}
											brief={element.brief}
											border={false}
										/>
									</div>
								</CSSTransition>
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
