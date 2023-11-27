import bcrypt from 'bcrypt';

const saltRounds = 10;


const hashPassword = async (plainPassword) => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(plainPassword, salt);
    return hash;
}

const comparePassword = async (userPassword, hashedPassword) => {
    try {
        const result = await bcrypt.compare(userPassword, hashedPassword);
        return result;
    } catch (error) {
        return false;
    }
}

export { hashPassword, comparePassword }