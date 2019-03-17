import { usage } from './usage';
import { cpuUsage } from 'process';
import { cpus } from 'os';

test('usage.cpuUsed between 0 and 100*cores', () => {
  const startUsage = cpuUsage();
  const { cpuUsed } = usage(startUsage)
  expect(cpuUsed).toBeGreaterThan(0);
  expect(cpuUsed).toBeLessThan(100 * cpus().length);
});
