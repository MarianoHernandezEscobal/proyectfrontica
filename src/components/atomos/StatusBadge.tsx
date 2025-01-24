import React from 'react'
import { replaceStatus } from '../../utils/replaceStatus'
import { PropertyStatus } from '../../utils/types'

interface StatusBadgeProps {
  status: PropertyStatus
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  return (
    <span
      className="
        inline-block
        bg-blue-100 
        text-blue-800 
        text-xs 
        font-semibold 
        mr-2 
        mb-2
        px-2.5 
        py-0.5 
        rounded
        capitalize
        transition-colors
        duration-200
        hover:bg-blue-200
        hover:text-blue-900
      "
    >
      {replaceStatus(status)}
    </span>
  )
}