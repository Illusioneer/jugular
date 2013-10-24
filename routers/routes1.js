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
    res.render('ang1', { title: 'Testitcular' });
  });

  
}