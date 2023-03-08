import React from 'react'

const Image = ({alt, ...rest}) => {
  return (
    <img {...rest} alt={alt} />
  )
}

export default Image
