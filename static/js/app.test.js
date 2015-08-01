describe('todo list', function() {

  beforeEach(function() {
    browser.driver.manage().deleteAllCookies();
    browser.get('http://localhost:5000');
  });

  it('should list all todos as unassigned', function() {
    expect(countCss('.unassigned li')).toEqual(5);
  });


});


///
/// Quick Helpers
///

function countCss(selector) {
  return element.all(by.css(selector)).count();
}

function clickFirst(selector) {
  element.all(by.css(selector)).get(0).click();
}
