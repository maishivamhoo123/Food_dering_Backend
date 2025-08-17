const mongoose = require("mongoose");

function ConnectDb(url) {
    return mongoose.connect(url);

}

module.exports = { ConnectDb };
