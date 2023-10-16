const pg = require("pg");

let db = null;
const connectionString = "postgres://lying-man:cEF86BgxQbip@ep-black-wildflower-12444346.eu-central-1.aws.neon.tech/words";

const { Pool } = pg;

try {

    db = new Pool({ 
        connectionString,
        ssl: true
    });

} catch(e) {
    console.log(e);
}

module.exports = db;