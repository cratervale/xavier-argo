'use strict';
const {app, expect} = require('../common');

// Get a reference to the story model
const Story = app.models.Story;

describe('It should resolve', function() {
  it('a Story.find', function() {
    return Story
      .find()
      .then(res => console.log(res));
  });
});

describe('CRUD Functions', function() {
  it('should allow creating a story', function() {
    return Story.create(
      {
        title: 'Is the future here?',
        body: 'If so, where`s my robot butler?',
      })
      .then(res=> {
        expect(res.title).to.equal('Is the future here?');
        expect(res.body).to.equal('If so, where`s my robot butler?');
      });
  });

  it('should allow updating a story', function() {
    return Story.replaceById(1,
      {
        title: 'I am not your butler.',
        body: 'The diary of a sentient robot.',
      })
      .then(res=> {
        expect(res.title).to.equal('I am not your butler.');
        expect(res.body).to.equal('The diary of a sentient robot.');
      });
  });

  it('should allow deleting a story', function() {
    return Story.destroyById(1)
      .then(res=> {
        Story.findById(1)
        .then(res => {
          expect(res).to.equal(null);
        });
      });
  });
});

describe('Field Validation', function() {
  it('should not allow an empty title field', function() {
    return Story.create(
      {
        title: '',
        body: 'If so, where`s my robot butler?',
      })
      .then(res => Promise.reject('Story should not be created'))
        .catch(err => {
          expect(err.statusCode).to.be.equal(422);
        });
  });

  it('should not allow an empty body field', function() {
    return Story.create(
      {
        title: 'Is the future here?',
        body: '',
      })
      .then(res => Promise.reject('Story should not be created'))
        .catch(err => {
          expect(err.statusCode).to.be.equal(422);
        });
  });

  it('should set a createdAt value', function() {
    return Story.create(
      {
        title: 'How many roads must a man walk down? The answer may surprise you...',
        body: 'A study conducted by The University of Phoenix Online found the answer is eight.',
      })
      .then(res => {
        expect(res).to.have.property('createdAt');
      });
  });

  it('should alter the updatedAt value', function() {
    return Story.replaceById(2,
      {
        title: 'How many roads must a man walk down? The answer may surprise you...',
        body: 'A study conducted by The University of Phoenix Online found the answer is eight.',
      })
      .then(res => {
        expect(res.createdAt).to.not.equal(res.updatedAt);
      });
    });
});
