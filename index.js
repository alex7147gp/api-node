const express = require("express")
const routerApi = require("./routes")

const cors = require("cors")
const config = require("./config/config");

const { logErrors, errorHandler, boomErrorHandler } = require("./middleware/error.handler.js")
const { checkApiKey } = require("./middleware/auth.handler")
const connectDb = require("./libs/mongoose");
const app = express()
const corsApi = require("./utils/cors");

app.use(cors());

const port = config.port || 3000

connectDb(config.mongoDbUri);

app.use(express.json())




require("./utils/auth");


app.get("/", (req, res) => {
	res.send("Hello!")
})

app.get("/nueva-ruta", checkApiKey, (req, res) => {
	res.send("Helo i am a new way")
} )

routerApi(app)

app.use(logErrors)

app.use(boomErrorHandler)

app.use(errorHandler)

app.listen(port, () => {
	console.log(`the server  is runing on port ${port}`)
})