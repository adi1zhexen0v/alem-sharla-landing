import { firestore } from './firebase.js';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const collectionRef = collection(firestore, 'feedback');

export const addFeedback = async (name, contact, message) => {
	try {
		const feedbackData = {
			name,
			contact,
			message,
			createdAt: Timestamp.now(),
			status: 'new'
		};
		await addDoc(collectionRef, feedbackData);
	} catch (error) {
		console.log('Error: ', error);
	}
};
