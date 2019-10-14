// Modules

let express = require("express")
let multer = require("multer")
let path = require("path")
let app = express()
let mlt = multer()

// Vars

let list_idx = 0
let items = [{
    title: "Title Here",
    things: []
}]
app.listen(4000, () => {
    console.log("Server running")
})


// Middleware , settings

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/views"))
app.use("/", express.static(__dirname + "/public"))
app.use("/", express.static(__dirname + '/uploads'))

let storage = multer.diskStorage({
    // storage engine for uploads
    destination: "./uploads/",
    filename: let = (req, file, callback) => {
        callback(null, file.fieldname + "-" + Date.now() +
            path.extname(file.originalname))
    }
})

let upload = multer({
    //init upload
    storage: storage,
    limits: {
        fileSize: 1000000
    }
}).single("image")


// GET METHODS

app.get("/", (req, res) => {
    // GET signup-login
    console.log("/signup-login hit")
    res.render("signup-login")
})


app.get("/signup", (req, res) => {
    // GET signup
    console.log("/signup hit")
    res.render("signup")
})


app.get("/login", (req, res) => {
    // GET login
    console.log("/login hit")
    res.render("login")
})


app.get("/pics", (req, res) => {
    console.log("/pics hit")
    res.render("pics")
})


app.get("/todo_list", (req, res) => {
    console.log("/todo_list hit")
    res.render("todo_list", {
        items: items
    })
})


//// POST METHODS

app.post("/title", mlt.none(), (req, res) => {
    // POST title
    console.log("/title hit");
    let title = req.body.title
    items[list_idx].title = title.toUpperCase()
    res.render("todo_list", {
        items: items
    })
})


app.post("/list", mlt.none(), (req, res) => {
    // POST list items
    console.log("/list hit")
    let list_items = req.body.items_given
    items[list_idx].things.push(list_items)
    res.render("todo_list", {
        items: items
    })
})


app.post("/todo-list", mlt.none(), (req, res) => {
    // POST login-form
    console.log("/todo_list hit")
    res.render("todo_list", {
        items: items
    })
})


app.post("/signup", mlt.none(), (req, res) => {
    // POST signup-form
    console.log("/signup-form hit")
    res.render("login", {
        items: items
    })
})

app.post("/delete", mlt.none(), (req, res) => {
    // POST delete list
    console.log("/delete hit")
    items[list_idx].things = []
    res.render("delete", {
        items: items
    })
})


app.post("/image", (req, res) => {
    // POST upload file
    console.log("/upload hit")
    upload(req, res, (err) => {
        if (err) {
            res.render("pics", {
                msg: "There is an error.Try again."
            });
        } else {
            if (req.file == undefined) {
                res.render("pics", {
                    msg: "No file selected."
                })
            } else {
                res.render("pics", {
                    msg: "File uploaded",
                    file: "./uploads/" + req.file.filename
                })
            }
        }
    })
})
