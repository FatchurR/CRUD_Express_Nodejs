var express = require('express');
var router = express.Router();
var connection = require('../library/database'); // Pastikan path ini benar


// INDEX POSTS
router.get('/', function (req, res, next) {
    connection.query('SELECT * FROM tbl_16_post ORDER BY id desc', function (err, rows) {
        if (err) {
            req.flash('error', err);
            res.render('posts', {
                data: ''
            });
        } else {
            res.render('posts/index', {
                data: rows
            });
        }
    });
});

// CREATE POST
router.get('/create', function (req, res, next) {
    res.render('posts/create', {
        title: '',
        content: ''
    })
});

// STORE POST
router.post('/store', function (req, res, next) {
    let title = req.body.title;
    let content = req.body.content;
    let errors = false;

    if (title.length === 0) {
        errors = true;
        req.flash('error', "Silahkan Masukkan Title");
    }

    if (content.length === 0) {
        errors = true;
        req.flash('error', "Silahkan Masukkan Konten");
    }

    if (!errors) {
        let formData = {
            title: title,
            content: content
        }

        connection.query('INSERT INTO tbl_16_post SET ?', formData, function (err, result) {
            if (err) {
                req.flash('error', err);
                res.render('posts/create', {
                    title: formData.title,
                    content: formData.content
                })
            } else {
                req.flash('success', 'Data Berhasil Disimpan!');
                res.redirect('/posts');
            }
        })
    }
});

// EDIT POST
router.get('/edit/(:id)', function (req, res, next) {
    let id = req.params.id;

    connection.query('SELECT * FROM tbl_16_post WHERE id = ' + id, function (err, rows, fields) {
        if (err) throw err

        if (rows.length <= 0) {
            req.flash('error', 'Data Post ID ' + id + " Tidak Ditemukan");
            res.redirect('/posts');
        } else {
            res.render('posts/edit', {
                id: rows[0].id,
                title: rows[0].title,
                content: rows[0].content
            });
        }
    });
});

// UPDATE POST
router.post('/update/:id', function (req, res, next) {
    let id = req.params.id;
    let title = req.body.title;
    let content = req.body.content;
    let errors = false;

    if (title.length === 0) {
        errors = true;
        req.flash('error', "Silahkan Masukkan Title");
    }

    if (content.length === 0) {
        errors = true;
        req.flash('error', "Silahkan Masukkan Konten");
    }

    if (!errors) {
        let formData = {
            title: title,
            content: content
        }

        connection.query('UPDATE tbl_16_post SET ? WHERE id = ' + id, formData, function (err, result) {
            if (err) {
                req.flash('error', err);
                res.render('posts/edit', {
                    id: req.params.id,
                    title: formData.title,
                    content: formData.content
                });
            } else {
                req.flash('success', 'Data Berhasil Diupdate!');
                res.redirect('/posts');
            }
        });
    }
});

// DELETE POST
router.get('/delete/(:id)', function(req, res, next) {
    let id = req.params.id;

    connection.query('DELETE FROM tbl_16_post WHERE id = ' + id, function(err, result) {
        if (err) {
            req.flash('error', err)
            res.redirect('/posts')
        } else {
            req.flash('success', 'Post Berhasil Dihapus!')
            res.redirect('/posts')
        }
    });
});

module.exports = router;