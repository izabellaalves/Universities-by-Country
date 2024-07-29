import { api } from "../repositories/universities";

export async function listarUniversidadesPorPais(pais) {
    try {
        const resposta = await api.get(`search?country=${pais}`);
        const universidades = resposta.data;
        return universidades;
    } catch (erro) {
       throw new Error('Erro ao listar as universidades');
    }
}