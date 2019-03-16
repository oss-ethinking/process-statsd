import { memoryUsage, cpuUsage, uptime } from 'process';

type ressources = {
  rss: number,
  heapTotal: number,
  heapUsed: number,
  cpuUsed: number
}

export function usage(startUsage: NodeJS.CpuUsage): ressources {
  const { rss, heapTotal, heapUsed } = memoryUsage()
  const { system, user } = cpuUsage(startUsage);
  const up = uptime() * 1000;
  const cpuUsedStr = ((system + user) / (up * 10)).toFixed(2);
  const cpuUsed = parseFloat(cpuUsedStr)
  return { rss, heapTotal, heapUsed, cpuUsed };
}
