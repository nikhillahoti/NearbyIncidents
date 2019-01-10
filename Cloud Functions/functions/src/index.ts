import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

exports.onIncidentAdded =
    functions.database.ref("/events/{incidentID}")
        .onCreate((snapshot, context)  => {
            const newIncidentID = context.params.incidentID;

            console.log("New Incident Id is " + newIncidentID);
            const newIncidentRef = admin.database().ref('/events/' + newIncidentID);
            return newIncidentRef.once('value')
                .then(snap => {
                const incidentLocationRef = admin.database().ref('/incident-location');
                return incidentLocationRef.child(snap.child('locationID').val()).child('incidents').push(newIncidentID)
                            .then(() => {
                            return incidentLocationRef.child(snap.child('locationID').val()).child('users').orderByValue().equalTo(snap.child('userID').val())
                                .once('value', childDetails => {
                                    if(childDetails.exists()){
                                        console.log("User Already exist");
                                        return Promise.resolve();
                                    }
                                    else{
                                        console.log("User Not present");
                                        return incidentLocationRef.child(snap.child('locationID').val()).child('users').child(snap.child('userID').val()).set(snap.child('userID').val());
                                    }
                                })
                            
            
                            })
                })
                .catch(console.log);
          
        });
 
exports.notifyUser =
    functions.database.ref('/incident-location/{location}/incidents/{incidentId}')
        .onCreate((snapshot, context) => {
            console.log("Inside of Here Nikhil");
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
