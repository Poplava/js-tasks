QUnit.test('Max parameter', function(assert) {
  assert.equal(task(1), 1, 'task(1)');
  assert.equal(task(2), 4, 'task(2)');
  assert.equal(task(256), 65536, 'task(256)');
  assert.equal(task(1000), 1000000, 'task(1000)');
});
