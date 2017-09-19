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
    'commander'(username, codepost, adress, cmd, total) {
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
            total: total,
            createdAt : new Date(),
        })
    }

});

