import EventEmitter from 'eventemitter2';
class Model extends EventEmitter {
    getConnection() {
        if(!this.connectionPromise) {
            this.connectionPromise = new Promise((resolve, reject) => {
                this.connection = new WebSocket(`ws://${window.location.host}/test`);
                this.connection.addEventListener("open", () => {
                    resolve(this.connection);
                });
                this.connection.addEventListener("onmessage", (...args) => {
                    this.handleMessage(...args);
                });
                this.connection.addEventListener("onerror", (err) => {
                    reject(err);
                });
            });
        }
        return this.connectionPromise;
    }
    async send(topic, obj) {
        const connection = await this.getConnection();
        console.log("sending ", topic, obj);
        this.emit("test", obj);
        const message = JSON.stringify({topic, obj});
        console.log("raw message to send", message);
        connection.send(message);
    }
    handleMessage(rawMessage) {
        const message = JSON.parse(rawMessage);
        console.log(message);
        this.emit(message.topic, message.content);
    }

}
export default new Model();
