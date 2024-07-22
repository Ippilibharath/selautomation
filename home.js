const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function seleniumTest() {
    let driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options()).build();

    try {
        
        await driver.get('https://www.flipkart.com');
        await driver.manage().window().maximize();

        
        try {
            const closeButton = await driver.findElement(By.xpath("//button[contains(text(),'✕')]"));
            await closeButton.click();
        } catch (error) {
            
        }

    
        const searchBox = await driver.findElement(By.name('q'));
        await searchBox.sendKeys('iphone 15 pro max');
        await searchBox.sendKeys('\n'); 

        
        const mainPage = await driver.getWindowHandle();
        console.log("Main page =", mainPage);

    
        await driver.wait(until.elementLocated(By.xpath("//div[normalize-space()='Apple iPhone 15 Pro Max (Blue Titanium, 256 GB)']")), 10000);
        const productLink = await driver.findElement(By.xpath("//div[normalize-space()='Apple iPhone 15 Pro Max (Blue Titanium, 256 GB)']"));
        await productLink.click();

    
        const allPages = await driver.getAllWindowHandles();
        for (const page of allPages) {
            if (page !== mainPage) {
                await driver.switchTo().window(page);
                break;
            }
        }
        console.log(await driver.getCurrentUrl());

        
        await driver.wait(until.elementsLocated(By.className('_21Ahn-')), 10000);
        const products = await driver.findElements(By.className('_21Ahn-'));
        console.log("Number of products found:", products.length);
        for (const product of products) {
            console.log(await product.getText());
        }

        
        await driver.wait(until.elementLocated(By.xpath("//button[normalize-space()='Add to cart']")), 10000);
        const addToCartButton = await driver.findElement(By.xpath("//button[normalize-space()='Add to cart']"));
        await addToCartButton.click();

    } finally {
        
        await driver.quit();
    }
})();
