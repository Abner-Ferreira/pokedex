'use client'
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';


export const PokeContext = createContext({})

export default function PokeProvider({ children }) {

  const [allPokemon, setAllPokemon] = useState([])

  useEffect(() => {
    getPokemons()
  }, [])

  const getPokemons = () => {
    var endpoints = []
    // 1302
    for (let i = 1; i <= 1025; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`)
    }
    axios.all(
      endpoints.map(endpoint => axios.get(endpoint))
    )
      .then(res => setAllPokemon(res))
      .catch(err => console.log(err))

  }

  // Quantidade de itens por página
  const itensPorPagina = 14;

  // useStates para controlar a página atual e o seu fim
  const [paginaAtual, setPaginaAtual] = useState(1);
  const totalPaginas = Math.ceil(allPokemon.length / itensPorPagina);


  // Função de filtro para comparar os pokemons de A-Z
  function compareAZ(a,b) {
    if (a.data.name < b.data.name)
       return -1;
    if (a.data.name > b.data.name)
      return 1;
    return 0;
  }
  // Função de filtro para comparar os pokemons de Z-A
  function compareZA(pokeA,pokeB) {
    if (pokeA.data.name > pokeB.data.name)
       return -1;
    if (pokeA.data.name < pokeB.data.name)
      return 1;
    return 0;
  }

  // Função para obter os elementos da página atual
  const getPokemonPerPage = (func) => {
    const inicio = (paginaAtual - 1) * itensPorPagina;
    const fim = inicio + itensPorPagina;
    return allPokemon.sort(func).slice(inicio, fim);
  };

  // Função para o botão "Anterior"
  const handleClickAnterior = () => {
    if (paginaAtual > 1) {
      setPaginaAtual(paginaAtual - 1);
    }
  };

  // Função para o botão "Próximo"
  const handleClickProximo = () => {
    if (paginaAtual < totalPaginas) {
      setPaginaAtual(paginaAtual + 1);
    } 
  };



  return (
    <>
      <PokeContext.Provider value={{ totalPaginas, handleClickAnterior, handleClickProximo, getPokemonPerPage, paginaAtual, compareZA }}>
        {children}
      </PokeContext.Provider>
    </>
  );
}