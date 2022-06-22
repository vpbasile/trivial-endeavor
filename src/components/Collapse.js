import React from 'react';

export default function Collapse(props) {
	let className
	if (props.show) { className = "show" } else { className = "collapse" }
	return (
		<div className={className} id={props.id}>
			<div id="demo" className='{props.show}'>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit,
				sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
				quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
			</div>
		</div>

	);
}