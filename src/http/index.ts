import axios, { AxiosError } from "axios";
import { useObterToken } from "../hooks/useToken";
import { ICategoria } from "../interfaces/ICategoria";
import { ILivro } from "../interfaces/ILivro";


export const http = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    Accept: 'aplication/json',
    Content: 'application/json'
  }
})

http.interceptors.request.use(function (config) {
  // Do something before request is sent
  const token = useObterToken()

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config;
}, function (error) {
  // Do something with request error
  console.log('Erro na instancia axios - Interceptor');


  return Promise.reject(error);
});

http.interceptors.response.use(function (response) {
  // Qualquer código de status que esteja dentro do intervalo de 2xx faz com que esta função seja acionada
  // Faça algo com os dados de resposta
  return response;
}, function (error: AxiosError) {
  // Qualquer código de status que esteja fora do intervalo de 2xx faz com que esta função seja acionada
  //Faça algo com erro de resposta

  return Promise.reject(error);
});

export const obterCategoriaPorSlug = async (slug: string) => {
  const resposta = await http.get<ICategoria[]>('categorias', { params: { slug: slug } })
  
  return resposta.data[0]
}

export const obterLivrosDestaque = async (tipo: string) => {
  const resposta = await http.get<ILivro[]>(`public/${tipo}`)
  return resposta.data
}

export const obterProdutosDaCategoria = async (categoria: ICategoria) => {
  const resposta = await http.get<ILivro[]>('livros', { params: { categoria: categoria.id } })
  
  return resposta.data
}

export const obterLivroPorSlug = async (slug: string) => {
  const resposta = await http.get<ILivro[]>('livros', { params: { slug: slug } })
    
  return resposta.data[0]
}

export const obterAutorPorId = async (id: number) => {
  const resposta = await http.get<any[]>('autores', { params: { id: id } })
  
  return resposta.data[0]
}