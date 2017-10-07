'use strict';
const {app, expect, request} = require('../common');

describe('ACL', function() {
  describe('Stories', function() {
    it('should return 200 when listing Stories', function() {
      return request
        .get('/api/Stories')
        .expect(200);
    });

    it('should return 401 when creating Stories', function() {
      return request
        .post('/api/Stories')
        .send({title: 'A New Post', body: 'Lorem Ipsum ...'})
        .expect(401);
    });

    it('should return 401 when updating Stories', function() {
      return request
        .patch('/api/Stories/1')
        .send({title: 'An updated Post', body: 'Lorem Ipsum ...'})
        .expect(401);
    });

    it('should return 401 when deleting Stories', function() {
      return request
        .patch('/api/Stories/1')
        .expect(401);
    });
  });
});
