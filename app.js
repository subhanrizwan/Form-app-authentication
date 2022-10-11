
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  deleteUser
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";


import {
  doc,
  setDoc,
  getDoc,
  getFirestore,
  //  getDoc,
  // collection,
  // query,
  // where,
  // getDocs,
  // addDoc,
  // onSnapshot,
  // orderBy,
  // updateDoc,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";


const firebaseConfig = {
  apiKey: "AIzaSyDSKqwXhNU28swc4oott83typxvkoipxK0",
  authDomain: "form-application-584e3.firebaseapp.com",
  projectId: "form-application-584e3",
  storageBucket: "form-application-584e3.appspot.com",
  messagingSenderId: "941421868512",
  appId: "1:941421868512:web:6ba8767d18abc079eaa785",
  measurementId: "G-QN7VX1X69X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

let reg = document.getElementById('Register')

reg.addEventListener("click", function () {

  // let Name= document.getElementById('Name') 
  let name = document.getElementById('reg-Name')
  let fName = document.getElementById('reg-fatherName')
  let number = document.getElementById('reg-num')
  let email = document.getElementById('reg-email')
  let pass = document.getElementById('reg-pass')
  let regfiles = document.getElementById('reg-file')
  // let profile = document.getElementById('profile')


  var name1 = /^[a-zA-Z ]+$/.test(name.value)
  var name2 = /^[a-zA-Z ]+$/.test(fName.value);
  var number2 = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/.test(number.value)
  var email2 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)
  var password2 = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(pass.value)
  if (name1) {
    if (name2) {
      if (number2) {
        if (email2) {
          if (password2) {
            if (regfiles) {
            } else { swal("invalid file") }
          } else { swal("invalid password") }
        } else { swal("invalid email") }
      } else { swal("invalid number") }
    } else { swal("invalid father name") }
  } else { swal("invalid name") }
 
  createUserWithEmailAndPassword(auth, email.value, pass.value)
    .then(async (userCredential) => {

      let load =document.getElementById('loader-reg')
      load.style.display = 'block'
      let disab = document.getElementById('Register')
      disab.style.display = 'none' 
      let load1 = document.getElementById('img_Reg')
      load1.style.marginTop = '25px'

      // Signed in 
      const user = userCredential.user;
      //     console.log("Registered");   

      // await setDoc(doc(db, "user", user.uid), {
      //   name:name.value,
      //   fname:fName.value,
      //   number:number.value,
      //   email:email.value,
      //   pass:pass.value,
      // }); 

      const storage = getStorage();
      let myFile = document.getElementById("reg-file");
      let file = myFile.files[0];
      console.log(file);
      console.log(file.name);

      const storageRef = ref(storage, `users/${user.uid}.jpg`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
          console.log(uploadTask);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log('File available at', downloadURL);
            let url = await downloadURL;
            console.log(url);


            await setDoc(doc(db, "user", user.uid), {
              name: name.value,
              fname: fName.value,
              number: number.value,
              email: email.value,
              pass: pass.value,
              profile: url,

            });

            let load_reg = document.getElementById('loader-reg')
            load_reg.style.display = 'none'
            let disab = document.getElementById('Register')
            disab.style.display = 'block' 

            swal("Registered","you have registered", "success");

            let nam= document.getElementById('reg-Name').value = ""
            let fNam = document.getElementById('reg-fatherName').value = ""
            let numbe = document.getElementById('reg-num').value = ""
            let emai = document.getElementById('reg-email').value = ""
            let pas = document.getElementById('reg-pass').value = ""
            let regfiles = document.getElementById('reg-file').value = ""

          });
        }

      );

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error", error);

      setTimeout(()=>{
        let load_reg1 = document.getElementById('loader-reg')
        load_reg1.style.display = 'none'
      },2000)
      // let load_reg1 = document.getElementById('loader-reg')
      // load_reg1.style.display = 'none'
      swal("Sorry!","Email Already use!", "error");
      // ..
    });

});


