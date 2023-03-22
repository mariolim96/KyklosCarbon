import React from 'react'
import { useBlockNumber, useNetwork } from 'wagmi'
import Badge from 'components/atoms/Badge'
import Link from 'components/atoms/Link'

export function NetworkStatus() {
  const block = useBlockNumber({ watch: true })
  const network = useNetwork()
  const explorerUrl = network.chain?.blockExplorers?.default.url
  return (
    <div className="flex items-center gap-2 z-2 p-1 bg-secondary">
      <Badge>{network.chain?.name ?? 'Ethereum'}</Badge>
      {explorerUrl && (
        <Link>
          <h2># {block.data}</h2>
        </Link>
      )}
      {!explorerUrl && <h2># {block.data}</h2>}
    </div>
  )
}
export default NetworkStatus
