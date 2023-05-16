var express = require("express"),
    http = require("http"),
    app = express(),
    employees = [
        {
            "description": "Приключенческий роман о поисках сокровищ пирата",
            "tags": ["приключения", "роман", "пираты", "поиск сокровищ", "классика"]
            },
            {
            "description": "История о том, как мальчик стал волшебником и победил злодея",
            "tags": ["фэнтези", "магия", "приключения", "борьба добра и зла", "детская литература"]
            },
            {
            "description": "Роман о жизни юной девушки в поисках любви и счастья",
            "tags": ["любовный роман", "драма", "жизнь и любовь", "женская литература"]
            },
            {
            "description": "Классическая сказка о девочке-красавице, которую заточили в замок чудовища",
            "tags": ["сказка", "любовь", "чудовище", "поиск красоты"]
            },
            {
            "description": "Детектив о расследовании загадочного убийства на берегу моря",
            "tags": ["детектив", "криминал", "убийство", "море", "интрига"]
            }
    ];

app.use(express.static(__dirname + "/BookShop"));
http.createServer(app).listen(3000);
app.use(express.urlencoded({extended: true}));

app.get("/CRINGE", function(req, res) {
    res.json(employees);
})


app.post("/CRINGE", function (req, res) {
    var newEmployee = req.body;
    employees.push(newEmployee);
});
