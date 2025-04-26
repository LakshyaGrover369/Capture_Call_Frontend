import React from 'react'

interface HeadingProps {
  text: string;
  className?: string;
}

const Heading: React.FC<HeadingProps> = ({ text, className }) => {
  return (
    <h1 className={`text-4xl font-bold text-gray-800 mb-6 ${className || ''}`}>
      {text}
    </h1>
  )
}

export default Heading
