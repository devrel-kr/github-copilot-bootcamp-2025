// @ts-check
import { test, expect } from '@playwright/test';

test.describe('반응형 디자인 테스트', () => {
  test('데스크탑 뷰에서 사이드바 표시 확인', async ({ page }) => {
    // 데스크탑 크기로 설정
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    
    // 왼쪽 사이드바가 보이는지 확인
    await expect(page.locator('.hidden.lg\\:block.lg\\:w-1\\/4').first()).toBeVisible();
    
    // 오른쪽 사이드바가 보이는지 확인
    await expect(page.locator('.hidden.lg\\:block.lg\\:w-1\\/4').nth(1)).toBeVisible();
    
    // 왼쪽 사이드바에 회사 정보가 표시되는지 확인
    await expect(page.locator('text=최고 품질의 아웃도어 장비')).toBeVisible();
    
    // 오른쪽 사이드바에 신제품 정보가 표시되는지 확인
    await expect(page.locator('h2:has-text("신제품 소식")')).toBeVisible();
  });
  
  test('모바일 뷰에서 사이드바 숨김 확인', async ({ page }) => {
    // 모바일 크기로 설정
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // 사이드바가 숨겨져 있는지 확인
    await expect(page.locator('.hidden.lg\\:block.lg\\:w-1\\/4').first()).not.toBeVisible();
    await expect(page.locator('.hidden.lg\\:block.lg\\:w-1\\/4').nth(1)).not.toBeVisible();
    
    // 메인 콘텐츠는 여전히 표시되는지 확인
    await expect(page.locator('h1:has-text("Contoso 아웃도어 소셜")')).toBeVisible();
    await expect(page.locator('h2:has-text("새 포스트 작성")')).toBeVisible();
    await expect(page.locator('h2:has-text("최근 포스트")')).toBeVisible();
  });

  test('태블릿 크기에서 UI 요소 확인', async ({ page }) => {
    // 태블릿 크기로 설정
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    
    // 사이드바는 여전히 숨겨져 있지만 메인 콘텐츠 영역이 확장되었는지 확인
    await expect(page.locator('.hidden.lg\\:block.lg\\:w-1\\/4')).not.toBeVisible();
    
    // 메인 콘텐츠 영역이 전체 너비를 사용하는지 확인
    const mainContent = page.locator('.flex-1');
    
    // 폼과 포스트가 모두 보이는지 확인
    await expect(page.locator('h2:has-text("새 포스트 작성")')).toBeVisible();
    await expect(page.locator('.bg-white.rounded-lg.shadow-md.overflow-hidden')).toBeVisible();
  });
  
  test('포스트 상세 모달이 모바일에서 제대로 표시되는지 확인', async ({ page }) => {
    // 모바일 크기로 설정
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // 포스트 클릭하여 상세 모달 열기
    await page.click('.bg-white.rounded-lg.shadow-md.overflow-hidden');
    
    // 모달이 모바일 화면에 맞게 표시되는지 확인
    const modal = page.locator('.bg-white.rounded-lg.shadow-xl');
    await expect(modal).toBeVisible();
    
    // 모달 내부의 컨텐츠가 잘 표시되는지 확인
    await expect(page.locator('.text-2xl.font-bold')).toBeVisible(); // 제목
    await expect(page.locator('h3:has-text("댓글")')).toBeVisible(); // 댓글 섹션
    
    // 모바일 화면에서 모달의 너비가 적절한지 확인
    const boundingBox = await modal.boundingBox();
    expect(boundingBox.width).toBeLessThanOrEqual(375);
  });
});