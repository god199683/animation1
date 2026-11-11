# 세 여우 VEO 스튜디오

Google Flow VEO 3.1 Lite용 1분 영상 기획안, 8개 클립 스토리보드와 프롬프트를 만드는 Windows 앱입니다.

## Supabase 보관함
Supabase Dashboard → SQL Editor에서 `supabase-setup.sql`을 실행하면 보관함이 클라우드에도 저장됩니다. 이 앱은 사용자가 제공한 publishable key만 사용하며 secret/service-role 키를 포함하지 않습니다.

## 업데이트
앱은 시작할 때 GitHub Releases의 최신 버전을 확인합니다. 새 릴리스가 있으면 상단 안내를 클릭해 다운로드 페이지를 엽니다. 포터블 앱이므로 새 릴리스 파일로 교체하면 됩니다. 완전 무인 업데이트에는 코드서명과 설치형(NSIS) 배포 채널이 추가로 필요합니다.

## 개발/빌드
`npm install` 후 `npm run dist`를 실행합니다.
