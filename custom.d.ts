declare module '*.svg' {
	const content: any;
	export default content;
}

// This is here to allow the importing of SVGs, otherwise, TypeScript with throw and error, like "Cannot find module './svg/trivialEndeavorLogo0.svg' or its corresponding type declarations."