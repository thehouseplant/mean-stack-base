"use strict";

/// <reference path="./definitions/promise-mongo.d.ts" />

import * as express from 'express';
import * as http from 'http';
import * as path from 'path';
import {Routes} from './controllers/index';
import * as cookieParser from 'cookie-parser';
import cookieSession = require( 'cookie-session' );
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import * as methodOverride from 'method-override';
import { logger } from "./utilities/logger";


var config = require( "../../package.json" );


class Server {

	private app: express.Application;



	public constructor () {

		this.app = express();

		this.configureServer();

		this.configureRoutes();

	}



	private configureServer () : void {

		if ( !config.hasOwnProperty( "settings" ) ) {

			config.settings = {
				"PORT"         : 3000,
				"cookieSecret" : '',
				"cookieKeys"   : [ '' ],
				"forwardHTTPS" : false
			};

		}


		this.app.set( 'port', process.env.PORT || config.settings.PORT );

		this.app.use( cookieParser( config.settings.cookieSecret ) );

		this.app.use( cookieSession( {
			"name"    : "mean-stack-base",
			"keys"    : config.settings.cookieKeys,
			"httpOnly": false,
			"maxAge"  : 6000
		} ) );

		this.app.use( compression() );

		this.app.use( bodyParser.urlencoded( {
			"extended" : true,
			"limit"    : 10
		} ) );

		this.app.use( bodyParser.json( {
			"strict": true,
			"limit" : '10mb'
		} ) );

		this.app.use( methodOverride() );


		if ( !process.env.LOCAL && config.settings.forwardHTTPS ) {

			this.app.use( function ( req: express.Request, res: express.Response, next: express.NextFunction ) {

				if ( ( !req.secure ) && ( req.get( 'X-Forwarded-Proto' ) !== 'https' ) ) {
					res.redirect( 'https://' + req.header( "host" ) + req.url );
				} else {
					next();
				}

			} );

		}

	}



	private configureRoutes () : void {

		Routes( this.app );

		//Set maintenance mode
		if ( process.env.MAINT_MODE === "true" ) {

			this.app.use( function ( req, res ) {

				res.status( 503 );

				res.json( {
					"status"  : 503,
					"message" : 'Maintenance'
				} );

			} );

		}
		

		this.app.use( express.static( path.join( __dirname, '../client/' ) ) );

		//this.app.use( express.static( 'client' ) );

		this.app.use( function ( error, req, res, next ) {

			next( error );

		} );

		this.app.use( function ( error, req, res, next ) {

			next( error );

		} );

	}



	public start () : void {

		this.app.listen( this.app.get( 'port' ), function () {
			// logger.verbose( "hello" );
			console.log( "Server started and ready" );

		} );

	}

}


const webServer = new Server();

webServer.start();
