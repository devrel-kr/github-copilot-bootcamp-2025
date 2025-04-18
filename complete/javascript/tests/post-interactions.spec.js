// @ts-check
import { test, expect } from '@playwright/test';

test.describe('포스트 상호작용 테스트', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    
    // 테스트용 사용자 이름 설정
    await page.fill('#userName', 'playwright_tester');
  });

  test('새 포스트 작성하기', async ({ page }) => {
    // 포스트 내용 입력
    const testContent = '이것은 Playwright를 사용한 테스트 포스트입니다. ' + Date.now();
    const testImage = 'https://images.unsplash.com/photo-1512850183-6d7990f42385';
    
    await page.fill('#content', testContent);
    await page.fill('#imageUrl', testImage);
    
    // 게시하기 버튼 클릭
    await page.click('button:has-text("게시하기")');
    
    // 새 포스트가 목록에 추가되었는지 확인 (맨 위에 추가되므로 첫 번째 요소)
    await page.waitForSelector(`.bg-white.rounded-lg.shadow-md.overflow-hidden p.text-gray-800:has-text("${testContent}")`);
    
    // 이미지가 제대로 추가되었는지 확인
    const postWithImage = page.locator(`.bg-white.rounded-lg.shadow-md.overflow-hidden img[src="${testImage}"]`);
    await expect(postWithImage).toBeVisible();
    
    // 작성자 이름이 올바르게 표시되는지 확인
    await expect(page.locator(`.bg-white.rounded-lg.shadow-md.overflow-hidden >> text=playwright_tester`).first()).toBeVisible();
  });

  test('포스트에 좋아요 누르기', async ({ page }) => {
    // 첫 번째 포스트 찾기
    const firstPost = page.locator('.bg-white.rounded-lg.shadow-md.overflow-hidden').first();
    
    // 처음 좋아요 수 확인
    const likeButton = firstPost.locator('button.flex.items-center.space-x-1').first();
    const initialLikeCount = await likeButton.textContent();
    const initialCount = parseInt(initialLikeCount.trim()) || 0;
    
    // 좋아요 버튼 클릭
    await likeButton.click();
    
    // 좋아요 수가 증가했는지 확인 (또는 버튼 스타일이 변경되었는지 확인)
    await page.waitForTimeout(500); // 좋아요 처리를 위한 짧은 대기
    
    // 버튼 색상이 변경되었는지 확인 (클래스 확인)
    await expect(likeButton).toHaveClass(/bg-blue-600/);
  });

  test('포스트 상세 페이지 열기 및 댓글 작성', async ({ page }) => {
    // 첫 번째 포스트 클릭하여 상세 페이지 열기
    await page.click('.bg-white.rounded-lg.shadow-md.overflow-hidden');
    
    // 모달이 열렸는지 확인
    await expect(page.locator('.fixed.inset-0.bg-black.bg-opacity-50')).toBeVisible();
    
    // 댓글 섹션이 있는지 확인
    await expect(page.locator('h3:has-text("댓글")')).toBeVisible();
    
    // 댓글 작성
    const testComment = '이것은 테스트 댓글입니다. ' + Date.now();
    await page.fill('textarea[placeholder="댓글을 작성하세요..."]', testComment);
    
    // 댓글 작성 버튼 클릭
    await page.click('button:has-text("댓글 달기")');
    
    // 새 댓글이 목록에 추가되었는지 확인
    await page.waitForSelector(`.bg-gray-50:has-text("${testComment}")`);
    
    // 댓글 작성자 확인
    await expect(page.locator('.bg-gray-50 .font-medium:has-text("playwright_tester")')).toBeVisible();
    
    // 모달 닫기
    await page.click('button:has-text("닫기")');
    
    // 모달이 닫혔는지 확인
    await expect(page.locator('.fixed.inset-0.bg-black.bg-opacity-50')).not.toBeVisible();
  });

  test('포스트 삭제하기', async ({ page }) => {
    // 새 포스트 작성
    const testContent = '삭제될 테스트 포스트입니다. ' + Date.now();
    await page.fill('#content', testContent);
    await page.click('button:has-text("게시하기")');
    
    // 새 포스트가 목록에 추가될 때까지 기다림
    await page.waitForSelector(`.bg-white.rounded-lg.shadow-md.overflow-hidden p.text-gray-800:has-text("${testContent}")`);
    
    // 현재 포스트 개수 확인
    const initialPostCount = await page.locator('.bg-white.rounded-lg.shadow-md.overflow-hidden').count();
    
    // 삭제 버튼 클릭 (첫 번째 포스트는 본인이 작성한 것)
    // 이벤트 전파를 막기 위해 버튼만 클릭
    await page.click('.bg-white.rounded-lg.shadow-md.overflow-hidden button:has-text("삭제")', { force: true });
    
    // 경고 대화상자 승인
    page.on('dialog', dialog => dialog.accept());
    
    // 포스트가 삭제되어 개수가 줄어들었는지 확인
    await expect(page.locator('.bg-white.rounded-lg.shadow-md.overflow-hidden')).toHaveCount(initialPostCount - 1);
    
    // 삭제된 포스트의 내용이 더 이상 없는지 확인
    await expect(page.locator(`.bg-white.rounded-lg.shadow-md.overflow-hidden p.text-gray-800:has-text("${testContent}")`)).not.toBeVisible();
  });
});