var db = require('./db');
module.exports = {
	getAll: function(callbackFromController) {
		var sql = "SELECT * FROM users";
		db.execute(sql, null ,function(result){
			callbackFromController(result);
		});
	},
	get: function(id, callbackFromController){
		var sql = "SELECT * FROM users WHERE userId=?";
		db.execute(sql, [id], function(result){
			callbackFromController(result[0]);
		});
	},
	insert: function(user, callbackFromController){
		var sql = "INSERT INTO users VALUES (null, ?, ?)";
		db.execute(sql, [user.username, user.password], function(result){
			callbackFromController(result);
		});
	},
	update: function(user, callbackFromController) {
		var sql = "UPDATE users SET username=?, password=? WHERE userId=?";
		db.execute(sql, [user.username, user.password, user.userId], function(result){
			callbackFromController(result);
		});
	}
};