import * as winston from 'winston';
import * as url from 'url';
import * as os from 'os';
import * as util from 'util';
import * as request from 'request';

const appLog = new ( winston.transports.File )( { "filename": "/var/log/app/app.log" } );
const consoleLog = new ( winston.transports.Console )();

const logger = new ( winston.Logger )( {
	"level": "verbose",
	"transports": [
		consoleLog,
		appLog
	]
} );

export { logger };
