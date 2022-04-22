const fs = require('fs')
const path = require('path')
const solc = require('solc')

const filename = 'Car.sol'

const contractPath = path.resolve(__dirname, '../contracts', filename)
const contractSource = fs.readFileSync(contractPath, 'utf-8')

const input = {
    language: 'Solidity',
    sources: {
        'Car.sol': {
            content: contractSource
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
}

const output = JSON.parse(solc.compile(JSON.stringify(input)))

if (
    output.errors &&
    Array.isArray(output.errors) &&
    output.errors.length > 0
) {
    console.log(output.errors[0].formattedMessage)
} else {
    console.log(
        Object.keys(output.contracts[filename].Car.evm)
    )
}

// console.log(
//     'compile01:',
//     output.contracts[filename].Car.evm.bytecode.object
// )

// console.log(
//     'compile02:',
//     output.contracts[filename].Car.evm.deployedBytecode.object
// )

console.log(
    output.contracts[filename].Car.evm.bytecode.object
)
console.log(
    output.contracts[filename].Car.evm.deployedBytecode.object
)
