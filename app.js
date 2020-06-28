'use strict';
const app = require('express')();
const bodyParser = require('body-parser');
const helmet = require('helmet');
const log4js = require('log4js');
const config = require('./config.json');

const logger = log4js.getLogger('Starting');

/**
 * Modules initialization
 */
async function init() {
	log4js.configure(config.log);
}

/**
 * Declare all express routes
 */
function routes() {
	// Initialisations
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(helmet());

	app.get('/health', (req, res) => res.sendStatus(200));

	// Services Implementations
	app.use('/api', require('./src/routes'));

	// Error 404
	app.use((req, res) => res.sendStatus(404));

	// Other errors
	app.use((err, req, res) => res.sendStatus(500));
}

/**
 * Global function to start nodeJS server
 */
async function main() {
	// Modules initialization
	await init();

	// Routes declaration
	routes();

	// Server Start with the port in config file
	app.listen(config.port, () => {
		logger.info(`Server started on port ${config.port}`);
	});
}

main()
	.catch(err => {
		logger.error(`Une erreur est survenue lors du démarrage du server : ${err.message}`);
		logger.debug(err);
	});
