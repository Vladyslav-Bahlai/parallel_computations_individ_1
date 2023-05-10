const Parser = require("./src/matrix-parser");
const Graph = require("./src/graph");

const matrix = Parser.parseInputMatrix();
const graph = new Graph(matrix)
const result = graph.getParallelForm(0);

console.log(result)

