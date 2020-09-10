import React, { memo } from "react";
import { Switch } from "react-router-dom";
import PropsRoute from "shared/components/PropsRoute";

import HomeA from "./a";
import HomeB from "./b";

function Routing(props) {
	return (
		<Switch>
			<PropsRoute path={"/t"} component={HomeA} />
			<PropsRoute path={"/t/b"} component={HomeB} />
		</Switch>
	);
}

Routing.propTypes = {};

export default memo(Routing);

