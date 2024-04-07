module.exports = {
    multipleMongooseToObject: (mongooses) =>
        mongooses.map((mongoose) => mongoose.toObject()),
    mongooseToObject: (mongoose) => {
        return mongoose ? mongoose.toObject() : mongoose;
    },
};
