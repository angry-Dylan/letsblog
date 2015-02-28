/*!
 * LetsBlog
 * Data access layer of comment (2015-02-22T20:25:01+0800)
 * Released under MIT license
 */

'use strict';

var db = require('./_db');


exports.create = function(comment, callback) {
	db.query('INSERT INTO comment SET ?', comment, callback);
};

exports.updateState = function(state, commentids, callback) {
	db.query('UPDATE comment SET state = ' + state + ' WHERE commentid IN (' + commentids.join(',') + ')', callback);
};

exports.deleteByCommentIds = function(commentids, callback) {
	db.query('DELETE FROM comment WHERE commentid IN (' + commentids.join(',') + ')', callback);
};

exports.deleteByArticleIds = function(articleids, callback) {
	db.query('DELETE FROM comment WHERE articleid IN (' + articleids.join(',') + ')', callback);
};


var SELECT_USER_LIST = 'SELECT ' +
	'comment.commentid,' +
	'comment.userid,' +
	'comment.user_nickname,' +
	'user.nickname as user_current_nickname,' +
	'comment.user_email,' +
	'user.email as user_current_email,' +
	'comment.articleid,' +
	'article.title as article_title,' +
	'article.title_en as article_title_en,' +
	'comment.content,' +
	'comment.pubtime,' +
	'comment.ip,' +
	'comment.state' +
' FROM comment' +
' LEFT JOIN user ON comment.userid = user.userid' +
' LEFT JOIN article ON comment.articleid = article.articleid';

exports.list = function(params, pageSize, page, callback) {
	var sql = SELECT_USER_LIST;

	var whereStr = [ ], whereParams = [ ];
	if (params) {
		// 文章id
		if (params.articleid != null) {
			whereStr.push('comment.articleid = ?');
			whereParams.push(params.articleid);
		}
		// 文章标题
		if (params.title != null){
			whereStr.push('LOCATE(?, article.title) > 0');
			whereParams.push(params.title);
		}
		// 状态
		if (params.state != null) {
			whereStr.push('comment.state = ?');
			whereParams.push(params.state);
		}
	}
	if (whereStr.length) { sql += ' WHERE ' + whereStr.join(' AND '); }

	sql += ' ORDER BY comment.pubtime ASC';

	db.dataPaging(sql, {
		page: page,
		pageSize: pageSize,
		params: whereParams,
		callback: callback
	});
};


exports.getTotalPendingReviews = function(callback) {
	db.query('SELECT COUNT(*) AS total FROM comment WHERE state = 0', function(err, result) {
		if (!err) { result = result[0].total; }
		if (callback) { callback(err, result); }
	});
};


exports.getTotalCommentsAfterTime = function(time, ip, callback) {
	db.query(
		'SELECT COUNT(*) AS total FROM comment WHERE pubtime >= ? AND IP = ?',
		[time, ip],
		function(err, result) {
			if (!err) { result = result[0].total; }
			if (callback) { callback(err, result); }
		}
	);
};