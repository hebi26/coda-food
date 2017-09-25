Router.configure({
    layoutTemplate: 'mainlayout'
});
// =================ROUTER DAFFICHAGE PRODUCTS EN FONCTION DE LA CATEGORIE=========
// Router.route('/products/:name', {
//     name:'display',
//     data: function () {
//         return {produits: Products.find({'categorie': this.params.name})}
//     }
// });

Router.route('/products/:name', function() {
    let categorie = this.params.name;
    Meteor.subscribe('products');
    this.render('display', {
        data: function() {
            return { produits: Products.find({categorie: categorie}) }
        }
    })
});


Router.route('/panier', function(){
    this.render('panier');
});

Router.route('/', function(){
    Meteor.subscribe('categories');
    this.render('cat');

});

Router.route('/admin', function(){
    this.render('admin');

    if(!Roles.userIsInRole(Meteor.user(), ['admin'])) {
        console.log('redirecting');
        this.redirect('/');
    }
});

