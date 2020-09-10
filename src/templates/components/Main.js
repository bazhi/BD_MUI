import React, { memo } from "react";
import Routing from "./Routing";
import { withRouter } from "react-router-dom";

function Main(props) {
	return (
		<Routing />
	);
}

export default withRouter(memo(Main));
