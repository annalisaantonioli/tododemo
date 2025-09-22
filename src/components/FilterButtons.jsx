import { useState } from 'react'
import { ArrowClockwiseIcon } from '@phosphor-icons/react'

function FilterButtons({ filters, onFilterClick }) {
  const [activeFilter, setActiveFilter] = useState()

  function handleFilters(e) {
    const value = e.target.value
    setActiveFilter(value)

    onFilterClick(value)
  }

  function isActive(filter) {
    return activeFilter === filter
  }

  function handleResetFilters(e) {
    setActiveFilter()
    onFilterClick(null)
  }

  return (
    <div className='flex flex-wrap gap-8 items-center justify-start my-6 '>
      {filters.map((filter) => (
        <button
          value={filter}
          onClick={handleFilters}
          className={
            'uppercase font-medium rounded-md px-2 py-2 text-cyan-900 hover:bg-gray-200 hover:text-cyan-900 cursor-pointer ' +
            (isActive(filter) ? 'bg-cyan-500 text-white ' : 'bg-gray-300')
          }
        >
          {filter}
        </button>
      ))}
      {activeFilter && (
        <button
          onClick={handleResetFilters}
          className='p-2 bg-orange-200 flex items-center gap-2 rounded-md cursor-pointer hover:bg-orange-100'
        >
          <ArrowClockwiseIcon size={24} />
          Rimuovi filtri
        </button>
      )}
    </div>
  )
}

export default FilterButtons
