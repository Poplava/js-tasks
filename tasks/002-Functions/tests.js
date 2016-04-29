QUnit.test('Max parameter', function(assert) {
  assert.equal(task(1, 2, 3), 3, 'task(1, 2, 3)');
  assert.equal(task(10, 9, 7), 10, 'task(10, 9, 7)');
  assert.equal(task(1001, 9999, 10), 9999, 'task(1001, 9999, 10)');
});
