
//  const user = userCredential.user;
//  const docRef = doc(db, "user",user.uid);
//  const docSnap = getDoc(docRef);
//  console.log(docSnap.data());
// if (docSnap.exists()) {
    // console.log("User Data:", docSnap.data());
    // let img = document.getElementById('profile')
    // img.src = docSnap.data().profile;
    // let name_user = document.getElementById('name')
    // name_user.innerHTML = `<h1>${docSnap.data().name}</h1>`

    // let fname_user = document.getElementById('father')
    // fname_user.innerHTML = `<h6>${docSnap.data().fname}</h6>`

    // let p_num_user = document.getElementById('p-num')
    // p_num_user.innerHTML = `<h6>${docSnap.data().number}</h6>`

    // let email_user = document.getElementById('email')
    // email_user.innerHTML = `<h6>${docSnap.data().email}</h6>`



    // let btn1 = document.getElementById('container2')
    // btn1.style.display = 'block'
    // let btn = document.getElementById('main-cont')
    // btn.style.display = 'none'
    // let cont = document.getElementById('main-cont')
    // cont.style.height ='65%' 
    // let cont1 = document.getElementById('main-cont')
    // cont1.style.backgroundColor = '#ffff'

    //     const auth = getAuth();
    // onAuthStateChanged(auth, () => {
    //   if (docSnap) {
    //     const uid = user.uid;
    //     console.log(uid);
    //     let main = document.getElementById('main-cont')
    //     main.style.display='none'
    //     // let main1 = document.getElementById('container2')
    //     // main1.style.display = 'block'
    //   } else {
    //    console.log("not working");
    //   }
    // });


// }       
//  else {
//     console.log("No such document!");
// }
// // .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     console.log(error);
// });
