
  // db;
  // constructor() {
  //   const firebaseConfig = {
  //     apiKey: "AIzaSyD09nDzD73ieZzOvpLTj2H5nL9Ncrn9bVg",
  //     authDomain: "myntra-codeathon.firebaseapp.com",
  //     projectId: "myntra-codeathon",
  //     storageBucket: "myntra-codeathon.appspot.com",
  //     messagingSenderId: "796268558165",
  //     appId: "1:796268558165:web:4dcc91ef4727dbeec0e1dc",
  //     measurementId: "G-3N3QT2B8GB",
  //   };

  //   firebase.initializeApp(firebaseConfig);
  //   this.db = firebase.firestore();
  // }

  async function createUserDetails(uid, name,email) {
    await this.db
      .collection("users")
      .doc(uid)
      .update({
        name: name,
        email: email
      })
      .catch((e) => console.error(e));
  }

  async function getUserDetails(uid) {
    await this.db
      .collection("users")
      .doc(uid)
      .get()
      .then((doc) => {
        let data = doc.data();
        return data;
      });
  }

  async function createPopularPost(community_name, content, uid) {
    let userDetails = await this.getUserDetails(uid);
    let userName = userDetails.name;
    await this.db
      .collection("popular_posts")
      .add({
        community_name: community_name,
        sender_name: userName,
        time: firebase.firestore.FieldValue.serverTimestamp(),
        content: content,
        upvotes: 0,
        downvotes: 0,
        uid: uid,
        comments: [],
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  async function getPopularPosts() {
    let response = [];
    const collectionRef = this.db.collection("popular_posts");
    await collectionRef
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let docId = doc.id;
          let docData = doc.data();
          let docResponse = {
            community_name: docData.community_name,
            sender_name: docData.sender_name,
            time: docData.time,
            content: docData.content,
            upvotes: docData.upvotes,
            downvotes: docData.downvotes,
            doc_id: docId,
            uid: uid,
            comments: docData.comments,
          };
          response.push(docResponse);
        });
        return response;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // The option to update a post on frontend will appear only if the uid of user matches with the docData.uid, i.e the "uid" field present in the doc data
  async function updatePopularPost(docId, content) {
    await this.db
      .collection("popular_posts")
      .doc(docId)
      .update({
        content: content,
      })
      .then(() => {
        console.log("Document updated");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  // The option to delete a post on frontend will appear only if the uid of user matches with the docData.uid, i.e the "uid" field present in the doc data
  async function deletePopularPosts(docId) {
    await this.db
      .collection("popular_posts")
      .doc(docId)
      .delete()
      .then(() => {
        console.log("Document deleted successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function addCommentsToPost(docId, uid, content) {
    let userDetails = await this.getUserDetails(uid);
    let userName = userDetails.name;
    await this.db
      .collection("popular_posts")
      .doc(docId)
      .update({
        comments: firebase.firestore.FieldValue.arrayUnion({
          uid: uid,
          name: userName,
          content: content,
          time: firebase.firestore.FieldValue.serverTimestamp(),
        }),
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async function upvotePost(docId, upvotes) {
    await this.db.collection("popular_posts").doc(docId).update({
      upvotes: ++upvotes,
    });
  }

  async function downvotePost(docId, downvotes) {
    await this.db.collection("popular_posts").doc(docId).update({
      downvotes: ++downvotes,
    });
  }

  /*
  

      Group posts functions below
  
  
  */

  async function createGroup(uid, name) {
    await this.db
      .collection("groups")
      .where("name", "==", name)
      .get()
      .then(async (querySnapshot) => {
        if (querySnapshot.size > 0) {
          return "failue";
        } else {
          await this.db
            .collection("groups")
            .add({
              name: name,
              admin_uid: uid,
              time: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then(() => {
              return "success";
            });
        }
      });
  }

  async function getGroups() {
    let response = [];
    const collectionRef = this.db.collection("groups");
    await collectionRef
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let docId = doc.id;
          let docData = doc.data();
          let docResponse = {
            name: docData.name,
            admin_uid: docData.admin_uid,
            time: docData.time,
            doc_id: docId,
          };
          response.push(docResponse);
        });
        return response;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function getGroupPosts(docId) {
    let response = [];
    const collectionRef = this.db
      .collection("groups")
      .doc(docId)
      .collection("posts");
    await collectionRef
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let docId = doc.id;
          let docData = doc.data();
          let docResponse = {
            community_name: docData.community_name,
            sender_name: docData.sender_name,
            time: docData.time,
            content: docData.content,
            upvotes: docData.upvotes,
            downvotes: docData.downvotes,
            doc_id: docId,
            uid: uid,
            comments: docData.comments
          };
          response.push(docResponse);
        });
        return response;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function createGroupPost(community_name, sender_name, content, uid, docId) {
    await this.db
      .collection("groups")
      .doc(docId)
      .collection("posts")
      .add({
        community_name: community_name,
        sender_name: sender_name,
        time: firebase.firestore.FieldValue.serverTimestamp(),
        content: content,
        upvotes: 0,
        downvotes: 0,
        uid: uid,
        comments: [],
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  async function updateGroupPost(docId, postdocId, content) {
    await this.db
      .collection("groups")
      .doc(docId)
      .collection("posts")
      .doc(postdocId)
      .update({
        content: content,
      })
      .then(() => {
        console.log("Document updated");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  async function deleteGroupPosts(docId, postdocId) {
    await this.db
      .collection("groups")
      .doc(docId)
      .collection("posts")
      .doc(postdocId)
      .delete()
      .then(() => {
        console.log("Document deleted successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function addCommentsToGroupPost(docId, postdocId, uid, content) {
    let userDetails = await this.getUserDetails(uid);
    let userName = userDetails.name;
    await this.db
      .collection("groups")
      .doc(docId)
      .collection("posts")
      .doc(postdocId)
      .update({
        comments: firebase.firestore.FieldValue.arrayUnion({
          uid: uid,
          name: userName,
          content: content,
          time: firebase.firestore.FieldValue.serverTimestamp(),
        }),
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async function upvoteGroupPost(docId, postdocId, upvotes) {
    await this.db
      .collection("groups")
      .doc(docId)
      .collection("posts")
      .doc(postdocId)
      .update({
        upvotes: ++upvotes,
      });
  }

  async function downvoteGroupPost(docId, postdocId, downvotes) {
    await this.db
      .collection("groups")
      .doc(docId)
      .collection("posts")
      .doc(postdocId)
      .update({
        downvotes: ++downvotes,
      });
  }
