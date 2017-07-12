'use strict';


const gulp    = require( "gulp" );
const zip     = require( "gulp-zip" );
const del     = require( "del" );
//const ts      = require( "gulp-typescript" );
const spawn   = require( "child_process" ).spawn;
const process = require('process');
const pm2     = require( "pm2" );
const path    = require( "path" );
const gulpDir = __dirname;

console.log( gulpDir, __filename, __dirname );

gulp.task( "default", [ "build" ], () => {

	process.chdir( path.join( gulpDir, 'client' ) );

	let ng_serve = spawn( "ng", [ "serve" ], { "shell": true } );

	ng_serve.on( "data", ( message, handle ) => {
		console.log( message );
	} );

	process.chdir( path.join( gulpDir, "server" ) );

	let tsc_watch = spawn( "tsc", [ "--watch" ], { "shell": true } );

	tsc_watch.stderr.on( "data", ( message, handle ) => {
		console.log( message );
	} );

	process.chdir( gulpDir );

	gulp.src( [
			'server/package.json',
			'server/appspec.yml',
			'server/resources/**/*',
			'server/aws/**/*'
	], { "base": "server" } )
	.pipe( gulp.dest( '../build/server' ) );

	gulp.src( [
		'client/build/index.html'
	] )
	.pipe( gulp.dest( './server/build' ) );


	process.chdir( path.join( gulpDir, 'server', 'build' ) );



	pm2.connect( true, function () {
		pm2.start(
			{
				"name": "DockerTest",
				"script": "app.js",
				"watch": true,
				"env": {
					"NODE_ENV": "development"
				}
			},
		() => {
			console.log("pm2 started");
			pm2.streamLogs( "all", 0);
		} );
	} );

} );



gulp.task( "build", [ "build:client", "build:server" ], () => { } );



gulp.task( "build:client", ( done ) => {

	process.chdir( path.join( gulpDir, 'client' ) );

	let ng_build_error = "";

	let ng_build = spawn( "ng", [ "build", "--base-href", "/" ], { "shell": true } );

	ng_build.on( "close", ( code ) => {
		if ( code !== 0 ) {
			console.log( "ng build finished with code:", code );
			console.error( ng_build_error );
			return;
		}

		console.log( "ng build completed successfully" );
		process.chdir( gulpDir );
		done();
	} );

	ng_build.stdout.on( "data", ( data ) => {
		console.log( data.toString() );
	} );

	ng_build.stderr.on( "data", ( data ) => {
		ng_build_error += data.toString();
	} );

} );


gulp.task( "clean:server", () => {
	return del( [ "./build/server/**/*", "./server/dist/**/*" ] );
} );


gulp.task( "build:server", [ "clean:server" ], () => {

	let tsc_error = "";
	let tsc_output = "";

	process.chdir( path.join( gulpDir, 'server' ) );

	let tsc = spawn( "tsc", [], { "shell": true } );

	tsc.on( "close", ( code ) => {

		if ( code !== 0 ) {
			console.log( "TSC finished with code:", code );
			console.error( tsc_error );
			return;
		}

		console.log( "TSC completed successfully" );

		process.chdir( gulpDir );

		gulp.src( [
				'server/package.json',
				'server/appspec.yml',
				'server/resources/**/*',
				'server/aws/**/*'
		], { "base": "server" } )
		.pipe( gulp.dest( path.join( gulpDir, 'build', 'server' ) ) );

		gulp.src( [
			'client/build/index.html'
		] )
		.pipe( gulp.dest( path.join( gulpDir, 'build', 'server' ) ) );

	} );


	tsc.stdout.on( "data", ( data ) => {
		tsc_output += data.toString();
	} );


	tsc.stderr.on( "data", ( data ) => {
		tsc_error += data.toString();
	} );
} );


let chDirRoot = () => {

};
