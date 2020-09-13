const searchResults = require('../utils/search-results-test.js');

test('test that true is true', () => {
  expect(true).toBe(true);
});

test('check if we can assign a property of each object inside an array a unique id value', () => {

  for (let i = 0; i < searchResults.length; i++) {
    searchResults[i].bookId = i + 1;
  }
  expect(searchResults[0].bookId).toBe("one");

});


