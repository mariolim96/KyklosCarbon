// Generated by @wagmi/cli@0.1.11 on 3/7/2023 at 7:14:54 PM
import {
  getContract,
  GetContractArgs,
  readContract,
  ReadContractConfig,
  writeContract,
  WriteContractMode,
  WriteContractArgs,
  WriteContractPreparedArgs,
  WriteContractUnpreparedArgs,
  prepareWriteContract,
  PrepareWriteContractConfig,
  watchContractEvent,
  WatchContractEventConfig,
  WatchContractEventCallback,
} from 'wagmi/actions'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Message
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const messageABI = [
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address', indexed: false },
      { name: 'purpose', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'SetMessage',
  },
  { stateMutability: 'view', type: 'function', inputs: [], name: 'message', outputs: [{ name: '', internalType: 'string', type: 'string' }] },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [{ name: '_message', internalType: 'string', type: 'string' }],
    name: 'setMessage',
    outputs: [],
  },
] as const

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const messageAddress = {
  11155111: '0xcc5A0D6268d70811eDad77799f2168aFe6382E89',
} as const

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const messageConfig = { address: messageAddress, abi: messageABI } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Core
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link messageABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export function getMessage(config: Omit<GetContractArgs, 'abi' | 'address'> & { chainId?: keyof typeof messageAddress }) {
  return getContract({ abi: messageABI, address: messageAddress[11155111], ...config })
}

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link messageABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export function readMessage<TAbi extends readonly unknown[] = typeof messageABI, TFunctionName extends string = string>(
  config: Omit<ReadContractConfig<TAbi, TFunctionName>, 'abi' | 'address'> & { chainId?: keyof typeof messageAddress }
) {
  return readContract({ abi: messageABI, address: messageAddress[11155111], ...config } as unknown as ReadContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link messageABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
// export function writeMessage<TFunctionName extends string, TMode extends WriteContractMode, TChainId extends number = keyof typeof messageAddress>(
//   config:
//     | (Omit<WriteContractPreparedArgs<typeof messageABI, TFunctionName>,
//       'abi' | 'address'> & {
//         mode: TMode
//         chainId?: TMode extends 'prepared' ? TChainId : keyof typeof messageAddress
//       })
//     | (Omit<WriteContractUnpreparedArgs<typeof messageABI, TFunctionName>, 'abi' | 'address'> & {
//       mode: TMode
//       chainId?: TMode extends 'prepared' ? TChainId : keyof typeof messageAddress
//     })
// ) {
//   return writeContract({ abi: messageABI, address: messageAddress[11155111], ...config } as WriteContractArgs<typeof messageABI, TFunctionName>)
// }

/**
 * Wraps __{@link prepareWriteContract}__ with `abi` set to __{@link messageABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export function prepareWriteMessage<TAbi extends readonly unknown[] = typeof messageABI, TFunctionName extends string = string>(
  config: Omit<PrepareWriteContractConfig<TAbi, TFunctionName>, 'abi' | 'address'> & { chainId?: keyof typeof messageAddress }
) {
  return prepareWriteContract({ abi: messageABI, address: messageAddress[11155111], ...config } as unknown as PrepareWriteContractConfig<
    TAbi,
    TFunctionName
  >)
}

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link messageABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export function watchMessageEvent<TAbi extends readonly unknown[] = typeof messageABI, TEventName extends string = string>(
  config: Omit<WatchContractEventConfig<TAbi, TEventName>, 'abi' | 'address'> & { chainId?: keyof typeof messageAddress },
  callback: WatchContractEventCallback<TAbi, TEventName>
) {
  return watchContractEvent({ abi: messageABI, address: messageAddress[11155111], ...config } as WatchContractEventConfig<TAbi, TEventName>, callback)
}
