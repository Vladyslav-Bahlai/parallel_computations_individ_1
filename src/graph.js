class Graph {
    graph;
    size;
    parallelForm;

    constructor(matrix) {
        this.validateInputGraph(matrix);
        this.graph = matrix.map(row => Array.from(row));
        this.size = this.graph.length;
    }

    // returns graph parallel representation
    getParallelForm(startIndex) {
        this.parallelForm = [];

        const entryLayer = this.getEntryLayerPoints();
        this.parallelForm.push(entryLayer);

        // makes shallow copy
        const prevLayers = Array.from(entryLayer);
        this.calculateParallelForm(prevLayers);

        return this.displayParallelForm(startIndex);
    }

    validateInputGraph(graph) {
        if (!Array.isArray(graph)) {
            throw new Error('Input graph must be an array')
        }

        graph.forEach(row => {
            if (row.length !== graph.length) {
                throw new Error('Graph matrix must be a square')
            }

            row.forEach(value => {
                if (value !== 1 && value !== 0) {
                    throw new Error('Graph matrix values can be either 0 or 1')
                }
            })
        })
    }

    getEntryLayerPoints() {
        const entryPoints = [];

        for (let columnIndex = 0; columnIndex < this.size; columnIndex++) {
            const currentPoint = columnIndex;
            let isEntryPoint = true;
            for (let rowIndex = 0; rowIndex < this.size; rowIndex++) {
                // entry point does not have incomes
                if (this.graph[rowIndex][columnIndex] === 1) {
                    isEntryPoint = false;
                    break;
                }
            }

            if (isEntryPoint) {
                entryPoints.push(currentPoint);
            }
        }

        return entryPoints;
    }

    getNextLayerPoints(prevLayer) {
        const nextLayer = [];

        for (let columnIndex = 0; columnIndex < this.size; columnIndex++) {
            const currentPoint = columnIndex;
            if (prevLayer.includes(currentPoint)) continue;

            const incomingPoints = [];
            let isNextLevelPoint = true;

            for (let rowIndex = 0; rowIndex < this.size; rowIndex++) {
                if (this.graph[rowIndex][columnIndex] === 1) {
                    incomingPoints.push(rowIndex);
                }
            }

            incomingPoints.forEach(point => {
                const notPrevLayerDependent = !prevLayer.includes(point);
                const isNotSelfDependent = point !== currentPoint;
                if (notPrevLayerDependent && isNotSelfDependent) {
                    isNextLevelPoint = false;
                }
            })

            if (isNextLevelPoint) {
                nextLayer.push(currentPoint);
            }
        }

        return nextLayer;
    }

    calculateParallelForm(prevLayers) {
        const nextLayer = this.getNextLayerPoints(prevLayers);
        if (nextLayer.length === 0) return;

        this.parallelForm.push(nextLayer);

        prevLayers.push(...nextLayer);
        this.calculateParallelForm(prevLayers);
    }

    displayParallelForm(startIndex) {
        return this.parallelForm
            .map((level, index) => {
                const points = level.map(point => `P${point + startIndex}`).join(', ')
                return `${index + 1} level: ${points}`;
            })
            .join('\n')
    }
}

module.exports = Graph;