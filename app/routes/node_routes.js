module.exports = function(app, db) {
var result = {}	;
const jsonData	= require('./countries');
  app.post('/notes', (req, res) => {
    const note = { id: req.body.id, name: req.body.name, price: req.body.price, brand: req.body.brand };
    db.collection('notes').insert(note, (err, result) => {
      if (err) { 
        res.status(404).send({ 'error': 'An error has occurred' }); 
      } else {
      	delete result.ops[0]._id;
      	result = {'success':true,'result' : result.ops[0]}
        res.send(result);
      }
    });
  });

  app.get('/countries',(req,res) =>{
  		result = {'success':true,'result':jsonData};
  		res.send(result);
  });


app.get('/countries/:code',(req,res) =>{
	console.log(req.params.code);
	
		var json = jsonData.find(o => o.code === req.params.code);
		console.log("json",json);
		result = {'success':true,'result':json};
		res.send(result);
});
};