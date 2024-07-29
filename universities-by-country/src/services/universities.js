import { api } from "../repositories/universities";

export async function listarUniversidadesPorPais(pais) {
    try {
        const resposta = await api.get(`search?country=${pais}`);
        const universidades = resposta.data;
        console.log(universidades);
        return universidades;
    } catch (erro) {
        console.error('Erro ao listar as universidades:', erro);
    }
}