# 세 여우 VEO 스튜디오

Google Flow VEO 3.1 Lite용 1분 영상 기획안, 8개 클립 스토리보드와 프롬프트를 만드는 Windows 앱입니다.

## Supabase 보관함
Supabase Dashboard → SQL Editor에서 `supabase-setup.sql`을 실행하면 보관함이 클라우드에도 저장됩니다. 이 앱은 사용자가 제공한 publishable key만 사용하며 secret/service-role 키를 포함하지 않습니다.

### 아이디·비밀번호 로그인 설정

1. Supabase Dashboard → **Authentication** → **Providers** → **Email**을 활성화합니다.
2. 같은 화면에서 **Confirm email**을 끕니다. 이 앱은 화면상의 아이디를 내부 이메일 식별자로 변환하므로, 이메일 수신 확인을 쓰지 않습니다.
3. Dashboard → **Authentication** → **General configuration**에서 새 사용자 가입을 허용합니다.

앱의 `로그인 / 가입`에서 아이디와 6자 이상 비밀번호로 계정을 만들면, 보관함은 그 계정만 읽고 쓸 수 있습니다.

## 업데이트
앱은 시작할 때 GitHub Releases의 최신 버전을 확인합니다. 새 릴리스가 있으면 상단 안내를 클릭해 다운로드 페이지를 엽니다. 포터블 앱이므로 새 릴리스 파일로 교체하면 됩니다. 완전 무인 업데이트에는 코드서명과 설치형(NSIS) 배포 채널이 추가로 필요합니다.

## 개발/빌드
`npm install` 후 `npm run dist`를 실행합니다.
