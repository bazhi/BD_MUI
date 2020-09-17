import React, { memo } from "react";
import { Switch } from "react-router-dom";
import PropsRoute from "shared/components/PropsRoute";

import A from "./a";
import B from "./b";

function Routing(props) {
	return (
		<Switch>
			<PropsRoute path={"/t"} component={A} />
			<PropsRoute path={"/t/b"} component={B} />
		</Switch>
	);
}

Routing.propTypes = {};

export default memo(Routing);

