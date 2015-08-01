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
    var todo = element.all(by.css('.todo')).get(1);
    todo.element(by.css('a')).click();

    expect(element.all(by.css('.details')).count()).toEqual(1);

  });

  it('should let me close the details view', function() {
    var todo = element.all(by.css('.todo')).get(1);
    todo.element(by.css('a')).click();
    element(by.css('.details button')).click();

    expect(element.all(by.css('.details')).count()).toEqual(0);
  });

  describe('starting a todo', function() {
    it('should let a button move to the doing column', function() {
      var todos = element.all(by.css('.todo'));
      todos.get(1).element(by.css('button')).click();

      var doing = element.all(by.css('.assigned li'));
      expect(doing.count()).toEqual(1);
    });
  });

});
