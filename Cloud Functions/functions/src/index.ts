import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

exports.onIncidentAdded = 
    functions.database.ref("/events/{incidentID}")
        .onCreate((snapshot, context)  => {
            const newIncidentID = context.params.incidentID;
            
            console.log("New Incident Id is " + newIncidentID);
            
            const incidentLocation = admin.database().ref('/incident-location/Lenzen Avenue/');
            return incidentLocation.child('incidents').push().set(newIncidentID);
        });

exports.notifyUser = 
    functions.database.ref('/incident-location/{location}/incidents/{incidentId}')
        .onCreate((snapshot, context) => {
            
            const usersRef = admin.database().ref('/incident-location/' + context.params.location + "/users")
            
            return usersRef.once('value').then((userSnapshot) => {
                
                // User Id --- Need to convert it into a list and then map on it later
                const userR = userSnapshot.val();

                const userDetailsRef = admin.database().ref(`/users/${userR}/deviceId/token`);
                
                const incidentDetailsRef = admin.database().ref(`/events/${snapshot.val()}/description`);

                return userDetailsRef.once('value').then((token) => {
                    
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
                });
            })
        });