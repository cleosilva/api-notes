import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    username: {
        type: String, required: true, unique: true, validate: {
            validator: (v) => {
                return /\S+@\S+\.\S+/.test(v);
            },
            message: (props) => `${props.value} invalid email!`
        }
    },
    password: { type: String, required: true, minlength: [8, 'The password should be 8 caracteres long'] },
    refreshToken: { type: String }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.validatePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model('User', userSchema);