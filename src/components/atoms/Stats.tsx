import React from 'react'

interface Stat {
  title?: any
  value?: any
  desc?: any
  figure?: any
}

interface Props {
  stats?: Array<Stat>
}
const stat: Stat[] = [
  {
    title: 'Total Carbon Bridged (TCO2)',
    value: '31K',
    figure: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    ),
  },
  {
    title: 'Total Carbon Supply',
    value: '1,200',
    figure: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
      </svg>
    ),
  },
  {
    title: 'Total Liquidity',
    value: '$40,000',
    figure: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
      </svg>
    ),
  },
  {
    title: 'Total Carbon Retired',
    value: '1,200',
    figure: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
      </svg>
    ),
  },
]

const Stats = (props: Props) => {
  const { stats = stat } = props
  return (
    <div className="stats stats-vertical lg:stats-horizontal shadow">
      {stats.map(({ desc, figure, title, value }, index) => (
        <div className="stat place-items-center" key={index}>
          {figure && (
            <div className="stat-figure text-secondary" key={index}>
              {figure}
            </div>
          )}
          {title && <div className="stat-title">{title}</div>}
          {value && <div className="stat-value">{value}</div>}
          {desc && <div className="stat-desc">{desc}</div>}
        </div>
      ))}
    </div>
  )
}

export default Stats
