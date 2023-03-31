console.log("Hello!")


const express = require("express")
const routerApi = require("./routes")

const cors = require("cors")

const { logErrors, errorHandler, boomErrorHandler } = require("./middleware/error.handler.js")


const app = express()



const options = {
  origin: ["http://localhost:3000", "https://myapp.co"]
};

app.use(cors(options))

const port = 3000



app.use(express.json())

app.get("/", (req, res) => {
	res.send("Hello!")
})

routerApi(app)

app.use(logErrors)

app.use(boomErrorHandler)

app.use(errorHandler)

app.listen(port, () => {
	console.log(`the server  is runing on port ${port}`)
})