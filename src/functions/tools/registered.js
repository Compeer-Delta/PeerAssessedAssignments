const mongoose = require("mongoose");
//this finds the account
let userAccount = await User.findOne({ userId: interaction.user.id });

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