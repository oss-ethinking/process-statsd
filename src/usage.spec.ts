import { usage } from './usage';
import { cpuUsage } from 'process';

test('usage.cpuUsed between 0 and 100', () => {
  const startUsage = cpuUsage();
  const { cpuUsed } = usage(startUsage)
  expect(cpuUsed).toBeGreaterThan(0);
  expect(cpuUsed).toBeLessThan(800);
});
