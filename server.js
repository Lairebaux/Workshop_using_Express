let express = require("express")
let multer = require("multer")
let path = require("path")
let app = express()
let mlt = multer()
let list_idx = 0
let items = [{
    title: "Title Here",
    things: []
}]

app.listen(4000, () => {
    console.log("Server running")
})
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/views"))
app.use("/", express.static(__dirname + "/public"))


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
    // Show list items
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
    res.render("todo_list",{
        items: items
    })
})


app.post("/signup", mlt.none(), (req, res) => {
    console.log("/signup-form hit")
    res.render("login",{
        items: items
    })
})

app.post("/delete", mlt.none(), (req, res)=>{
    console.log("/delete hit")
    items[list_idx].things = []
    res.render("delete", {items: items})
})