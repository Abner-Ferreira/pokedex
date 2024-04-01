import { useContext, useState } from 'react'
import styles from './mainCard.module.css'
import { PokeContext } from '@/contexts/PokeContexto'
import Button from '../Button/Button';

export default function MainCard() {

  const { getPokemonPerPage } = useContext(PokeContext)



  // Obter os elementos da página atual
  const pokemonsDaPagina = getPokemonPerPage();

  return (
    <>
      {/* <input type="text" onChange={(e) => setFiltro(e.target.value)} /> */}

      <main className={styles.container}>
        <div className={styles.cardContainer}>

          {pokemonsDaPagina.map(poke => (
            <div className={styles.card} key={poke.data.id} >
              <img src={poke.data.sprites.front_default} alt="" />
              <p className={styles.id}>N° {poke.data.id}</p>
              <h5 className={styles.pokeName}>{poke.data.name}</h5>
              <div className={styles.tipoContainer}>
                {poke.data.types.map((tipo, i) => (
                  <span key={i} id={tipo.type.name}>{tipo.type.name}</span>
                ))}
              </div>
            </div>
          ))}

        </div>

        <Button />

      </main>
    </>
  )
}
