const fs = require('fs');

function decodeValue(base, value) {
    return parseInt(value, base);
}

function findConstantTerm(points) {
    let constantTerm = 0;
    const k = points.length;

    for (let i = 0; i < k; i++) {
        let xi = points[i][0];
        let yi = points[i][1];
        let li = 1;

        for (let j = 0; j < k; j++) {
            if (i !== j) {
                let xj = points[j][0];
                li *= (0 - xj) / (xi - xj);
            }
        }

        constantTerm += yi * li;
    }

    return Math.round(constantTerm);
}

function processTestCase(testCase) {
    const keys = testCase.keys;
    const n = keys.n;
    const k = keys.k;

    let points = [];

    for (let i = 1; i <= n; i++) {
        if (!testCase[i.toString()]) {
            console.error(`Entry for index ${i} is undefined`);
            continue; 
        }

        const base = parseInt(testCase[i.toString()].base);
        const value = testCase[i.toString()].value;
        const x = i;
        const y = decodeValue(base, value);

        points.push([x, y]);
    }

    const selectedPoints = points.slice(0, k);

    const constantTerm = findConstantTerm(selectedPoints);

    return constantTerm;
}

function main() {
    try {
        const testCase1 = JSON.parse(fs.readFileSync('test_case_1.json', 'utf8'));
        const testCase2 = JSON.parse(fs.readFileSync('test_case_2.json', 'utf8'));

        const secret1 = processTestCase(testCase1);
        const secret2 = processTestCase(testCase2);

        console.log(`Secret for Test Case 1: ${secret1}`);
        console.log(`Secret for Test Case 2: ${secret2}`);
    } catch (error) {
        console.error('Error reading or processing test cases:', error);
    }
}

main();



