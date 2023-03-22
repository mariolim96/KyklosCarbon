import React from 'react'

interface Props {
  children: React.ReactNode
}

const Badge = (props: Props) => {
  return <span className="badge">{props.children}</span>
}

export default Badge
