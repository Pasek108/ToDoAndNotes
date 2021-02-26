'use strict'

const mysql = require('mysql');
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const port = 3080;


const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "todoandnotes"
});

app.use(bodyParser.json());

app.get('/api/getCategories', (req, res) => {
    let categories = [];
    con.connect(function (err) {
        con.query("SELECT * FROM categories", function (err, result, fields) {
            for (let i = 0; i < result.length; i++) {
                categories.push({
                    id: result[i].id,
                    name: result[i].name,
                    color: result[i].color
                })
            }
            res.json(categories);
        });
    });
});

app.get('/api/getNotes', (req, res) => {
    let notes = [];
    con.connect(function (err) {
        let categories = [];
        con.query("SELECT id, name FROM categories", function (err, result, fields) {
            categories = result;
        });

        con.query("SELECT * FROM notes", function (err, result, fields) {
            for (let i = 0; i < result.length; i++) {
                notes.push(
                    {
                        id: result[i].id,
                        title: result[i].title,
                        category: result[i].category.split(";").map((id) => {
                            for (let j = 0; j < categories.length; j++) {
                                if (parseInt(id) === categories[j].id) {
                                    return categories[j].name;
                                }
                            }
                        }),
                        align: result[i].align,
                        note: result[i].note,
                        timestamp: new Date(result[i].date).getTime()
                    }
                )

                const dateTimestamp = new Date(notes[i].timestamp);
                const dateAndTime = {
                    seconds: dateTimestamp.getSeconds().toString().padStart(2, "0"),
                    minutes: dateTimestamp.getMinutes().toString().padStart(2, "0"),
                    hours: dateTimestamp.getHours().toString().padStart(2, "0"),
                    day: dateTimestamp.getDate().toString().padStart(2, "0"),
                    month: (dateTimestamp.getMonth() + 1).toString().padStart(2, "0"),
                    year: dateTimestamp.getFullYear().toString().padStart(2, "0")
                }
                notes[i].date = `${dateAndTime.day}-${dateAndTime.month}-${dateAndTime.year}`;
                notes[i].time = `${dateAndTime.hours}:${dateAndTime.minutes}:${dateAndTime.seconds}`;

                if (notes.length > 0) {
                    for (let j = notes.length - 1; j > 0; j--) {
                        if (notes[j].timestamp > notes[j - 1].timestamp) {
                            [notes[j], notes[j - 1]] = [notes[j - 1], notes[j]];
                        }
                        else break;
                    }
                }
            }

            res.json(notes);
        });
    });
});

app.post('/api/sendCategories', (req, res) => {
    const categories = req.body.categories;
    let oldCategories = [];

    con.connect(function (err) {
        con.query("SELECT * FROM categories", function (err, result, fields) {
            oldCategories = result;
        });
    })

    con.connect(function (err) {
        con.query("DROP TABLE categories");

        let create = "CREATE TABLE categories (\
            id INT(11) UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,\
            name VARCHAR(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci NOT NULL,\
            color VARCHAR(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci NOT NULL\
        )";
        con.query(create);

        for (let i = 0; i < categories.length; i++) {
            con.query("INSERT INTO categories (id, name, color) VALUES (NULL, '" + categories[i].name + "', '" + categories[i].color + "')");
        }

        con.query("SELECT * FROM categories", function (err, result, fields) {
            con.query("SELECT id, category FROM notes", function (err, category, fields) {
                for (let i = 0; i < category.length; i++) {
                    let categoryId = category[i].category;
                    if (categoryId === oldCategories.length.toString()) {
                        categoryId = result.length.toString();
                        con.query("UPDATE notes SET category = '" + categoryId + "' WHERE id = " + category[i].id);
                    }
                    else {
                        for (let j = 0; j < oldCategories.length; j++) {
                            let ok = 0;
                            const oldId = oldCategories[j].id;
                            for (let k = 0; k < result.length; k++) {
                                const newId = result[k].id;
                                if (oldCategories[j].name === result[k].name) {
                                    ok = 1;
                                    if (oldId !== newId) {
                                        if (!categoryId.includes(newId.toString())) {
                                            categoryId = categoryId.replace(oldId.toString(), newId.toString())
                                        }
                                        else categoryId = categoryId.replace(";" + oldId, "")
                                        con.query("UPDATE notes SET category = '" + categoryId + "' WHERE id = " + category[i].id);
                                        break;
                                    }
                                }
                                else if (oldId === newId) {
                                    if (oldCategories[j].name !== result[k].name) {
                                        ok = 1;
                                        break;
                                    }
                                }
                            }
                            if (ok === 0) {
                                categoryId = categoryId.replace(";" + oldCategories[j].id, "")
                                con.query("UPDATE notes SET category = '" + categoryId + "' WHERE id = " + category[i].id);
                            }
                        }
                    }

                }
            })
        });

        res.json("Succes!");
    });
});

app.post('/api/deleteNote', (req, res) => {
    const id = req.body.id;

    con.connect(function (err) {
        con.query("SELECT * FROM notes", function (err, result, fields) {
            for (let i = 0; i < result.length; i++) {
                con.query("SELECT id FROM categories", function (err, categories, fields) {
                    if (id === result[i].id) {
                        if (result[i].category === categories.length.toString()) con.query("DELETE FROM notes WHERE id = " + id);
                        else con.query("UPDATE notes SET category = '" + categories.length + "' WHERE id = " + id);
                    }
                })
            }

            res.json("Succes!");
        });
    });
});

app.post('/api/backupNote', (req, res) => {
    const id = req.body.id;

    con.connect(function (err) {
        con.query("SELECT * FROM notes", function (err, result, fields) {
            for (let i = 0; i < result.length; i++) {
                if (id === result[i].id) con.query("UPDATE notes SET category = '1' WHERE id = " + id);
            }

            res.json("Succes!");
        });
    });
});

app.post('/api/updateNoteCategories', (req, res) => {
    const id = req.body.id;
    const chosenCategories = req.body.chosenCategories;

    con.connect(function (err) {
        con.query("SELECT id FROM categories", function (err, categories, fields) {
            con.query("SELECT * FROM notes WHERE id = " + id, function (err, note, fields) {
                let category = note[0].category;
                for (let i = 0; i < chosenCategories.length; i++) {
                    const categoryName = categories[i + 1].id;
                    if (chosenCategories[i]) {
                        if (!category.includes(categoryName)) category += ";" + categoryName;
                    }
                    else if (category.includes(categoryName)) category = category.replace(";" + categoryName, "");
                }

                con.query("UPDATE notes SET category = '" + category + "' WHERE id = " + id);
            });

            res.json("Succes!");
        });
    });
});

app.get('/', (req, res) => {
    res.send('App Works !!!!');
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});