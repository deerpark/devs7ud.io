import {expect, test} from '@playwright/test'

test.describe('Navigation', () => {
  test.describe('Static pages', () => {
    test('should browse to index', async ({page}) => {
      await page.goto('/')

      await expect(page.getByText('Get started by editing')).toBeVisible()
    })
  })
})
