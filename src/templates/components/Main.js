import React, { memo } from "react";
import Routing from "./Routing";
import { withRouter } from "react-router-dom";

function Main(props) {
	const searchData = 	new URLSearchParams(props.location.search);
	return (
		<Routing search={searchData} />
	);
}

export default withRouter(memo(Main));
