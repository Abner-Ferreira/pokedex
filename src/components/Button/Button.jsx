import React, { useContext } from 'react'
import styles from './button.module.css'
import { PokeContext } from '@/contexts/PokeContexto'

export default function Button() {

  const { totalPaginas, handleClickAnterior, handleClickProximo, paginaAtual } = useContext(PokeContext)

  return (
    <>
      <div className={styles.btnContainer}>
        <button disabled={paginaAtual <= 1 ? true : false} onClick={handleClickAnterior} id={styles.btnVoltar}>Voltar</button>
        <button disabled={paginaAtual >= totalPaginas ? true : false} onClick={handleClickProximo} id={styles.btnAvancar}>Avançar</button>
      </div>
    </>
  )
}
