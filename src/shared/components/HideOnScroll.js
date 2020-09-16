import { useScrollTrigger } from "@material-ui/core";
import React from "react";
import PropTypes from 'prop-types';
import Slide from "@material-ui/core/Slide";

function HideOnScroll(props) {
	const { children, target } = props;
	const trigger = useScrollTrigger({ target: target ? target() : undefined });
	
	return (
		<Slide appear={false} direction="down" in={!trigger}>
			{children}
		</Slide>
	);
}

HideOnScroll.propTypes = {
	children: PropTypes.element.isRequired,
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	target: PropTypes.func,
};

export default HideOnScroll;
