import React, { Fragment, lazy, memo, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";

const A = lazy(()=>import("./a/Main"));
const B = lazy(()=>import("./b/Main"));

function Routing(props) {
	return (
		<Switch>
			<Route path={"/t/a"}>
				<Suspense fallback={<Fragment/>}>
					<A search={props.search}/>
				</Suspense>
			</Route>
			<Route path={"/t/b"}>
				<Suspense fallback={<Fragment/>}>
					<B search={props.search}/>
				</Suspense>
			</Route>
		</Switch>
	);
}

Routing.propTypes = {
	search: PropTypes.objectOf(URLSearchParams),
};

export default memo(Routing);

