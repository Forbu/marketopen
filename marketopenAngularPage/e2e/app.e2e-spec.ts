import { MarketopenAngularPagePage } from './app.po';

describe('marketopen-angular-page App', () => {
  let page: MarketopenAngularPagePage;

  beforeEach(() => {
    page = new MarketopenAngularPagePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
