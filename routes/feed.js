//var moment = require('moment');
var pg = require('pg');
var client = new pg.Client('postgres://master1:harper123@localhost:5432/mastercontrol');
client.connect();
//var Feed = require('feed');

exports.rss = function(req, res){

    // Initializing feed object
    var feed = new Feed({
        title:          'Test Feed Title',
        description:    'This is my test feed!',
        link:           'http://mcp.hcpprod.com/',
        image:          'http://upload.wikimedia.org/wikipedia/commons/d/d6/MicroQR_Example.png',
        copyright:      'Copyright © 2013 John Doe. All rights reserved',

        author: {
            name:       'John Doe',
            email:      'john.doe@example.com',
            link:       'https://example.com/john-doe'
        }
    });

    var thesql = "SELECT * FROM nodeposts ORDER BY create_stamp DESC";

    client.query(thesql, function (err, posts){

        if(err)
            res.send('404 Not found', 404);

        else {
            for(var key in posts) {
                feed.item({
                    title:          posts.rows[key].post_name,
                    link:           "http://mcp.hcpprod.com:3000/posts",
                    description:    posts.rows[key].desc,
                    date:           posts.rows[key].create_stamp
                });
            }
            // Setting the appropriate Content-Type
            res.set('Content-Type', 'text/xml');

            // Sending the feed as a response
            res.send(feed.render('rss-2.0'));
        }
    });
};