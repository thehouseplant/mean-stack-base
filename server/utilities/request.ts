"use strict";

 
import * as	url 	from 'url';
import * as	request from 'request' ;
import { checkJSON } 	from '../utilities/checkJSON' ;
import * as	_		from 'lodash' ;
import * as	util 	from 'util' ;


export function getJSON ( urlObject, callback ) {

	var endpoint,
		config,
		jar,
		cookie;


	endpoint = url.parse( urlObject.url, true );

	endpoint.query = urlObject.query;


	delete endpoint.search;
	delete endpoint.host;

	if ( urlObject.cookie ) {
		jar = request.jar();
		cookie = request.cookie( urlObject.cookie );
		jar.setCookie( cookie, urlObject.url );
	}


	config = {
		"method": "GET",
		"uri"	: url.format( endpoint ),
		"json"	: true
	};

	if ( jar ) {
		config.jar = jar;
	}


	if ( urlObject.headers ) {

		config.headers = urlObject.headers;

	}


	request.get(

		config,

		function ( error, data ) {

			console.log( config.uri );

			if ( data ) {

			//	console.log( "Status:", data.statusCode );

			}

		//	console.log( "Error: ", util.inspect( error, { "depth": null } ) );

			if ( data ) {

				//console.log( "Data: ", util.inspect( data.body, { "depth": null } ) );

			}

			//console.log( "\n\n" );


			if ( error ) {

				error.connection = {
					"URI": config.uri
				};
				callback( error, null );

			} else if ( data && data.statusCode && data.statusCode !== 200 ) {

				error = new Error( "Server returned non 200 status" );
				error.statusCode = data.statusCode;
				error.connection = {
					"URI": config.uri
				};
				error.body = data.body;

				callback( error, data.body );

			} else {

				callback( null, data.body );

			}

		}

	);

};



export function postJSON ( urlObject, callback ) {

	var endpoint,
		config;


	endpoint = url.parse( urlObject.url, true );

	endpoint.query = urlObject.query;


	delete endpoint.search;
	delete endpoint.host;


	config = {
		"method": "POST",
		"uri"	: url.format( endpoint ),
		"body"	: urlObject.data,
		"json"	: true
	};


	if ( urlObject.xml ) {

		config.json = false;

	}


	if ( urlObject.headers ) {

		config.headers = urlObject.headers;

	}


	request(

		config,

		function ( error, data ) {

			console.log( config.uri );
			console.log( "Post:", urlObject.data );

			if ( data ) {

				console.log( "Status:", data.statusCode );

			} else {

				console.log( "Status:", "none returned" );

			}

			console.log( "Error: ", util.inspect( error, { "depth": null } ) );

			if ( data ) {

				console.log( "Data: ", util.inspect( data.body, { "depth": null } ) );

			} else {

				console.log( "Data: ", "none returned" );

			}

			console.log( "\n\n" );


			if ( error ) {

				error.connection = {
					"URI": config.uri,
					"PostData": urlObject.data
				};

				callback( error, null );

			} else if ( data && data.statusCode && data.statusCode !== 200 ) {

				error = new Error( "Server returned non 200 status" );

				error.body = data.body;

				error.connection = {
					"URI": config.uri,
					"PostData": urlObject.data
				};

				error.statusCode = data.statusCode;

				callback( error, data.body );

			} else {

				callback( error, data.body );

			}

		}

	);

};



export function postForm ( urlObject, callback ) {

	var endpoint,
		config;


	endpoint = url.parse( urlObject.url, true );

	endpoint.query = urlObject.query;


	delete endpoint.search;
	delete endpoint.host;




	config = {
		"url"	: url.format( endpoint ),
		"form"	: urlObject.data
	};


	if ( urlObject.headers ) {

		config.headers = urlObject.headers;

	}

	request.post( config, function ( error, httpResponse, body ) {

		parseJSON( body, function ( error, data ) {

			if ( error ) {

				callback( error, null );
				return;

			}

			callback( error, data );

		} );

	} );


};



export function parseJSON ( json, callback ) {

	var jsonData,
		jsonError;


	if ( json && checkJSON( json ) ) {

		try {

			jsonData = JSON.parse( json );

		} catch ( error ) {

			callback( error, null );
			return;

		}

		callback( null, jsonData );

	} else {

		jsonError = new Error( "Expected JSON data" );

		callback( jsonError, null );

	}

};
