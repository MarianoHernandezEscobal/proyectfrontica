import { useState, useRef, useEffect } from 'react'
import { PropertyStatus } from '../../utils/types'
import { replaceStatus } from '../../utils/replaceStatus'

interface PropertyStatusSelectProps {
  value: PropertyStatus[]
  onChange: (value: PropertyStatus[]) => void
}

export function PropertyStatusSelect({ value, onChange }: PropertyStatusSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  const filteredStatuses = Object.values(PropertyStatus).filter((status) =>
    replaceStatus(status).toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const toggleOption = (status: PropertyStatus) => {
    const newValue = value.includes(status)
      ? value.filter((s) => s !== status)
      : [...value, status]
    onChange(newValue)
  }

  return (
    <div className="relative mt-1 border rounded-md" ref={dropdownRef}>
      <button
        type="button"
        className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="block truncate">
          {value.length === 0
            ? 'Seleccione estados'
            : `${value.length} estados seleccionados`}
        </span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full max-w-xs py-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          <div className="sticky top-0 z-10 bg-white">
            <input
              type="text"
              className="w-full px-3 py-2 text-sm leading-5 text-gray-900 placeholder-gray-500 border-b focus:outline-none"
              placeholder="Buscar estado..."
              onChange={(event) => setQuery(event.target.value)}
              value={query}
            />
          </div>
          {filteredStatuses.map((status) => (
            <div
              key={status}
              className={`${
                value.includes(status) ? 'bg-blue-100' : ''
              } cursor-pointer select-none relative py-2 capitalize pl-10 pr-4 hover:bg-blue-50`}
              onClick={() => toggleOption(status)}
            >
              <span className={`${value.includes(status) ? 'font-medium' : 'font-normal'} block truncate`}>
                {replaceStatus(status)}
              </span>
              {value.includes(status) && (
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                  ✓
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}