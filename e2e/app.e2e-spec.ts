import { ImageLoaderAppPage } from './app.po';

describe('image-loader-app App', function() {
  let page: ImageLoaderAppPage;

  beforeEach(() => {
    page = new ImageLoaderAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
