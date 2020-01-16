import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Cliente from '../pages/Cliente';
import AddCliente from '../pages/Cliente/Add';
import EditCliente from '../pages/Cliente/Edit';

import Municipio from '../pages/Municipio';
import AddMunicipio from '../pages/Municipio/Add';
import EditMunicipio from '../pages/Municipio/Edit';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Cliente} />
      <Route path="/clientes/add" component={AddCliente} />
      <Route path="/clientes/edit/:idCliente" component={EditCliente} />

      <Route path="/municipios" exact component={Municipio} />
      <Route path="/municipios/add" component={AddMunicipio} />
      <Route path="/municipios/edit/:idMunicipio" component={EditMunicipio} />
    </Switch>
  );
}
