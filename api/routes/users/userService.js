const { model: User } = require('./userModel');

exports.createUser = async (email, password) => {

};

exports.loginUser = async (email, password) => {
	try {
		const [user] = await User.find({ email })
		if (user) {
			const match = await user.comparePassword(password);
			if (match) {
				return user
			}
		}
		return null
	} catch (err) {
		throw err
	}
};



