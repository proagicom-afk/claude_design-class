# 클로드 디자인 클래스 — GitHub Pages 배포용

이 폴더 안의 파일을 **그대로** 깃허브 저장소에 올리면 무료 웹사이트가 됩니다.
서버·빌드 과정 없이 동작합니다.

## 폴더 구성
- `index.html` … 메인 랜딩 페이지 (시작 파일 — 최상단에 있어야 함)
- `styles.css` … 전체 스타일
- `app.jsx` / `sections.jsx` / `tweaks-panel.jsx` … 화면 구성 코드
- `fonts/` … 한글 폰트(KoPub Dotum)
- `notes/` … 강의안 페이지(skill 1~8, 보충, 과정 개요)
- `.nojekyll` … 깃허브가 파일을 건드리지 않게 하는 설정 (지우지 마세요)

---

## 올리는 방법 — 웹브라우저만으로 (터미널 불필요)

1. **github.com** 로그인 → 우측 상단 **＋ → New repository**
2. 저장소 이름 입력 (예: `design-class`) → **Public** 선택 → **Create repository**
3. 새 저장소 화면에서 **uploading an existing file** 링크 클릭
4. ⚠️ **이 폴더를 열어서 안의 파일들**(`index.html`, `styles.css`, `fonts`, `notes` 등)을
   통째로 끌어다 놓기 — `index.html`이 저장소 최상단에 오도록
   - 숨김파일 `.nojekyll`이 안 끌려오면, 페이지가 안 떠도 일단 사이트는 동작합니다(없어도 무방).
5. 아래 **Commit changes** 클릭
6. 저장소 상단 **Settings → Pages**
7. **Source** = `Deploy from a branch`, **Branch** = `main` / `/(root)` → **Save**
8. 1~2분 뒤 같은 화면에 주소가 나옵니다:
   `https://<아이디>.github.io/design-class/`

끝입니다. 강의안 링크·폰트·스타일 모두 하위 경로에서 정상 작동하도록 정리돼 있습니다.

---

## 참고
- 첫 로딩 시 React/Babel을 브라우저에서 변환하므로 1~2초 걸릴 수 있습니다.
- 신청 폼은 현재 **화면 확인만** 되고 데이터는 저장되지 않습니다.
- 푸터의 예시 연락처·이메일·장소는 실제 정보로 바꿔서 올리세요.
