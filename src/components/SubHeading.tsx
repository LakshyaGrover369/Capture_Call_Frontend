import React from 'react'

interface SubHeadingProps {
  text: string;
  className?: string;
}

const SubHeading: React.FC<SubHeadingProps> = ({ text, className }) => {
  return (
    <h2 className={`text-2xl font-semibold text-gray-700 mb-4 ${className || ''}`}>
      {text}
    </h2>
  )
}

export default SubHeading
