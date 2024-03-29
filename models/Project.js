var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Project Model
 * ==========
 */

var Project = new keystone.List('Project', {
	map: {name: 'title'},
	autokey: {path: 'slug', from: 'title', unique: true},
});

Project.add({
	title: {type: String, required: true},
	state: {type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true},
	author: {type: Types.Relationship, ref: 'User', index: true},
	client: {type: String, required: true, initial: true},
	featured: {type: Types.Boolean, required: true, initial: true},
	publishedDate: {type: Types.Date, index: true, dependsOn: {state: 'published'}},
	content: {
		//image: {type: Types.CloudinaryImage},
		imageDescription: {type: Types.Markdown, wysiwyg: true, height: 150},
		brief: {type: Types.Markdown, wysiwyg: true, height: 150},
		extended: {type: Types.Markdown, wysiwyg: true, height: 400},
	},
	categories: {type: Types.Relationship, ref: 'ProjectCategory', many: true},
});

Project.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Project.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Project.register();
