const jwt = require("jsonwebtoken");



const secret = 'myCat';


const verify = {
	sub: 1,
	role: 'customer'
}


function singToken(verify, secret) {
	return jwt.sign(verify, secret);
}

const token = singToken(verify, secret);

function verifyToken(token, secret) {
	return jwt.sign(token, secret);
}

const payload = verifyToken(token, secret);