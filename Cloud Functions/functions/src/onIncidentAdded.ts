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
