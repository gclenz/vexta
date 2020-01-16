import { Router } from 'express';

import ClienteController from './app/controllers/ClienteController';
import CnpjController from './app/controllers/CnpjController';
import MunicipioController from './app/controllers/MunicipioController';

const routes = new Router();

routes.get('/cnpj/:cnpj', CnpjController.show);

routes.get('/clientes', ClienteController.index);
routes.get('/clientes/:id', ClienteController.show);
routes.post('/clientes', ClienteController.store);
routes.patch('/clientes/:id', ClienteController.update);
routes.delete('/clientes/:id', ClienteController.delete);

routes.get('/municipios', MunicipioController.index);
routes.get('/municipios/:id', MunicipioController.show);
routes.post('/municipios', MunicipioController.store);
routes.patch('/municipios/:id', MunicipioController.update);
routes.delete('/municipios/:id', MunicipioController.delete);

export default routes;
