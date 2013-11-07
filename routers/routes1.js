var pg = require('pg');
var url = require('url');
var client = new pg.Client('postgres://mcpdev:harper123@dropbox.hcpprod.com:5432/mastercontrol');
client.connect();

var db_write = function(query) {
  
  var keys = [];var values = [];
  for (var items in query.fields){keys.push(items);values.push("'" + JSON.stringify(query.fields[items]) + "'");};
  
  var thequery = "INSERT INTO " + query.table + " (" + keys.join(", ") + ")" + " VALUES "+ "(" + values.join(", ") + ")";
  client.query(thequery, function (err)
  {
	    if(err){
	      console.log("SQL FAILURE:" + err + thequery);
	    }
	    else {
//	      console.log("ENTRY SUCCESS");
	    }
   });
}

module.exports=function(app){
  app.get('/',function(req,res){
     res.send('/ called successfully...');
  });

  app.get('/ang1',function(req,res){
    res.render('ang1');
  });
  
  app.get('/ang2',function(req,res){
    res.render('ang2');
  });
  
  app.post('/submit', function(req,res){
    
    db_write(req.body);
    console.log(req.body);
    res.json(req.body);
    
  });
}

