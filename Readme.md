## use it

```bash
# install package
yarn add process-statsd

#start graphite
docker run \
 -d\
 --rm\
 --name graphite-8125\
 -p 80:80\
 -p 8125:8125/udp\
 graphiteapp/graphite-statsd
```

```JavaScript
import {processStatsd} from 'process-statsd'

// send usage, heapUsed, heapTotal, rss to periodically to statsd
const config = {
  interval: 1000,
  server: 'localhost',
  port?: 8125,
  prefix: 'myProcess',

}
const stats = new processStatsd()
stats.run(config)

// use express middleware
const middleware = stats.lynxExpress()
app.use(middleware())

```

## dev

```bash
# install dep
yarn

# dev mode (tsc + nodemon)
yarn dev

# build (with cleanup)
yarn build

```
