import React from 'react'

export default function Background(props) {
  return (
    <div className="h-full">
      <div className={'Background' + props.background}>{props.children}</div>
    </div>
  )
}
