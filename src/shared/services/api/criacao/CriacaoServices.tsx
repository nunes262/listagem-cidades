import { Environment } from "../../../environment";
import { Api } from "../axios-config";

export interface IListagemCriacao {
  id: number;
  x: number;
  y: number;
}

export interface IDetalheCriacao {
  id: number;
  x: number;
  y: number;
}

type TCriacaoComTotalCount = {
  data: IListagemCriacao[];
  totalCount: number;
};

const getAll = async (
  page = 1,
  filter = ""
): Promise<TCriacaoComTotalCount | Error> => {
  try {
    const urlRelativa = `/create?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&nomeCompleto_like=${filter}`;
    const { data, headers } = await Api.get(urlRelativa);

    if (data) {
      return {
        data,
        totalCount: Number(
          headers["x-total-count"] || Environment.LIMITE_DE_LINHAS
        ),
      };
    }

    return new Error("Erro ao listar os registros."); /*  */
  } catch (error) {
    /*  console.error(error); */
    return new Error(
      (error as { message: string }).message || "Erro ao listar os registros."
    );
  }
};

const getById = async (id: number): Promise<IDetalheCriacao | Error> => {
  try {
    const { data } = await Api.get(`/create/${id}`);

    if (data) {
      return data;
    }

    return new Error("Erro ao consultar o registro.");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao consultar o registro."
    );
  }
};

const create = async (
  dados: Omit<IDetalheCriacao, "id">
): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetalheCriacao>("/create", dados);

    if (data) {
      return data.id;
    }
    return new Error("Erro ao criar o registro.");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao criar o registro."
    );
  }
};

const updateById = async (
  id: number,
  dados: IDetalheCriacao
): Promise<void | Error> => {
  try {
    await Api.put(`/create/${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao atualizar o registro."
    );
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/create/${id}`);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao apagar o registro."
    );
  }
};

export const CriacaoService = {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
};
