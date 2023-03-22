import React from 'react'

interface Props {
  children: React.ReactNode
}

const Link = (props: Props) => {
  return <a className="link">{props.children}</a>
}

export default Link
