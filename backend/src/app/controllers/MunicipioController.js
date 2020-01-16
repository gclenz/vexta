import * as Yup from 'yup';
import { Op } from 'sequelize';
import Municipio from '../models/Municipio';
import Cliente from '../models/Cliente';

class MunicipioController {
  async index(req, res) {
    const { page } = req.query || 1;
    const { perPage } = req.query || 10;

    const busca = {
      nome: '',
      uf: '',
    };

    if (req.query.nome) {
      busca.nome = req.query.nome;
    }

    if (req.query.uf) {
      busca.uf = req.query.uf;
    }

    const municipios = await Municipio.findAll({
      where: {
        nome: { [Op.like]: `%${busca.nome}%` },
        uf: { [Op.like]: `%${busca.uf}%` },
      },
      offset: perPage * page - perPage,
      limit: Number(perPage),
      order: [['nome', 'ASC']],
    });

    return res.status(200).json(municipios);
  }

  async show(req, res) {
    const municipio = await Municipio.findByPk(req.params.id);

    if (!municipio) {
      return res.status(400).json({ erro: 'Municipio não encontrado.' });
    }

    return res.status(200).json(municipio);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required('A razão social é obrigatória.'),
      uf: Yup.string().required('O endereço é obrigatório.'),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error:
          'A validação dos dados falhou. Cheque os dados e tente novamente.',
      });
    }

    const municipioExiste = await Municipio.findOne({
      where: { nome: req.body.nome },
    });

    if (municipioExiste) {
      return res
        .status(400)
        .json({ error: 'Esse municipio já está cadastrado.' });
    }

    const municipio = await Municipio.create(req.body);

    return res.json(municipio);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string(),
      uf: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error:
          'A validação dos dados falhou. Cheque os dados e tente novamente.',
      });
    }

    const municipio = await Municipio.findByPk(req.params.id);

    if (!municipio) {
      return res.status(400).json({ erro: 'Municipio não encontrado.' });
    }

    municipio.update(req.body);

    return res.status(200).json(municipio);
  }

  async delete(req, res) {
    try {
      const municipioExiste = await Municipio.findByPk(req.params.id);

      if (!municipioExiste) {
        return res.status(400).json({ erro: 'Municipio não encontrado.' });
      }

      const cliente = await Cliente.findOne({
        where: { municipio_id: req.params.id },
      });

      if (cliente) {
        res.status(401).json({
          erro:
            'Você não pode deletar um municipio a qual um cliente é residente.',
        });
      }

      await Municipio.destroy({
        where: { id: req.params.id },
      });

      return res
        .status(200)
        .json({ mensagem: 'Municipio deletado com sucesso.' });
    } catch (error) {
      return res
        .status(400)
        .json({ erro: 'O municipio não pode ser deletado.' });
    }
  }
}

export default new MunicipioController();
