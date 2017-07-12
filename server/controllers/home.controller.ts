"use strict";

import * as lodash from "lodash";
import { Router, Request, Response } from 'express';


const router: Router = Router();


/* Configure subroutes */
router.get( "/", index );
router.get( "/Greetings",  greeting );



function index ( req, res, next ) {

	//Remove if you will be using server side rendering for the index page
	next();


	// Uncomment if you want to put your index.html in the views folder and do some server side processing with lodash

	// fs.readFile( path.join( __dirname, "..", "views", "index.html" ), "utf-8", function ( error, data ) {
	//
	// 	var template;
	//
	// 	template = _.template( data );
	//
	// 	res.end( template( {} ) );
	//
	// } );

}



function greeting ( req, res, next ) {
		res.json( "Hello from servers! pm2s" );
}



export const Home: Router = router;
