var goat = require('../models/goat');
// List of all goats
exports.goat_list = async function(req, res) {
    try{
    thegoats = await goat.find();
    res.send(thegoats);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
   };
// for a specific goat.
exports.goat_detail = function(req, res) {
 res.send('NOT IMPLEMENTED: goat detail: ' + req.params.id);
};
// Handle goat create on POST.
exports.goat_create_post = function(req, res) {
 res.send('NOT IMPLEMENTED: goat create POST');
};
// Handle goat delete form on DELETE.
exports.goat_delete = function(req, res) {
 res.send('NOT IMPLEMENTED: goat delete DELETE ' + req.params.id);
};
// Handle goat update form on PUT.
exports.goat_update_put = function(req, res) {
 res.send('NOT IMPLEMENTED: goat update PUT' + req.params.id);
};
exports.goat_view_all_Page = async function(req, res) {
    try{
    thegoats = await goat.find();
    res.render('goat', { title: 'goat Search Results', results: thegoats });
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
   };
   exports.goat_create_post = async function(req, res) {
    console.log(req.body)
    let document = new goat();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"goat_type":"goat", "cost":12, "size":"large"}
    document.goat_color = req.body.goat_color;
    document.goat_breed = req.body.goat_breed;
    document.goat_price = req.body.goat_price;
    try{
    let result = await document.save();
    res.send(result);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
   }
  
// for a specific goat.
exports.goat_detail = async function(req, res) {
    console.log("detail" + req.params.id)
    try {
    result = await goat.findById( req.params.id)
    res.send(result)
    } catch (error) {
    res.status(500)
    res.send(`{"error": document for id ${req.params.id} not found`);
    }
    };
    exports.goat_update_put = async function(req, res) {
        console.log(`update on id ${req.params.id} with body
       ${JSON.stringify(req.body)}`)
        try {
        let toUpdate = await goat.findById( req.params.id)
        // Do updates of properties
        if(req.body.goat_color)
        toUpdate.goat_color = req.body.goat_color;
        if(req.body.goat_breed) toUpdate.goat_breed = req.body.goat_breed;
        if(req.body.goat_price) toUpdate.goat_price = req.body.goat_price;
        let result = await toUpdate.save();
        console.log("Sucess " + result)
        res.send(result)
        } catch (err) {
        res.status(500)
        res.send(`{"error": ${err}: Update for id ${req.params.id}
       failed`);
        }
       };
    exports.goat_delete = async function(req, res) {
        console.log("delete " + req.params.id)
        try {
        result = await goat.findByIdAndDelete( req.params.id)
        console.log("Removed " + result)
        res.send(result)
        } catch (err) {
        res.status(500)
        res.send(`{"error": Error deleting ${err}}`);
        }
        }
        exports.goat_view_one_Page = async function(req, res) {
            console.log("single view for id " + req.query.id)
            try{
            result = await goat.findById( req.query.id)
            res.render('goatdetail',
            { title: 'goat Detail', toShow: result });
            }
            catch(err){
            res.status(500)
            res.send(`{'error': '${err}'}`);
            }
            };
            exports.goat_create_Page = function(req, res) {
                console.log("create view")
                try{
                res.render('goatcreate', { title: 'goat Create'});
                }
                catch(err){
                res.status(500)
                res.send(`{'error': '${err}'}`);
                }
                };
                exports.goat_update_Page = async function(req, res) {
                    console.log("update view for item "+req.query.id)
                    try{
                    let result = await goat.findById(req.query.id)
                    res.render('goatupdate', { title: 'goat Update', toShow: result });
                    }
                    catch(err){
                    res.status(500)
                    res.send(`{'error': '${err}'}`);
                    }
                   };
                   exports.goat_delete_Page = async function(req, res) {
                    console.log("Delete view for id " + req.query.id)
                    try{
                    result = await goat.findById(req.query.id)
                    res.render('goatdelete', { title: 'goat Delete', toShow:
                    result });
                    }
                    catch(err){
                    res.status(500)
                    res.send(`{'error': '${err}'}`);
                    }
                    };
                