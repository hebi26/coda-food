import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.startup(() => {
  // code to run on server at startup
    // bootstrap the admin user if they exist -- You'll be replacing the id later
    if (Meteor.users.findOne("rtkgRZdRJWLyQyB2H")) {
        Roles.addUsersToRoles("rtkgRZdRJWLyQyB2H", ['admin']);
    }
});

Meteor.methods({

    'commander'(username, codepost, adress, cmd, total, status) {
            check(username, String);
            check(codepost, String);
            check(adress, String);
            check(status, String);

            if (!Meteor.userId()) {    //on verifie que l'user est bien connecté et en base
                throw new Meteor.Error('not-authorized');
            }

        Commandes.insert({
            userId: Meteor.userId(),
            username: username,
            codepost: codepost,
            adress: adress,
            commande: cmd,
            total: total,
            status: status,
            createdAt : new Date(),
        })
    },

    'archiver'(_id){
        Commandes.update(_id, {$set:{status: "livraison effectué", createdAt : new Date()}});
    },

    'updateproducts'(_id, name, image, price, categorie, description){
        Products.update(_id, {$set:{image: image, name: name, description: description, price: price, categorie: categorie}});
    },

    'deleteproducts'(_id){
        Products.remove(_id);
    },

    'addproducts'(image, name, description, price, categorie) {
        check(image, String);
        check(name, String);
        check(description, String);
        check(price, String);
        check(categorie, String);

        Products.insert({
            image: image,
            name: name,
            description: description,
            price: price,
            categorie: categorie

        })
    },

    'addcategories'(categorie, image){
        check(image, String);
        check(categorie, String);

        Categories.insert({
            name: categorie,
            image: image
        })
    },

    'updatecatforproducts'(currentcat, namecat) {
        check(namecat, String);


        Products.find({}).forEach(function (currentcat) {
            Products.update({_id: currentcat._id}, {$set: {'categorie': namecat}});
        });
    },
    'updatecat'(_id, namecat, imagecat){
        check(namecat, String);
        check(imagecat, String);

        Categories.update(_id, {$set: {'name':namecat, 'image':imagecat}});
    },

    'deleteproductsforcat'(currentcat){
        Products.find({}).forEach(function () {
            Products.remove({'categorie': currentcat});
        });
    },

    'deletecat'(_id){
        Categories.remove(_id);
    }
});

