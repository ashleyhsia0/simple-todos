import { Template } from 'meteor/templating';

import { Tasks } from '../api/tasks.js';

import './body.html';

// Get tasks from a collection instead of a static array
Template.body.helpers({
  tasks() {
    return Tasks.find({})
  },
});

// Add event handler to listen to the submit event on the form
Template.body.events({
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
