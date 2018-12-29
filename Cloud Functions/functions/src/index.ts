import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

exports.onIncidentAdded = 
    functions.database.ref("/events/{incidentID}")
        .onCreate((snapshot, context)  => {
            let newIncidentID = context.params.incidentID;
            
            console.log("New Incident Id is " + newIncidentID);
            
            let incidentLocation = admin.database().ref('/incident-location/Lenzen Avenue/');
            return incidentLocation.child('incidents').push().set(newIncidentID);
        });

exports.notifyUser = 
    functions.database.ref('/incident-location/{location}/incidents/{incidentId}')
        .onCreate((snapshot, context) => {
            let usersRef = admin.database().ref('/incident-location/' + context.params.location + "/users")
            return usersRef.once('value').then((userSnapshot) => {
                let userR = userSnapshot.val();
                let userDetailsRef = admin.database().ref(`/users/${userR}/deviceId/token`);
                return userDetailsRef.once('value').then((token) => {
                    const payload = {
                        notification: {
                            title: 'Nearby Incidents',
                            body: 'Incident took place on Lenzen Avenue'
                        }
                    }
                    return admin.messaging().sendToDevice(token.val(), payload);
                });
            })
        });