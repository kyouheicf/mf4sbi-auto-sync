import puppeteer from "@cloudflare/puppeteer";

async function triggerEvent(event, env) {
	// Initiate Browser Context
	const browser = await puppeteer.launch(env.MYBROWSER);
	const page = await browser.newPage();
    
	// Log into Moneyforward for SBI
	await page.goto("https://ssnb.x.moneyforward.com/users/sign_in");
	await page.type('#sign_in_session_service_email', env.USERNAME);
	await page.type('#sign_in_session_service_password', env.PASSWORD);
	const loginButton = await page.$('#login-btn-sumit');
	if (loginButton) {
		await loginButton.click();
	}
	else {
		throw new Error(`Can't find #login-btn-sumit`);
	}
	// Wait for load page after login
	await page.waitForNavigation({ waitUntil: 'networkidle2' });
  
	// Go to the list of accounts page
	await page.goto("https://ssnb.x.moneyforward.com/accounts");
	// Press all 更新 button
	await page.$$eval('input[value="更新"]', syncButtons => syncButtons.forEach(syncButton => syncButton.click()))
  
	await browser.close();
}

export default {
	async scheduled(event, env, ctx) {
		ctx.waitUntil(triggerEvent(event, env));
	},
}
