Meteor.publish('categories', function() {
    return Categories.find();
});

Meteor.publish('products', function() {
    return Products.find();
});

Meteor.publish('commandes', function() {
    return Commandes.find();
});