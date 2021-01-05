/**
 * ! User Creation Into Database
 *
 * This is where a new user can be created to store into the database
 */

const admin = require('firebase-admin');


// Import firestore into the file
require('firebase/firestore');

// Create a global variable for firestore
const db = admin.firestore();

/**
 * Creates a new user and stores it in the database
 * @param {admin.auth.UserRecord} user UserRecord object
 * @returns {Promise<admin.auth.UserRecord>} The updated user record
 */
module.exports = function createUser(user) {
    // Return a promise so that error can be handled easily
    return new Promise(async (resolve, reject) => {
        if (user == undefined || user == null) reject('User object not provided!');

        // Firebase timestamp system
        const { serverTimestamp } = admin.firestore.FieldValue;

        try {
            // Create a reference to the collection named 'users' in the database
            const userRef = db.collection('users');

            // Create the user data
            let userData = {
                uid         : user.uid,
                email       : user.email,
                displayName : user.displayName || user.email,
                providers   : user.providerData.map(provider => provider.providerId),
                createdAt   : serverTimestamp()
            };


            userRef
                .doc(user.email) // get or create a user using it's email
                .set(userData) // set the data in instead of creating a new one to prevent duplicates
                .then(userRecord => {
                    resolve(userRecord);
                })
                .catch(err => {
                    throw err;
                });
        } catch (err) {
            reject(err);
        }
    });
};