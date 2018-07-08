export const initFirebaseDatabaseRef = async (firebase) => {
  return new Promise((resolve, reject) => {
    const setFirebaseDatabaseRef = (user) => {
      const prefix = "liftit_v2";
      const suffix = "workbooks/__default__";
      if (user) {
        const firebaseDatabaseRef = firebase.database().ref(`${prefix}/users/${user.uid}/${suffix}`);

        resolve(firebaseDatabaseRef);
      } else {
        console.log("Ther is no user session. You must log in");
        reject();
      }
    }

    if(firebase.auth().currentUser) {
      setFirebaseDatabaseRef(firebase.auth().currentUser);
      return;
    } else {
      firebase.auth().onAuthStateChanged(setFirebaseDatabaseRef);
    }
  });

};
