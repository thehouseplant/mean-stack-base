"use strict";

import * as mongoose from "mongoose" ;
import {logger} from './logger'   ;

const mongoUri     = require( '../resources/mongo.json' ).connection[ process.env.NODE_ENV ];
const mongoOptions = require( '../resources/mongo.json' ).options[ process.env.NODE_ENV ];


let database;

mongoose.connect( mongoUri, mongoOptions );


database = mongoose.connection;

database.on( "error", function ( error ) {
	logger.error( error );
} );
