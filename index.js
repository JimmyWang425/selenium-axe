const { AxeBuilder } = require('@axe-core/webdriverjs');
const { By, Builder, Browser } = require('selenium-webdriver');
const assert = require("assert");

(async function firstTest() {
  let driver;
  
  try {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.get('https://dequeuniversity.com/demo/mars');
  
    let title = await driver.getTitle();
    assert.equal("Mars Commuter: Travel to Mars for Work or Pleasure!", title);

    await driver.findElement(By.id('main-nav'));
  
    await driver.manage().setTimeouts({implicit: 500});

    try {
        const results = await new AxeBuilder(driver).analyze();
        console.log(results);
    } catch (e) {
        console.log(e);
    }
  
  } catch (e) {
    console.log(e)
  } finally {
    await driver.quit();
  }
}());
