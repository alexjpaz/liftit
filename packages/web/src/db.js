import PouchDB from 'pouchdb';
const db = new PouchDB("liftit"); 

if(window) {
  window.liftit = window.liftit || {};
  window.liftit.db = db;
}

export default db;
