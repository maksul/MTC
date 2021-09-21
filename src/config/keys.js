export const config = {
	BEHOST: process.env.REACT_APP_BE_HOST,
	localStorageTokenId: 'asclwebsitetoken',
	firebaseApiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	firebaseAuthDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	firebaseProjectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	firebaseStorageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	firebaseMessagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	firebaseAppId: process.env.REACT_APP_FIREBASE_APP_ID,
	commentsUpdateAccessKey: process.env.REACT_APP_COMMENTS_UPDATE_ACCESS_KEY,
	contactPostAccessKey: process.env.REACT_APP_CONTACT_POST_ACCESS_KEY,
	numberOfNewsPerPage: 20,
	numberOfPressReleasesPerPage: 20,
	numberOfGalleryPerPage: 20
}