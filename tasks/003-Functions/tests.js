QUnit.test('Max parameter', function(assert) {
  assert.equal(task(1, 2, 3), 2, 'task(1, 2, 3)');
  assert.equal(task(0, 10, 3), 13 / 3, 'task(0, 10, 3)');
  assert.equal(task(1001, 9999, 10), 3670, 'task(1001, 9999, 10)');
});
