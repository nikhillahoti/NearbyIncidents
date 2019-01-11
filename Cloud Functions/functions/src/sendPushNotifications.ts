import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

exports.notifyUser =
    functions.database.ref('/incident-location/{location}/incidents/{incidentId}')
        .onCreate((snapshot, context) => {
            console.log("Inside notifyUsers function ->");
            console.log("Location Id -> " + context.params.location);
            console.log("Incident Id -> " + context.params.incidentID);
            const usersRef = admin.database().ref('/incident-location/' + context.params.location + "/users")
            return usersRef.once('value').then((userSnapshot) => {
                
                let notifications = []
                for(var key in userSnapshot.val()){
                    const userR = key;
                    const userDetailsRef = admin.database().ref(`/users/${userR}/deviceId/token`);
                    const incidentDetailsRef = admin.database().ref(`/events/${snapshot.val()}/description`);
                    notifications.push(userDetailsRef.once('value').then((token) => {
                        return incidentDetailsRef.once('value')
                            .then((incidentDetails) => {
                                const payload = {
                                    notification: {
                                        title: 'Nearby Incidents',
                                        body: incidentDetails.val()
                                    }
                                }
                                return admin.messaging().sendToDevice(token.val(), payload);
                            });
                    }));
                }
                return Promise.all(notifications);
            })
        });
