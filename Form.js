var firebaseConfig = {
    
    
    
    //    PUT YOUR KEYS HERE


  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var db = firebase.firestore();
  var files= [];

var imgName;
var artistName ;
var imgUrl;
function handleSubmit(){
   files =document.getElementById('Photo').files;
    imgName = document.getElementById('name').value;
    artistName = document.getElementById('artistName').value;
   var uploadTask = firebase.storage().ref('Images/'+imgName+'.jpg').put(files[0]);
   uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function(snapshot){
       var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
       console.log('Upload is ' + progress + '% done');
   },
   function(error){
    alert('error in upload , try again!');
},
function(){
    // Upload completed successfully, now we can get the download URL
    uploadTask.snapshot.ref.getDownloadURL().then(function(url){
    imgUrl = url;
    handleData();
    }
   );
});
}
function handleData(){
    db.collection("photos").add({
        Name: imgName,
        Artist: artistName,
        imgUrl: imgUrl
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        alert('Image added Successfully');
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
        
    });
}

function retriveData(){
    var dataRef =  db.collection("photos");
    dataRef.get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            console.log(doc.data());
        })
        }).catch(function(error) {
            console.log("Error getting document:", error); 
    });
}
