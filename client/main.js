import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

// ====================PIZZA==================
Template.pizza.onCreated(function() {
    Meteor.subscribe('pizzas');
})
Template.pizza.helpers({
    'listpizza':function(){
        return Pizzas.find();
    }
})
// ===================BURGER========================

Template.burger.onCreated(function() {
    Meteor.subscribe('burgers');
})
Template.burger.helpers({
    'listburger':function(){
        return Burgers.find();
    }
})
// ===================SALADE===============================
Template.salade.onCreated(function() {
    Meteor.subscribe('salades');
})
Template.salade.helpers({
    'listsalade':function(){
        return Salades.find();
    }
})
// ====================BOISSON=============================
Template.boisson.onCreated(function() {
    Meteor.subscribe('boissons');
})
Template.boisson.helpers({
    'listboisson':function(){
        return Boissons.find();
    }
})
// =======================DESSERT===========================
Template.dessert.onCreated(function() {
    Meteor.subscribe('desserts');
})
Template.dessert.helpers({
    'listdessert':function(){
        return Desserts.find();
    }
})
// =========================FORM=========================
i=0;
Template.form.events({
    'submit .additem'(event) {
        event.preventDefault();

            nameitem = this.name;
            priceitem = this.price;
            nbitem = event.target.nbitem.value;

            Panier.insert({
                nameitem: nameitem,
                priceitem: priceitem,
                nbitem: nbitem,
                createdAt: new Date(),
            });
        }
})
// ======================PANNIER==============================
Template.panier.onCreated(function() {
    Meteor.subscribe('commandes');
    Meteor.subscribe('panier');
})

Template.panier.events({
    'click .btnpanier':function(){
        Session.set('valid', true);
    },

    'click .update':function(){
        Session.set('inupdate'+this._id, true);
    },

    'submit .validate'(event){
        event.preventDefault();
        Session.set('valid', false);

            tabcodepost =["30480", "30 480", "30520", "30 520", "30140", "30 140", "30340", "30 340", "30380", "30 380", "30110", "30 110", "30560", "30 560", "30360", "30 360", "30100", "30 100"];
            username= event.target.username.value;
            codepost= event.target.codepost.value;
            adress= event.target.adress.value;
            cmd = Panier.find().fetch();

            if(tabcodepost.includes(codepost)) {
                Meteor.call('commander', username, codepost, adress, cmd);
                Panier.remove({});
                Session.set('comand', true);
                Session.set('errorcmd', false);
            }
            else{
                Session.set('errorcmd', true);
                Session.set('comand', false);
            }
    },

    'click .retourbtn':function(){
        Session.set('comand', false);
        Session.set('valid', false);
        Session.set('errorcmd', false);
    },

    'click .delete':function(){
        Panier.remove(this._id);
    }
})

Template.panier.helpers({

    'listitem': function () {
        return Panier.find();
    },

    'validation': function () {
        return Session.get('valid');
    },
    'commande': function () {
        return Session.get('comand');
    },
    'paniervide': function () {
        if (Panier.find().count() === 0) {
            return true;
        }
    },
    'isinupdate': function () {
        return Session.get('inupdate' + this._id);
    },
    'erreurcommande': function () {
        return Session.get('errorcmd');
    }
});

// ==============UPDTAEFORM===============

Template.formpanier.events({
    'submit .updatepanier'(event){
        event.preventDefault();
        nbitem = event.target.nbitem.value;
        Panier.update(this._id, {$set:{nbitem: nbitem}});
        Session.set('inupdate'+this._id, false);
    }
})

// ==============ADMIN VIEW=================================

Template.admin.helpers({
    // check if user is an admin
    'isAdminUser': function() {
        return Roles.userIsInRole(Meteor.user(), ['admin']);
    }
});

// ==================/====HEADER=====================================

Template.header.helpers({
    'getroute':function() {
        routeactuelle = Iron.controller();
    }
})



