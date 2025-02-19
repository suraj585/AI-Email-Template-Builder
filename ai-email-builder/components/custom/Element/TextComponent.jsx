import React from 'react'

function TextComponent({style,textarea}) {
  return (
    <div style={{width:'100%'}}>
      <h2 style={style}>{textarea}</h2>
    </div>
  )
}

export default TextComponent