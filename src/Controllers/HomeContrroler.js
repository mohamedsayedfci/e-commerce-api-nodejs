//fetch all items
// const Auth = require("../middleware/auth");
const Item = require("../models/Item");

exports.index = async (req, res) => {
   var items=await Item.find({});
   console.log(items)
    var title = "No programming concept is complete without a cute animal mascot.";
    // var items = [
    //     { name: 'Sammy', organization: "DigitalOcean", birth_year: 2012},
    //     { name: 'Tux', organization: "Linux", birth_year: 1996},
    //     { name: 'Moby Dock', organization: "Docker", birth_year: 2013}
    // ];
    res.render('pages/index', {
        items: items,
        title: title
    });
}
