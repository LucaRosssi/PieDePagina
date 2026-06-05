import React from 'react'

const ButtonList = ({ categorias, filterCategory, sortProducts }) => {
  return (
    <div className='btn-container'>
      {categorias.map((categoria) => (
        <button key={categoria} onClick={() => filterCategory(categoria)} type='button'>
          {categoria}
        </button>
      ))}
      <button type='button' onClick={() => sortProducts('A/Z')}>
        A/Z
      </button>
      <button type='button' onClick={() => sortProducts('Z/A')}>
        Z/A
      </button>
    </div>
  )
}

export default ButtonList