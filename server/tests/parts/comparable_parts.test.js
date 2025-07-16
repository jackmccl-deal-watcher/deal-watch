const { test_cpu, test_videocard, test_motherboard, test_memory, test_hard_drive, test_power_supply, test_case } = require('./test_parts.js')
const { getComparableParts } = require('../../modules/parts/ComparableParts.js')

test('tests getComparableCPUs', async () => {
    const comparableCPUs = await getComparableParts(test_cpu);
    expect(comparableCPUs.length).toBeGreaterThan(0);
});

test('tests getComparableVideoCards', async () => {
    const comparableVideoCards = await getComparableParts(test_videocard);
    expect(comparableVideoCards.length).toBeGreaterThan(0);
});

test('tests getComparableMotherboards', async () => {
    const comparableMotherboards = await getComparableParts(test_motherboard);
    expect(comparableMotherboards.length).toBeGreaterThan(0);
});

test('tests getComparableMemorys', async () => {
    const comparableMemorys = await getComparableParts(test_memory);
    expect(comparableMemorys.length).toBeGreaterThan(0);
});

test('tests getComparableHardDrives', async () => {
    const comparableHardDrives = await getComparableParts(test_hard_drive);
    expect(comparableHardDrives.length).toBeGreaterThan(0);
});

test('tests getComparablePowerSupplys', async () => {
    const comparablePowerSupplys = await getComparableParts(test_power_supply);
    expect(comparablePowerSupplys.length).toBeGreaterThan(0);
});

test('tests getComparableCases', async () => {
    const comparableCases = await getComparableParts(test_case);
    expect(comparableCases.length).toBeGreaterThan(0);
});