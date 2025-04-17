// @ts-check
import { test, expect } from '@playwright/test';

test.describe('홈페이지 테스트', () => {
  test('기본 레이아웃과 컴포넌트가 렌더링되는지 확인', async ({ page }) => {
    await page.goto('/');
    
    // 헤더가 존재하는지 확인
    await expect(page.locator('h1:has-text("Contoso 아웃도어 소셜")')).toBeVisible();
    
    // 포스트 작성 폼이 존재하는지 확인
    await expect(page.locator('h2:has-text("새 포스트 작성")')).toBeVisible();
    
    // 포스트 목록이 존재하는지 확인
    await expect(page.locator('h2:has-text("최근 포스트")')).toBeVisible();
    
    // 초기 포스트들이 로드되는지 확인 (mock 데이터에는 4개의 포스트가 있습니다)
    // 각 포스트가 표시되기까지 기다림
    await expect(page.locator('.bg-white.rounded-lg.shadow-md.overflow-hidden')).toHaveCount(4);
    
    // 반응형 레이아웃 확인 - 데스크탑 모드에서는 사이드바가 표시됨
    await expect(page.locator('text=Contoso 아웃도어')).toBeVisible();
  });

  test('사용자 이름 입력이 작동하는지 확인', async ({ page }) => {
    await page.goto('/');
    
    const testUserName = 'playwright_test_user';
    
    // 사용자 이름 필드에 입력
    await page.fill('#userName', testUserName);
    
    // 다른 필드로 포커스를 이동하여 변경 사항이 저장되었는지 확인
    await page.click('#content');
    
    // 사용자 이름 필드에 입력한 값이 유지되는지 확인
    await expect(page.locator('#userName')).toHaveValue(testUserName);
  });

  test('포스트 목록 아이템들이 올바르게 표시되는지 확인', async ({ page }) => {
    await page.goto('/');
    
    // 포스트 목록이 로드될 때까지 대기
    await page.waitForSelector('.bg-white.rounded-lg.shadow-md.overflow-hidden');
    
    // 첫 번째 포스트가 mockData의 첫 번째 아이템과 일치하는지 확인
    const firstPostContent = await page.locator('.bg-white.rounded-lg.shadow-md.overflow-hidden p.text-gray-800').first().textContent();
    
    // mockData에 지정된 첫 번째 포스트의 내용이 포함되어 있어야 함
    expect(firstPostContent).toContain('새로운 트레일 러닝화');
    
    // 좋아요 버튼과 카운트가 표시되는지 확인
    await expect(page.locator('svg[viewBox="0 0 24 24"][stroke="currentColor"]').first()).toBeVisible();
  });
});