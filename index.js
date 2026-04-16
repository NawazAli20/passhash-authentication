import bcrypt from 'bcryptjs';
import jwt from "jwt-simple";


const secret = "secretpassword";
const payload = { username: "nawaz" };

// Create a JWT
const token = jwt.encode(payload, secret);
console.log("Token: " + token);


// store at the user side at the browser cache after receiving the res.json() response//
//localStorage.setItem("token",token); 
//localStorage.getItem("token");    // read
//localStorage.removeItem("token"); // delete
//localStorage.clear();             // remove all

// Decode a JWT
const decoded = jwt.decode(token, secret);
console.log("Decoded payload: " + decoded.username);



// Generate 3 hashes for the same password
const password = "ThisIsNotAVeryGoodPassword";
for (let c = 0; c < 3; c++) {
   let hash = bcrypt.hashSync(password, 12); //iterations: 2^12 round hash computation
   console.log("Hash: " + hash);
}

// Compare hash produced by identical passwords
const passwordHash = bcrypt.hashSync(password, 10);
if (bcrypt.compareSync(password, passwordHash)) {
   console.log("It is the Same password");
}
else {
   console.log("Not the same");
}