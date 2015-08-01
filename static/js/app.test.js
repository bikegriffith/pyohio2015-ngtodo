describe('todo list', function() {

  beforeEach(function() {
    browser.driver.manage().deleteAllCookies();
    browser.get('http://localhost:5000');
  });

  it('should list all todos as unassigned', function() {
    expect(countCss('.unassigned li')).toEqual(5);
  });

  it('should show details for a todos', function() {
    clickFirst('.unassigned a')
    expect(countCss('.details')).toEqual(1);
  });

  it('should let me close the details view', function() {
    clickFirst('.unassigned a')
    element(by.css('.details button')).click();
    expect(countCss('.details')).toEqual(0);
  });

  it('should let a button move to the doing column', function() {
    expect(countCss('.assigned li')).toEqual(0);
    clickFirst('.unassigned button')
    expect(countCss('.assigned li')).toEqual(1);
  });

  it('should let a button move to the done column', function() {
    expect(countCss('.done li')).toEqual(0);
    clickFirst('.unassigned button');
    clickFirst('.assigned button');
    expect(countCss('.done li')).toEqual(1);
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
