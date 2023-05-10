const fs = require("fs");
const path = require("path");

class MatrixParser {
    // converts input file content into graph matrix 2-d array
    static parseInputMatrix() {
        const data = fs.readFileSync(path.join(__dirname, '..', 'input', 'graph-matrix.txt')).toString();
        const rows = data.split('\n')
        const inputMatrix = rows.map(row => {
                return row.split(' ')
                    .map(value => Number.parseInt(value.trim()))
                    .filter(value => !Number.isNaN(value))
            }
        ).filter(row => row.length > 0);

        return inputMatrix;
    }
}

module.exports = MatrixParser;