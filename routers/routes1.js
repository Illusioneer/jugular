var pg = require('pg');
var url = require('url');
var client = new pg.Client('postgres://mcpdev:harper123@dropbox.hcpprod.com:5432/mastercontrol');
client.connect();

module.exports=function(app){
  app.get('/',function(req,res){
     res.send('/ called successfully...');
  });
  
  app.get('/haha', function(req,res){
     res.send('FOOLED YOU!...');
  });

  app.get('/jason', function(req,res){
    data = {"names":[{ "firstName":"John" , "lastName":"Doe" }, { "firstName":"Anna" , "lastName":"Smith" },{ "firstName":"Peter" , "lastName":"Jones" }]};
    res.json({ people:data });
  }) 

  app.get('/ang1',function(req,res){
    res.render('ang1');
  });
  
  app.get('/ang2',function(req,res){
    res.render('ang2');
  });
  
  app.post('/submit', function(req,res){
    var thequery = "INSERT INTO testdata(metadata,content) values('"+JSON.stringify(req.body.name)+"','"+JSON.stringify(req.body.email)+"')";
    console.log(thequery);
    client.query(thequery, function (err){

	    if(err){
		console.log(err + "THE SQL WAS" + thequery);
	    }
	    else {
		console.log("SUBMITTED");
		req.body.update = "SnookerLoopy";
		res.json(req.body);
	    }});
    console.log("DONE");
  });
}