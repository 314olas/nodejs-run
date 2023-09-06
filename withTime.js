const EventEmitter  = require('./eventEmitter');

class WithTime extends EventEmitter  {
    async execute(fn) {
        this.emit('start');

        const startTime = performance.now();

        try {
            const res = await fn();
            const data = await res.json();

            this.emit('data', data);
        } catch (error) {
            this.emit('error', error)
        } finally {
            const endTime = performance.now();
            
            this.emit('end', endTime - startTime)
        }
    }
}

module.exports = WithTime;