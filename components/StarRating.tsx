'use client'

import { useState, useEffect } from 'react'
import { Star } from 'lucide-react'

interface StarRatingProps {
  onChange: (rating: number) => void
  value?: number
}

export function StarRating({ onChange, value = 0 }: StarRatingProps) {
  const [rating, setRating] = useState(value)
  const [hover, setHover] = useState(0)

  useEffect(() => {
    setRating(value)
  }, [value])

  return (
    <div className="flex items-center space-x-2">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1
        return (
          <Star
            key={index}
            className={`w-12 h-12 cursor-pointer transition-colors ${
              starValue <= (hover || rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
            }`}
            onClick={() => {
              const newRating = starValue === rating ? 0 : starValue
              setRating(newRating)
              onChange(newRating)
            }}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
          />
        )
      })}
    </div>
  )
}
