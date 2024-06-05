const bcrypt = require('bcryptjs');

async function testPasswordHashing() {
    const password = 'Danielle';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log('Plaintext Password:', password);
    console.log('Hashed Password:', hashedPassword);

    const validPassword = await bcrypt.compare(password, hashedPassword);
    console.log('Password Valid:', validPassword);
}

testPasswordHashing();
