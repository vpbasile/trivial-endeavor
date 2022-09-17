import React from 'react';

export default function Hyperlink(props: {url:string, text:string}) {
	return (
		<div className='col-6'>
			<a href={props.url}>{props.text}</a>
		</div>
	);
}