import { NightwatcherNgPage } from './app.po';

describe('nightwatcher-ng App', () => {
  let page: NightwatcherNgPage;

  beforeEach(() => {
    page = new NightwatcherNgPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
