import { test, expect } from '@playwright/test';
test.use({ trace: 'off' });

test('Registered user successfully logs in with email and password', async ({ page }) => {
    const email = process.env.ENGENIOUS_EMAIL;
    const password = process.env.ENGENIOUS_PASSWORD;
    const expectedName = process.env.ENGENIOUS_NAME;

    if (!email || !password || !expectedName) {
        throw new Error(
            'Set ENGENIOUS_EMAIL, ENGENIOUS_PASSWORD, and ENGENIOUS_NAME before running.'
        );
    }

    await page.goto('https://university.engenious.io/');

    const cookieDialog = page.getByRole('dialog').filter({
        has: page.getByRole('heading', {
            name: 'We value your privacy',
            exact: true,
        }),
    });

    await cookieDialog.getByRole('button', {
        name: 'Essential only',
        exact: true,
    }).click();

    await expect(cookieDialog).toBeHidden();

    await page.getByRole('button', {
        name: 'Sign Up / Login',
        exact: true,
    }).click();

    await expect(page).toHaveURL(
        'https://university.engenious.io/registration'
    );

    await page.getByRole('link', {
        name: 'Login',
        exact: true,
    }).click();

    await expect(page).toHaveURL(
        'https://university.engenious.io/login'
    );

    await page.getByLabel('Email', { exact: true }).fill(email);
    await page.getByLabel('Password', { exact: true }).fill(password);

    await page.getByRole('button', {
        name: 'Login',
        exact: true,
    }).click();

    await expect(page).toHaveURL('https://university.engenious.io/');

    await page.getByRole('button', {
        name: 'open drawer',
        exact: true,
    }).click();

    await expect(page.getByRole('button', {
        name: 'Logout',
        exact: true,
    })).toBeVisible();

    await page.getByText(expectedName, { exact: true }).click();

    await expect(page).toHaveURL(
        'https://university.engenious.io/profile'
    );

    await expect(
        page.getByRole('heading', {
            name: expectedName,
            level: 1,
            exact: true,
        })
    ).toBeVisible();
});