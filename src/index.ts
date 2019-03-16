import { cpuUsage } from 'process';
import * as lynx from 'lynx';
import lynxExpress from 'lynx-express';
import { usage } from './usage';

type config = {
  interval?: number;
  server?: string;
  port?: number;
  prefix: string;

}

export class processStatsd {
  cpu: any;
  metrics: any;
  startCpu: NodeJS.CpuUsage;

  constructor(cfg: config) {
    const { interval, server, port, prefix } = cfg
    this.metrics = new lynx(server ? server : 'localhost', port ? port : 8125, { prefix });
    this.startCpu = cpuUsage();
    this.startCapture(interval);
  }

  startCapture(interval) {
    setInterval(() => {
      const { rss, heapTotal, heapUsed, cpuUsed } = usage(this.startCpu)
      this.metrics.gauge('usage', cpuUsed);
      this.metrics.gauge('heapUsed', heapUsed);
      this.metrics.gauge('heapTotal', heapTotal);
      this.metrics.gauge('rss', rss);
    }, interval ? interval : 1000)
  }

  lynxExpress = () => lynxExpress(this.metrics)
}

// new processStatsd({ prefix: 'foo' })
