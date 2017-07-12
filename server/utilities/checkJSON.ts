"use strict";
//Utility module to check if a string is proper json
export function checkJSON( string ) {

	return (
		/^[\],:{}\s]*$/
			.test( string
				.replace( /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@' )
				.replace( /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']' )
				.replace( /(?:^|:|,)(?:\s*\[)+/g, '' )
			)
	);

};
