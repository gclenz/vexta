import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import history from '../../services/history';
import api from '../../services/api';

import Header from '../../components/Header';

import { Container } from './styles';

export default function Municipio() {
  const [municipios, setMunicipios] = useState([]);
  const [nome, setNome] = useState('');
  const [uf, setUf] = useState();
  const [listaUfs, setListaUfs] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const ufs = [...new Set(listaUfs.map(item => item.uf))];

  async function carregaUfs() {
    const { data } = await api.get('/municipios');

    setListaUfs(data);
  }

  useEffect(() => {
    carregaUfs();
  }, []);

  async function carregaMunicipios() {
    const { data } = await api.get('/municipios', {
      params: {
        nome,
        uf,
        page,
        perPage,
      },
    });

    setMunicipios(data);
  }

  useEffect(() => {
    carregaMunicipios();
  }, [nome, uf, page, perPage]);

  return (
    <>
      <Header />
      <Container>
        <p>Buscar por nome</p>
        <input
          type="text"
          name="nome"
          value={nome}
          onChange={event => setNome(event.target.value)}
          placeholder="Digite um nome"
        />
        <p>UF</p>
        <select name="uf" onChange={event => setUf(event.target.value)}>
          <option value="">Selecione uma UF</option>
          {ufs.map(item => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <button type="button" onClick={() => history.push('/municipios/add')}>
          Adicionar municipio
        </button>
        <span>Clique/toque no nome do municipio para editar.</span>
        <table>
          <caption>Municipios</caption>
          <thead>
            <tr>
              <th>Municipio</th>
              <th>UF</th>
            </tr>
          </thead>
          <tbody>
            {municipios.map(item => (
              <tr key={item.id}>
                <td data-label="Municipio">
                  <Link to={`municipios/edit/${item.id}`}>{item.nome}</Link>
                </td>
                <td data-label="UF">{item.uf}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <section className="pagination">
          <p>Quantidade por página</p>
          <select
            name="per_page"
            onChange={event => setPerPage(event.target.value)}
          >
            <option defaultChecked value="10">
              10
            </option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
          <div>
            {page > 1 ? (
              <button type="button" onClick={() => setPage(page - 1)}>
                Voltar
              </button>
            ) : null}
            {page > 2 ? (
              <button type="button" onClick={() => setPage(1)}>
                Início
              </button>
            ) : null}
            <button type="button" onClick={() => setPage(page + 1)}>
              Avançar
            </button>
          </div>
        </section>
      </Container>
    </>
  );
}
