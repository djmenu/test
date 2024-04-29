const express = require("express");
const cors = require("cors");

const sql = require('mssql');

const config = {
    user: 'ema', // better stored in an app setting such as process.env.DB_USER
    password: 'Asccf.209051', // better stored in an app setting such as process.env.DB_PASSWORD
    server: 'utesanejamentgirona.database.windows.net', // better stored in an app setting such as process.env.DB_SERVER
    port: 1433, // optional, defaults to 1433, better stored in an app setting such as process.env.DB_PORT
    database: 'ema', // better stored in an app setting such as process.env.DB_NAME
    authentication: {
        type: 'default'
    },
    options: {
        encrypt: true
    }
}


const app = express();
app.use(cors());

const port = 3000;

app.use((req, res, next) => {
    express.json()(req, res, next);
})

app.post("/trans", (req, res) => {
    console.log("Starting...");
    var tag = req.body.tag;
    connectAndQuery(`insert into glassywaste.lectures (codi,data,dispositiu,tag,latitut,longitud) values (1,'2024/02/01',158,'${tag}',2.555,2.878)`);
    //var connect = sql.connect(config);
    console.log("connect ok");
    //var resultSet = sql.query(`insert into glassywaste.lectures (codi,data,dispositiu,tag,latitut,longitud) values (1,'2024/02/01',158,${tag},2.555,2.878)`);
    //var resultSet = connect.quer y(`select * from vision.prdtur`);
    //console.log(resultSet);
    /*connectAndQuery();

    console.log("Body de la req: ", req.body.tag);
    res.send("req.body");*/

    //var myJson = JSON.parse(req.body);
    //console.log("mi value:"+req.body["city"]);
    res.send(200, {message: 'response 2'});
});

app.listen(port, () => {
    console.log("server running");
});

async function connectAndQuery(test) {
    try {
        console.log(test);
        var poolConnection = await sql.connect(config);

        console.log("Reading rows from the Table...");
        var resultSet = await poolConnection.request().query(`${test}`);
        console.log(resultSet);
        console.log(`${resultSet.recordset.length} rows returned.`);

        // output column headers
        var columns = "";
        for (var column in resultSet.recordset.columns) {
            columns += column + ", ";
        }
        console.log("%s\t", columns.substring(0, columns.length - 2));

        // ouput row contents from default record set
        resultSet.recordset.forEach(row => {
            console.log("%s\t%s", row.CategoryName, row.ProductName);
        });

        // close connection only when we're certain application is finished
        poolConnection.close();
    } catch (err) {
        console.error(err.message);
    }
}