let login = document.getElementById('Login-user')
login.addEventListener("click", function () {

  let login_email = document.getElementById('login-email')
  let login_pass = document.getElementById('login-pass')


  signInWithEmailAndPassword(auth, login_email.value, login_pass.value)
    .then(async (userCredential) => {
      // Signed in 
      let btn = document.getElementById('main-cont')
      btn.style.display = 'none'

      let loader = document.getElementById('loader')
      loader.style.display = 'block'

      const user = userCredential.user;
      const docRef = doc(db, "user", user.uid);
      const docSnap = await getDoc(docRef);

      // window.location = 'card.html'
      if (docSnap.exists()) {
        console.log("User Data:", docSnap.data());

        let img = document.getElementById('profile')
        img.src = docSnap.data().profile;

        let name_user = document.getElementById('name')
        name_user.innerHTML = `<h1>${docSnap.data().name}</h1>`

        let fname_user = document.getElementById('father')
        fname_user.innerHTML = `<h6>${docSnap.data().fname}</h6>`

        let p_num_user = document.getElementById('p-num')
        p_num_user.innerHTML = `<h6>${docSnap.data().number}</h6>`

        let email_user = document.getElementById('email')
        email_user.innerHTML = `<h6>${docSnap.data().email}</h6>`


        let btn1 = document.getElementById('container2')
        btn1.style.display = 'block'
      
        let cont = document.getElementById('main-cont')
        cont.style.height = '65%'
        let cont1 = document.getElementById('main-cont')
        cont1.style.backgroundColor = '#ffff'

        let loader1 = document.getElementById('loader')
        loader1.style.display = 'none'

        // //     const auth = getAuth();
        // // onAuthStateChanged(auth, () => {
        // //   if (docSnap) {
        // //     const uid = user.uid;
        // //     console.log(uid);
        // //     let main = document.getElementById('main-cont')
        // //     main.style.display='none'
        // //     // let main1 = document.getElementById('container2')
        // //     // main1.style.display = 'block'
        //  } else {
        //  console.log("not working");
        // }
        // });


      } else {
        console.log("No such document!");
        
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error);
      // if(!docSnap.exists){
        swal("Sorry!","User Not Found!", "error");
      // }
    });


})

let logout = document.getElementById('log_out')
logout.addEventListener("click",()=>{
  const auth = getAuth();
  const user = auth.currentUser;
  console.log(user);
  console.log(user);
  deleteUser(user).then(() => {

  let main_card = document.getElementById('container2')
  main_card.style.display = 'none'
  
    let load = document.getElementById('loader')
  load.style.display = 'block'

setTimeout(function log_out(){
  
  let main_cont = document.getElementById('main-cont')
  main_cont.style.display = 'block'


  let load1 = document.getElementById('loader')
  load1.style.display = 'none'

  let main_cont1 = document.getElementById('main-cont')
  main_cont1.style.backgroundColor = 'rgb(41, 39, 39)'
  let cont2 = document.getElementById('main-cont')
  cont2.style.height = '85%'

  

  let pas = document.getElementById('login-pass')
  pas.value = ""

 },1000)



  }).catch((error) => {
    // An error ocurred
    // ...
  });
})



// let log_out = () => {

//   let main_card = document.getElementById('container2')
//   main_card.style.display = 'none'

//   let load = document.getElementById('loader')
//   load.style.display = 'block'

  
// setTimeout(function log_out(){
  
//   let main_cont = document.getElementById('main-cont')
//   main_cont.style.display = 'block'


//   let load1 = document.getElementById('loader')
//   load1.style.display = 'none'

//   let main_cont1 = document.getElementById('main-cont')
//   main_cont1.style.backgroundColor = 'rgb(41, 39, 39)'
//   let cont2 = document.getElementById('main-cont')
//   cont2.style.height = '85%'

  

//   let pas = document.getElementById('login-pass')
//   pas.value = ""

//  },1000)
  

 

// }
// window.log_out = log_out

