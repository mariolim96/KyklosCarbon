import { defineConfig } from '@wagmi/cli'
import { actions, hardhat, react } from '@wagmi/cli/plugins'

export default defineConfig({
  out: 'src/abis.ts',
  contracts: [],
  plugins: [
    actions({
      getContract: true,
      readContract: true,
      prepareWriteContract: true,
      watchContractEvent: true,
    }),
    hardhat({
      project: './contracts/',
      commands: {
        clean: 'npx hardhat clean',
        rebuild: 'npx hardhat compile',
      },
    }),
    react(),
  ],
})
