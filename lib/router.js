Router.configure({
    layoutTemplate: 'mainlayout'
});

Router.route('/', {
    name: 'categorie'
});

Router.route('/pizza', {
    name: 'pizza'
});

Router.route('/burger', {
    name: 'burger'
});

Router.route('/salade', {
    name: 'salade'
});

Router.route('/boisson', {
    name: 'boisson'
});

Router.route('/dessert', {
    name: 'dessert'
});

Router.route('/panier', {
    name: 'panier'
});