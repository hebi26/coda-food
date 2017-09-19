import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

// ====================PIZZA==================
// ------------SUSCRIBE-----------------------
Template.pizza.onCreated(function() {
    Meteor.subscribe('pizzas');
})
// -----------------HELPERS----------------
Template.pizza.helpers({
    'listpizza':function(){
        return Pizzas.find();
    }
})// --------delete-----------------------

// ===================BURGER========================
// --------------SUSCRIBE----------------
Template.burger.onCreated(function() {
    Meteor.subscribe('burgers');
})
// -----------------------HELPERS---------
Template.burger.helpers({
    'listburger':function(){
        return Burgers.find();
    }
})
// ===================SALADE===============================
// -------------SUSCRIBE---------------------
Template.salade.onCreated(function() {
    Meteor.subscribe('salades');
})
// --------------HELPERS-------------------------------
Template.salade.helpers({
    'listsalade':function(){
        return Salades.find();
    }
})
// ====================BOISSON=============================
// ---------------------SUSCRIBE-----------------------------
Template.boisson.onCreated(function() {
    Meteor.subscribe('boissons');
})
// ---------------------HELPERS-----------------------
Template.boisson.helpers({
    'listboisson':function(){
        return Boissons.find();
    }
})
// =======================DESSERT===========================
// -----------------------SUSCRIBE--------------------------
Template.dessert.onCreated(function() {
    Meteor.subscribe('desserts');
})
// -----------------------HELPERS-----------------------------
Template.dessert.helpers({
    'listdessert':function(){
        return Desserts.find();
    }
})
// =========================FORM=========================
// ==========EVENT=======================
Template.form.events({
    'submit .additem'(event) {
        event.preventDefault();

            nameitem = this.name;
            priceitem = this.price;
            nbitem = parseInt(event.target.nbitem.value);

            // INSERTION DANS LA COLLECTION LOCALE PANIER
            Panier.insert({
                nameitem: nameitem,
                priceitem: priceitem,
                nbitem: nbitem,
                totalprice: priceitem * nbitem,
                createdAt: new Date(),
            });
        }
})
// ======================PANNIER==============================
// -----------------------SUSCRIBE-------------------------
Template.panier.onCreated(function() {
    Meteor.subscribe('commandes');
    Meteor.subscribe('panier');
})
// ==========EVENT=======================
//             SET VAR SESSION AFFICHAGES
Template.panier.events({
    'click .btnpanier':function(){
        Session.set('valid', true);
    },

    'click .update':function(){
        Session.set('inupdate'+this._id, true);
    },

    // CONFIRMATION COMMANDE
    'submit .validate'(event){
        event.preventDefault();
        Session.set('valid', false);


            tabcodepost =["30480", "30 480", "30520", "30 520", "30140", "30 140", "30340", "30 340", "30380", "30 380", "30110", "30 110", "30560", "30 560", "30360", "30 360", "30100", "30 100"];
            username= event.target.username.value;
            codepost= event.target.codepost.value;
            adress= event.target.adress.value;
            cmd = Panier.find({}).fetch();
            total = Panier.find().sum('totalprice');

        // VERIF CODEPOST
            if(tabcodepost.includes(codepost)) {
                Meteor.call('commander', username, codepost, adress, cmd, total);
                Panier.remove({});
                Session.set('comand', true);
                Session.set('errorcmd', false);
            }
            else{
                Session.set('errorcmd', true);
                Session.set('comand', false);
            }
    },

    // SESSION SET BOUTTON RETOUR
    'click .retourbtn':function(){
        Session.set('comand', false);
        Session.set('valid', false);
        Session.set('errorcmd', false);
    },

    // --------delete-----------------------
    'click .delete':function(){
        Panier.remove(this._id);
    }
})

// =================HELPERS===================

Template.panier.helpers({

    'listitem': function () {
        return Panier.find();
    },
    // CALCUL TOTAL PANIER
    'total': function () {
        total = 0;
        Panier.find({}, {fields:{totalprice:1}}).map(function(doc) {
            total += doc.totalprice;
        });
        return total;
    },

    // SESSION GET
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
// ==========EVENT=======================
Template.formpanier.events({  //ON UPDATE LE PANIER
    'submit .updatepanier'(event){
        event.preventDefault();
        nbitem = parseInt(event.target.nbitem.value);
        totalprice= this.priceitem*nbitem;
        Panier.update(this._id, {$set:{nbitem: nbitem, totalprice: totalprice}});
        Session.set('inupdate'+this._id, false);
    }
})

// ==============ADMIN VIEW=================================
// -----------------SUSCRIBE---------------------------
Template.admin.onCreated(function() {
    Meteor.subscribe('commandes');
});
// -------------------EVENTS----------------------------
Template.admin.events({
    // SESSION SET POUR LES 3 VUES
    'click #btncmd':function(){
        Session.set('btncmd', true);
        Session.set('btnlog', false);
        Session.set('btndata', false);
    },
    'click #btnlog':function(){
        Session.set('btncmd', false);
        Session.set('btnlog', true);
        Session.set('btndata', false);
    },
    'click #btndata':function(){
        Session.set('btncmd', false);
        Session.set('btnlog', false);
        Session.set('btndata', true);
    }
});
// ----------------------HELPERS----------------------
Template.admin.helpers({
    // check if user is an admin
    'isAdminUser': function() {
        return Roles.userIsInRole(Meteor.user(), ['admin']);
    },
    'iscmdclicked':function(){
        return Session.get('btncmd');
    },
    'islogclicked':function(){
        return Session.get('btnlog');
    },
    'isdataclicked':function(){
        return Session.get('btndata');
    },
    'listcommandes':function(){
        return Commandes.find({});
    }
});

// ======================HEADER=====================================

Template.header.helpers({
    'isadmin':function(){
        if (Roles.userIsInRole(Meteor.user(), ['admin'])){     // VERIF SI ADMIN
            return true;
        }
        else if(!Meteor.loggingIn()){
            return false;
        }
        else{
            return false;
        }
    }
})
// =================COMMANDES================================
// --------------------HELPERS--------------------
Template.commandes.helpers({
    'commande':function() {                 // ON VEUT RECUPERER LES OBJETS DE LA TABLE COMMANDE DU FIELD commande, ex: commande[{nameitem}]
        return Commandes.find({}, 'commande'.nameitem);

    }
})


