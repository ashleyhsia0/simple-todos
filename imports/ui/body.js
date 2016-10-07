import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Tasks } from '../api/tasks.js';

import './task.js';
import './body.html';

// ReactiveDict to store temporary reactive state on the client
Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('tasks');
});

// Helper is something that we will have access to in our html
// it can be things that are processed by JavaScript, items that are grabbed from the database, etc.
Template.body.helpers({
  // Get tasks from a collection instead of a static array
  tasks() {
    const instance = Template.instance();
    if (instance.state.get('hideCompleted')) {
      // If hide completed is checked, filter tasks
      return Tasks.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
    }
    // Otherwise, return all of the tasks
    return Tasks.find({}, { sort: { createdAt: -1 } });
  },
  incompleteCount() {
    return Tasks.find({ checked: { $ne: true } }).count();
  },
});

// Event, just like Helper, is a method that accepts an object
// Properties are always strings - contains the event that we are looking for and the item that we are looking for, for that event to take place on, with a function as the value
Template.body.events({
  // Add event handler to listen to the submit event on the form
  'submit .new-task'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;  // this grabs the whole form that has event listener on it
    const text = target.text.value;  // this grabs the value from element with 'text' tagname property

    // Insert a task into the collection
    Meteor.call('tasks.insert', text);

    // Clear form
    target.text.value = '';
  },
  // Add event handler to update ReactiveDict variable when the checkbox is checked or unchecked
  // Event handler takes two arguments, the second of which is the same template instance which was this in the onCreated callback
  'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  },
});
