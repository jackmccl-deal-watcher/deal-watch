const { test_cpu, test_videocard, test_motherboard, test_memory, test_hard_drive, test_power_supply, test_case } = require('./test_parts.js')
const { getComparabilityScores } = require('../../modules/parts/ComparabilityScores.js')
const { getComparableParts } = require('../../modules/parts/ComparableParts.js')

test('tests getComparabilityScoresCPUs', async () => {
    const comparableCPUs = await getComparableParts(test_cpu);
    const scoredComparableCPUs = getComparabilityScores(comparableCPUs, test_cpu);
    let avg_comparable_score_sums = 0;
    scoredComparableCPUs.forEach((scoredComparableCPU) => {
        expect(Object.keys(scoredComparableCPU.comparability_scores).length).toBeGreaterThan(0);
        expect(Object.keys(scoredComparableCPU.normalized_comparability_scores).length).toBeGreaterThan(0);
        expect(scoredComparableCPU.average_comparability_score).toBeDefined();
        avg_comparable_score_sums += scoredComparableCPU.average_comparability_score;
    });
    expect(Math.abs(1 - avg_comparable_score_sums)).toBeLessThan(0.000000001);
});

test('tests getComparabilityScoresVideoCards', async () => {
    const comparableVideoCards = await getComparableParts(test_videocard);
    const scoredComparableVideoCards = getComparabilityScores(comparableVideoCards, test_videocard);
    let avg_comparable_score_sums = 0;
    scoredComparableVideoCards.forEach((scoredComparableVideoCard) => {
        expect(Object.keys(scoredComparableVideoCard.comparability_scores).length).toBeGreaterThan(0);
        expect(Object.keys(scoredComparableVideoCard.normalized_comparability_scores).length).toBeGreaterThan(0);
        expect(scoredComparableVideoCard.average_comparability_score).toBeDefined();
        avg_comparable_score_sums += scoredComparableVideoCard.average_comparability_score;
    });
    expect(Math.abs(1 - avg_comparable_score_sums)).toBeLessThan(0.000000001);
});

test('tests getComparabilityScoresMotherboards', async () => {
    const comparableMotherboards = await getComparableParts(test_motherboard);
    const scoredComparableMotherboards = getComparabilityScores(comparableMotherboards, test_motherboard);
    let avg_comparable_score_sums = 0;
    scoredComparableMotherboards.forEach((scoredComparableMotherboard) => {
        expect(Object.keys(scoredComparableMotherboard.comparability_scores).length).toBeGreaterThan(0);
        expect(Object.keys(scoredComparableMotherboard.normalized_comparability_scores).length).toBeGreaterThan(0);
        expect(scoredComparableMotherboard.average_comparability_score).toBeDefined();
        avg_comparable_score_sums += scoredComparableMotherboard.average_comparability_score;
    });
    expect(Math.abs(1 - avg_comparable_score_sums)).toBeLessThan(0.000000001);
});

test('tests getComparabilityScoresMemorys', async () => {
    const comparableMemorys = await getComparableParts(test_memory);
    const scoredComparableMemorys = getComparabilityScores(comparableMemorys, test_memory);
    let avg_comparable_score_sums = 0;
    scoredComparableMemorys.forEach((scoredComparableMemory) => {
        expect(Object.keys(scoredComparableMemory.comparability_scores).length).toBeGreaterThan(0);
        expect(Object.keys(scoredComparableMemory.normalized_comparability_scores).length).toBeGreaterThan(0);
        expect(scoredComparableMemory.average_comparability_score).toBeDefined();
        avg_comparable_score_sums += scoredComparableMemory.average_comparability_score;
    });
    expect(Math.abs(1 - avg_comparable_score_sums)).toBeLessThan(0.000000001);
});

test('tests getComparabilityScoresHardDrives', async () => {
    const comparableHardDrives = await getComparableParts(test_hard_drive);
    const scoredComparableHardDrives = getComparabilityScores(comparableHardDrives, test_hard_drive);
    let avg_comparable_score_sums = 0;
    scoredComparableHardDrives.forEach((scoredComparableHardDrive) => {
        expect(Object.keys(scoredComparableHardDrive.comparability_scores).length).toBeGreaterThan(0);
        expect(Object.keys(scoredComparableHardDrive.normalized_comparability_scores).length).toBeGreaterThan(0);
        expect(scoredComparableHardDrive.average_comparability_score).toBeDefined();
        avg_comparable_score_sums += scoredComparableHardDrive.average_comparability_score;
    });
    expect(Math.abs(1 - avg_comparable_score_sums)).toBeLessThan(0.000000001);
});

test('tests getComparabilityScoresPowerSupplys', async () => {
    const comparablePowerSupplys = await getComparableParts(test_power_supply);
    const scoredComparablePowerSupplys = getComparabilityScores(comparablePowerSupplys, test_power_supply);
    let avg_comparable_score_sums = 0;
    scoredComparablePowerSupplys.forEach((scoredComparablePowerSupply) => {
        expect(Object.keys(scoredComparablePowerSupply.comparability_scores).length).toBeGreaterThan(0);
        expect(Object.keys(scoredComparablePowerSupply.normalized_comparability_scores).length).toBeGreaterThan(0);
        expect(scoredComparablePowerSupply.average_comparability_score).toBeDefined();
        avg_comparable_score_sums += scoredComparablePowerSupply.average_comparability_score;
    });
    expect(Math.abs(1 - avg_comparable_score_sums)).toBeLessThan(0.000000001);
});

test('tests getComparabilityScoresCases', async () => {
    const comparableCases = await getComparableParts(test_case);
    const scoredComparableCases = getComparabilityScores(comparableCases, test_case);
    let avg_comparable_score_sums = 0;
    scoredComparableCases.forEach((scoredComparableCase) => {
        expect(Object.keys(scoredComparableCase.comparability_scores).length).toBeGreaterThan(0);
        expect(Object.keys(scoredComparableCase.normalized_comparability_scores).length).toBeGreaterThan(0);
        expect(scoredComparableCase.average_comparability_score).toBeDefined();
        avg_comparable_score_sums += scoredComparableCase.average_comparability_score;
    });
    expect(Math.abs(1 - avg_comparable_score_sums)).toBeLessThan(0.000000001);
});