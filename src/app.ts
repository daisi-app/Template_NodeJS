import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import log4js from 'log4js';
import * as config from '../config.json';
import apiroutes from './routes/index';

const app = express();

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

	app.get('/health', (req: Request, res: Response) => res.sendStatus(200));

	// Services Implementations
	app.use('/api', apiroutes);

	// Error 404
	app.use((req: Request, res: Response) => res.sendStatus(404));

	// Other errors
	app.use((err: Error, req: Request, res: Response) => res.sendStatus(500));
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
	const port = process.env.PORT || 8080;
	app.listen(port, () => {
		logger.info(`Server started on port ${port}`);
	});
}

main()
	.catch(err => {
		logger.error(`Une erreur est survenue lors du démarrage du server : ${err.message}`);
		logger.debug(err);
	});
