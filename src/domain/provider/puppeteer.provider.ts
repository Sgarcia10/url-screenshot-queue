import { Injectable } from '@nestjs/common';
import * as chromium from 'chrome-aws-lambda';
import * as path from 'path';

@Injectable()
export class PuppeteerProvider {
  async screenshot(url: string, pathTmp: string, fileName: string) {
    const browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true
    });
    const page = await browser.newPage();
    await page.goto(url);
    await page.screenshot({ path: path.join(pathTmp, fileName) });
    await browser.close();
  }
}
