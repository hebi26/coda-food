Router.configure({
    layoutTemplate: 'mainlayout'
});

Router.route('/pizzas', function(){
    this.render('pizza');
});

Router.route('/burgers', function(){
    this.render('burger');
});

Router.route('/salades', function(){
    this.render('salade');
});

Router.route('/boissons', function(){
    this.render('boisson');
});

Router.route('/desserts', function(){
    this.render('dessert');
});

Router.route('/panier', function(){
    this.render('panier');
});

    Router.route('/', function(){
            this.render('categorie');

            if (Roles.userIsInRole(Meteor.user(), ['admin'])){
                this.redirect('/admin');
            }
            else{
                this.redirect('/');
            }
    });

    Router.route('/admin', function(){
        this.render('admin');

            if(!Roles.userIsInRole(Meteor.user(), ['admin'])) {
                console.log('redirecting');
                this.redirect('/');
            }
    });
