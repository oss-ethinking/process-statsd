import { memoryUsage, cpuUsage, uptime } from 'process';
import * as lynx from 'lynx';
import lynxExpress from 'lynx-express';

type config = {
  interval?: number;
  server?: string;
  port?: number;
  prefix: string;

}

export class processStatsd {
  cpu: any;
  metrics: any;

  run = (cfg: config) => {
    const { interval, server, port, prefix } = cfg
    this.metrics = new lynx(server ? server : 'localhost', port ? port : 8125, { prefix });

    const startCpu = process.cpuUsage();

    setInterval(() => {
      const { rss, heapTotal, heapUsed } = memoryUsage()
      const { system, user } = cpuUsage(startCpu);
      const up = uptime() * 1000;
      const percent = (system + user) / (up * 10);
      // console.log(rss, heapTotal, heapUsed,  percent)
      this.metrics.gauge(`${prefix}.usage`, percent.toFixed(2));
      this.metrics.gauge(`${prefix}.heapUsed`, heapUsed);
      this.metrics.gauge(`${prefix}.heapTotal`, heapTotal);
      this.metrics.gauge(`${prefix}.rss`, rss);
    }, interval ? interval : 1000)

  }

  lynxExpress = () => lynxExpress(this.metrics)
}

// (new processStatsd()).run({ prefix: 'foo' })
