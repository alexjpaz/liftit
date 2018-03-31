export async function getFirebaseInstance() {
  const MOCK_FIREBASE_ENABLED = process.env.REACT_APP_FIREBASE !== 'production' && process.env.NODE_ENV !== 'production';

  if(MOCK_FIREBASE_ENABLED) {
    return await import('./MockFirebase');
  } else {
    return await import('./firebase');
  }
};
