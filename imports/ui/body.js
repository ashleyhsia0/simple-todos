import { Template } from 'meteor/templating';

import { Tasks } from '../api/tasks.js';

import './body.html';

Template.body.helpers({
  // Get tasks from a collection instead of a static array
  tasks() {
    return Tasks.find({}, { sort: { createdAt: -1 } });
  },
});

Template.body.events({
  // Add event handler to listen to the submit event on the form
  'submit .new-task'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;  // this grabs the whole form that has event listener on it
    const text = target.text.value;  // this grabs the value from element with 'text' tagname property

    // Insert a task into the collection
    Tasks.insert({
      text,
      createdAt: new Date(),  // current time
    });

    // Clear form
    target.text.value = '';
  },
});
