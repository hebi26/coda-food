import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
    'commander'(username, codepost, adress, cmd) {
            check(username, String);
            check(codepost, String);
            check(adress, String);

            if (!Meteor.userId()) {    //on verifie que l'user est bien connecté et en base
                throw new Meteor.Error('not-authorized');
            }

        Commandes.insert({
            userId: Meteor.userId(),
            username: username,
            codepost: codepost,
            adress: adress,
            commande: cmd,
            createdAt : new Date(),
        })
    }

});

