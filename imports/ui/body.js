import { Template } from 'meteor/templating';

import { Tasks } from '../api/tasks.js';

import './body.html';

// Get tasks from a collection instead of a static array
Template.body.helpers({
  tasks() {
    return Tasks.find({})
  }
})
