import React, { Fragment, lazy, Suspense } from "react";

const Main = lazy(() => import("./Main"));

function Index(props) {
	return (
		<Suspense fallback={<Fragment />}>
			<Main></Main>
		</Suspense>
	);
}

export default Index;
