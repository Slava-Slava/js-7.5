const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const { putText, getText, clickElement } = require("../../lib/commands.js");

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on {string} page", async function (string) {
  return await this.page.goto(`http://qamid.tmweb.ru/client${string}`, {
    setTimeout: 20000,
  });
});

When("user choose a day", async function () {
  return await clickElement(this.page, "body > nav > a:nth-child(1)");
});

When("user choose a time", async function () {
  return await clickElement(this.page, "body > main > section:nth-child(1) > div:nth-child(2) > ul > li > a");
});

When("user choose the first place", async function () {
  return await clickElement(this.page, "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(1) > span:nth-child(9)");
});

When("user choose second place", async function () {
  return await clickElement(this.page, "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(1) > span:nth-child(8)");
});

When("user choose third place", async function () {
  return await clickElement(this.page, "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(1) > span:nth-child(7)");
});

When("user reserves a seat", async function () {
  return await clickElement(this.page, "body > main > section > button");
});

When("user receives a booking code", async function () {
  return await clickElement(this.page, "body > main > section > div > button");
});

When("user selects a ticket", async function () {
  return await clickElement(this.page, "body > main > section > header > h2");
});

Then("user receives an electronic ticket {string}", async function (string) {
  const actual = await getText(this.page, "body > main > section > header > h2");
  const expected = await string;
  expect(actual).contains(expected);
});

Then("button for booking is inactive {string}", async function (string) {
  const actual = String(
    await this.page.$eval("button", (button) => {
      return button.disabled;
    })
  );
  const expected = await string;
  expect(actual).contains(expected);
});
