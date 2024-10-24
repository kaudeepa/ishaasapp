const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Bureaucrat = require('./models/Bureaucrat');
const User = require('./models/User');
const Review = require('./models/Review');

async function seedAdmin() {
    // Connect to the database
    await mongoose.connect("mongodb://localhost/bureaucrat_reviews_db");
    // Create admin user
    let admin = {
        name: 'Admin User',
        email: 'admin.user@gmail.com',
        password: '&32#fw{42e09',
        role: 'admin'
    };
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: admin.email });

    if (!existingAdmin) {
        // Hash the admin password
        /*const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(admin.password, salt);
        admin.password = hashedPassword;*/

        // Create the admin user in the database
        await User.create(admin);

        console.log("Admin user created successfully");
    } else {
        console.log("Admin user already exists");
    }
    // Close the database connection
    await mongoose.disconnect();
}

async function createAllReviews(){
    let review = {
            user: null,
            bureaucrat: null,
            rating: '9',
            comment: 'Mr. Trump is running for his second presidency.  He has been in tough situations and knows how to handle them appropriately.'
        },
        reviewList = [review];
    try{
        // Connect to the database
        await mongoose.connect("mongodb://localhost/bureaucrat_reviews_db");
        let result = await Bureaucrat.findOne({name:'Donald Trump'});
        if(result!=false){
            console.log(`found bureaucrat: ${result}`);
            review.bureaucrat=result._id;
        }
        else  {
            console.error("Error finding bureaucrat");
        }
        result = await User.findOne({email:'admin.user@gmail.com'});
        if(result!=false){
            console.log(`found user: ${result}`);
            review.user=result._id;
        }
        else  {
            console.error("Error finding user");
        }
        result = await Review.create(reviewList);
        console.log(`All reviews: ${result}`);
    }
    catch(err){
        console.error(`Error creating reviews: \n${err}`);
    }

    // Close the database connection
    await mongoose.disconnect();
}

async function createAllBureaucrats(){
    let bureaucrat = {
            name: 'Donald Trump',
            department: 'The White House',
            position: 'President',
            contact: 'donald.trump@gmail.com',
            averageRating: 9
        },
        bureaucratList = [bureaucrat];
    try{
        // Connect to the database
        await mongoose.connect("mongodb://localhost/bureaucrat_reviews_db");
        let result = await Bureaucrat.create(bureaucratList);
        console.log(`All bureaucrats: ${result}`);
    }
    catch(err){
        console.error(`Error creating bureaucrats: \n${err}`);
    }

    // Close the database connection
    await mongoose.disconnect();
}

async function deleteAllBureaucrats(){
    // Connect to the database
    await mongoose.connect("mongodb://localhost/bureaucrat_reviews_db");
    let result = await Bureaucrat.deleteMany({});
    if(result.acknowledged){
        console.log(`Deleted ${result.deletedCount} bureaucrats.`);
    }
    else  {
        console.error("Error deleting bureaucrats");
    }
    // Close the database connection
    await mongoose.disconnect();
}

// Execute the  seeder
createAllReviews().then(() => {
    console.log("Reviews seeding completed");
    process.exit(0);
}).catch((err) => {
    console.error("Error seeding reviews:", err);
    process.exit(1);
});

seedAdmin().then(() => {
    console.log("Admin seeding completed");
    process.exit(0);
}).catch((err) => {
    console.error("Error seeding admin:", err);
    process.exit(1);
});

createAllBureaucrats().then(() => {
    console.log("Bureaucrats seeding completed");
    process.exit(0);
}).catch((err) => {
    console.error("Error seeding bureaucrats:", err);
    process.exit(1);
});

/*
deleteAllBureaucrats().then(() => {
    console.log("Bureaucrats seeding completed");
    process.exit(0);
}).catch((err) => {
    console.error("Error seeding bureaucrats:", err);
    process.exit(1);
});*/
