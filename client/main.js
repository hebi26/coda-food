import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';


// ====================DISPLAY=============================
// =========================FORM=========================
// ==========EVENT=======================
Template.form.events({
    'submit .additem'(event) {
        event.preventDefault();

        nameitem = this.name;
        priceitem = this.price;
        nbitem = parseInt(event.target.nbitem.value);

        // INSERTION DANS LA COLLECTION LOCALE PANIER
        if (nbitem > 0) {
            Panier.insert({
                nameitem: nameitem,
                priceitem: priceitem,
                nbitem: nbitem,
                totalprice: priceitem * nbitem,
                createdAt: new Date(),
            });
        }
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
            status = "en cours";

        // VERIF CODEPOST
            if(tabcodepost.includes(codepost)) {
                Meteor.call('commander', username, codepost, adress, cmd, total, status);
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
    },
    'isconnected':function(){
        if (Meteor.userId()){
            return true;
        }
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
    Meteor.subscribe('products');
    Meteor.subscribe('categories');
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
    },
    'click .btnadd':function(){
        Session.set('addform', true);
    },
    'submit .addData'(event){
        event.preventDefault();
        name=event.target.nameitem.value;
        image=event.target.imgitem.value;
        price=event.target.priceitem.value;
        categorie=event.target.catitem.value;
        description=event.target.describeitem.value;
        Meteor.call('addproducts', image, name, description, price, categorie);
        catexists = Categories.find({name: categorie}, {limit: 1}).count() > 0;
        if(!catexists){
            Meteor.call('addcategories', categorie, image);
        }
        Session.set('addform', false);
    },
    'click .option1':function(){
        Session.set('option1', true);
        Session.set('option2', false);
    },
    'click .option2':function(){
        Session.set('option2', true);
        Session.set('option1', false);
    },

    'click .addreturn':function(){
        Session.set('addform', false);
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
    'listcommandes':function(){
        return Commandes.find({status : "en cours"});
    },
    'cmdisempty': function(){
        if(Commandes.find({status : "en cours"}).count() ===0){
            return true;
        }
    },
    'islogclicked':function(){
        return Session.get('btnlog');
    },
    'isdelivered':function(){
        return Commandes.find({status: "livraison effectué"});
    },
    'totalrecettes':function(){
        totalrecettes = Commandes.find({status : "livraison effectué"}).sum('total');
        return totalrecettes;
    },
    'isdataclicked':function(){
        return Session.get('btndata');
    },
    'listdata':function(){
        return Products.find();
    },
    'addisclicked':function(){
        return Session.get('addform');
    },
    'option1clicked':function(){
        return Session.get('option1');
    },
    'option2clicked':function(){
        return Session.get('option2');
    },
    'listcat':function(){
        return Categories.find();
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
// --------------EVENTS-------------------

Template.commandes.events({
    'click .btnarchive':function(){
        Meteor.call('archiver', this._id );
        Session.set('archived'+this._id, true);
    }
})
// ===================DATA===========================

Template.data.events({
    'click .btnchangedata':function(){
        Session.set('datachange'+this._id, true);
    },
    'submit .changedata'(event){
        event.preventDefault();
        name=event.target.nameitem.value;
        image=event.target.imgitem.value;
        price=event.target.priceitem.value;
        categorie=event.target.catitem.value;
        description=event.target.describeitem.value;

        Meteor.call('updateproducts', this._id, name, image, price, categorie, description);

        catexists = Categories.find({name: categorie}, {limit: 1}).count() > 0;

        if(!catexists){
            Meteor.call('addcategories', categorie, image);
        }
        Session.set('datachange'+this._id, false);
    },

    'click .btndeletedata':function(){
        Meteor.call('deleteproducts', this._id);
    }
});
Template.data.helpers({
    'btnchangedataclicked':function(){
        return Session.get('datachange'+this._id);
    }
});
// ==========================CATEGORIE=================================
Template.cat.helpers({
    'listcat':function(){
        return Categories.find();
    }
});
// ========================DATACAT==================================
    // --------------------EVENTS-------------------------
    Template.datacat.events({
        'click .btnchangedata': function () {
            Session.set('datachange' + this._id, true);
        },
        'submit .changedatacat'(event){
            event.preventDefault();
            currentcat = Categories.findOne(this._id, {fields:{name: 1}});
            currentcat = currentcat.name;
            namecat=event.target.nameitem.value;

            Meteor.call('updatecatforproducts', currentcat, namecat);

            Session.set('datachange' + this._id, false);
        },

        'click .btndeletedata':function(){
            Meteor.call('deletecategories');
        }


    });

    // -----------------------HELPERS--------------------------
Template.datacat.helpers({
    'btnchangedataclicked':function(){
        return Session.get('datachange'+this._id);
    }
})