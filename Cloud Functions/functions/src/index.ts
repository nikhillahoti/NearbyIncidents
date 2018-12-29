import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

exports.onIncidentAdded = 
    functions.database.ref("/events/{id}")
        .onCreate((snapshot, context)  => {
            let newIncidentId = context.params.id;
            
            console.log("New Incident Id is " + newIncidentId);
            
            let incidentLocation = admin.database().ref('/incident-location/Lenzen Avenue/');
            return incidentLocation.child('incidents').push().set(newIncidentId);
        });