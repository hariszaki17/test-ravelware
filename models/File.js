class File {
    constructor() {
        this.fs = require('fs')
    }

    //file actions
    fileWrite(path, data) {
        this.fs.writeFileSync(path, data);
    }

    fileRead(path) {
        let jsonList = this.fs.readFileSync(path, 'utf-8');
        let data = JSON.parse(jsonList);
        return data;
    }
}

module.exports = File