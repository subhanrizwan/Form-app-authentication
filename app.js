  
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
  import { getAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
 } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

 
 import { doc,
   setDoc,
   getDoc,
   getFirestore,
   collection,
  query,
  where,
  getDocs,
   } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js"; 


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

reg.addEventListener("click",function(){
  
    // let Name= document.getElementById('Name') 
    let name = document.getElementById('reg-Name') 
    let fName = document.getElementById('reg-fatherName') 
    let number = document.getElementById('reg-num') 
    let email = document.getElementById('reg-email') 
    let pass = document.getElementById('reg-pass') 

    var name1=/^[a-zA-Z ]+$/.test(name.value)
    var name2= /^[a-zA-Z ]+$/.test(fName.value);
    var number2 = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/.test(number.value)
    var email2=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)   
    var password2 = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(pass.value)  
if(name1){
if(name2){
if(number2){
if(email2){
if(password2){
}else{swal("invalid password")}
}else{swal("invalid email")}
}else{swal("invalid number")}
}else{swal("invalid father name")}
}else{swal("invalid name")}

    createUserWithEmailAndPassword(auth, email.value, pass.value)
  .then(async(userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("Registered");   

await setDoc(doc(db, "user", user.uid), {
  name:name.value,
  fname:fName.value,
  number:number.value,
  email:email.value,
  pass:pass.value

}); 
let reg = document.getElementById('reg-form')
reg.style.display = 'none'
let login= document.getElementById('log-form')
login.style.display = 'block'
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("error",error);
    // ..
  });
  })

  let login = document.getElementById('Login-user')
login.addEventListener("click",function(){
    let login_email = document.getElementById('login-email') 
    let login_pass = document.getElementById('login-pass') 

    

    signInWithEmailAndPassword(auth, login_email.value, login_pass.value)
    .then(async(userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // console.log("user",user);
      const docRef = doc(db, "user",user.uid);
      const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("User Data:", docSnap.data());
// let get = docSnap.data()
let name_user = document.getElementById('name')
name_user.innerHTML = `<h1>${docSnap.data().name}</h1>`

let  fname_user = document.getElementById('father')
fname_user.innerHTML = `<h6>${docSnap.data().fname}</h6>`

let  p_num_user = document.getElementById('p-num')
p_num_user.innerHTML = `<h6>${docSnap.data().number}</h6>`

let  email_user = document.getElementById('email')
email_user.innerHTML = `<h6>${docSnap.data().email}</h6>`


    let btn1 = document.getElementById('container2')
    btn1.style.display = 'block'
    let btn = document.getElementById('main-cont')
    btn.style.display = 'none'
    let cont = document.getElementById('main-cont')
    cont.style.height ='65%' 
    let cont1 = document.getElementById('main-cont')
    cont1.style.backgroundColor = '#ffff'
   
    let user = document.getElementById('users')
    user.innerHTML = `${docSnap.data().name}`

    // getAllUsers(docSnap.data().email, docSnap.data().name);
} else{
  console.log("No such document!");
}

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error);
    });

//     const getAllUsers = async (email, currentId, currentName) => {
//       const q = query(collection(db, "users"), where("email", "!=", email));
//       const querySnapshot = await getDocs(q);
//       let users = document.getElementById("users");
//       querySnapshot.forEach((doc) => {
//         users.innerHTML += `<li>${doc.data().name} <button onclick='startChat id="chat-btn">Start Chat</button></li>`;
//       });
//     };
})

let log_out=()=>{
  console.log("helloe");
  let main_card = document.getElementById('container2')
  main_card.style.display = 'none'
  let main_cont = document.getElementById('main-cont')
  main_cont.style.display = 'block'
  let main_cont1 = document.getElementById('main-cont')
  main_cont1.style.backgroundColor='rgb(41, 39, 39)'
  let cont2 = document.getElementById('main-cont')
  cont2.style.height ='85%' 

  let pas = document.getElementById('login-pass')
pas.value = ""
  }
window.log_out = log_out


 