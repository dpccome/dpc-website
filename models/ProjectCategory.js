var keystone = require('keystone');

/**
 * ProjectCategory Model
 * ==================
 */

var ProjectCategory = new keystone.List('ProjectCategory', {
	autokey: {from: 'name', path: 'key', unique: true},
});

ProjectCategory.add({
	name: {type: String, required: true, initial: true},
	icon: {type: String, required: true, initial: true},
});

ProjectCategory.relationship({ref: 'Project', path: 'Projects', refPath: 'categories'});

ProjectCategory.register();
