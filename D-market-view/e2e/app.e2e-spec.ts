import { DMarketViewPage } from './app.po';

describe('d-market-view App', () => {
  let page: DMarketViewPage;

  beforeEach(() => {
    page = new DMarketViewPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
