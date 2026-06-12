import { memo } from 'react'

const sortOptions = [
  { label: 'A/Z', value: 'A/Z' },
  { label: 'Z/A', value: 'Z/A' }
];

const ButtonList = memo(({ categorias, filterCategory, sortProducts }) => {
  return (
    <>
      {categorias.map((categoria) => (
        <button key={categoria} onClick={() => filterCategory(categoria)} type='button'>
          {categoria}
        </button>
      ))}
      {sortOptions.map((option) => (
        <button key={option.value} onClick={() => sortProducts(option.value)} type='button'>
          {option.label}
        </button>
      ))}
    </>
  )
});

ButtonList.displayName = 'ButtonList';
export default ButtonList