import firebaseConn from './FirebaseConnection';

const root_ref_db = firebaseConn.database().ref();
let events = root_ref_db.child('reports');

eventsObj = {}
eventsObj.post = (incident) => {
    return events.push(incident);
}

export default eventsObj;