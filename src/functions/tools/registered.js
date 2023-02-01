//const mongoose = require("mongoose");
import mongoose from "mongoose"
//this finds the account

async function findRegistered(givenID) {
    let userAccount = await User.findOne({ userId: givenID });

    //if user not found
    if (!userAccount) {
        //create user entry in DB
        userAccount = await new User({
            _id: mongoose.Types.ObjectId(),
            userId: interaction.user.id,
            userPassword: "Password123",
        });
        await userAccount.save().catch(console.error);
    }
    else {
        return null;
    }
};

//module.exports = findRegistered
export default findRegistered
