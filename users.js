import mongoose from "mongoose"; 

const User = mongoose.model("User",{
    username:{type: String, required: true},
    passhash:{type: String, required: true},
    status:{type: String, default: "All well that ends well"}
});


export default User;
