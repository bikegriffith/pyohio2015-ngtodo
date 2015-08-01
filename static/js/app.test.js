describe('todo list', function() {

  beforeEach(function() {
    browser.driver.manage().deleteAllCookies();
    browser.get('http://localhost:5000');
  });

  it('should list all todos', function() {
    var todos = element.all(by.css('.todo'));
    expect(todos.count()).toEqual(5);
  });

  it('should show details for a todos', function() {
    var todo = element.all(by.css('.todo')).get(0);
    todo.element(by.css('a')).click();
    expect(element.all(by.css('.details')).count()).toEqual(1);

  });

  it('should let me close the details view', function() {
    var todo = element.all(by.css('.todo')).get(0);
    todo.element(by.css('a')).click();
    element(by.css('.details button')).click();
    expect(element.all(by.css('.details')).count()).toEqual(0);
  });

  it('should let a button move to the doing column', function() {
    var todos = element.all(by.css('.todo'));
    var doing = element.all(by.css('.assigned li'));
    expect(doing.count()).toEqual(0);
    todos.get(0).element(by.css('button')).click();
    expect(doing.count()).toEqual(1);
  });

  it('should let a button move to the done column', function() {
    var todos = element.all(by.css('.todo'));
    var doing = element.all(by.css('.assigned li'));
    var done = element.all(by.css('.done li'));
    expect(done.count()).toEqual(0);
    todos.get(0).element(by.css('button')).click();
    doing.get(0).element(by.css('button')).click();
    expect(done.count()).toEqual(1);
  });

});
