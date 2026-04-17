# iniad_plus_firefox

> **非公式** の Firefox 移植版です。本家および東洋大学とは関係ありません。

INIAD MOOCs / ace / Google Slides 向けの Chrome 拡張機能 [**INIAD++**](https://github.com/akahoshi1421/INIAD-) を、**Firefox (Manifest V3) で動作するように移植したもの**です。

本体機能のオリジナル著作者は以下の方々です。本リポジトリは Firefox 対応に必要な改変のみを加えた派生物です。

- 本家 (オリジナル): [**akahoshi1421/INIAD-**](https://github.com/akahoshi1421/INIAD-) by [@akahoshi1421](https://github.com/akahoshi1421)
- Chrome 移植版 (直接の上流): [**Kensuke-sam/iniad_plus**](https://github.com/Kensuke-sam/iniad_plus) by [@Kensuke-sam](https://github.com/Kensuke-sam)

---

## 対応環境

- Firefox 115 以降 (Manifest V3 対応バージョン)
- Firefox Developer Edition / Nightly / ESR でも動作

## 機能について

拡張機能そのものの機能一覧・スクリーンショット・詳しい使い方は、**本家 [akahoshi1421/INIAD-](https://github.com/akahoshi1421/INIAD-) の README を参照してください**。本リポジトリは Firefox 移植に関する情報のみを扱います。

---

## Firefox へのインストール手順

Firefox は未署名アドオンの恒久インストールを通常版では許可しないため、用途に応じて次のいずれかを選んでください。

- **A. 試すだけ** → 一時読み込み (通常版 Firefox OK、再起動で消える)
- **B. 自分用にずっと使う** → Developer Edition などで署名検証を無効化して `.xpi` をインストール
- **C. 通常版 Firefox で恒久利用** → Mozilla 署名 (self-distribution / unlisted) を取得

### 事前準備：ソースを取得する

緑の **Code** ボタン → **Download ZIP** で取得するか、次のコマンドでクローンしてください。

```bash
git clone https://github.com/Kensuke-sam/iniad_plus_firefox.git
```

展開したフォルダー直下に `manifest.json` があることを確認してください。以降この直下フォルダーを **拡張機能フォルダー** と呼びます。

---

### A. 一時的に読み込む (通常版 Firefox で可・再起動で消える)

1. Firefox のアドレスバーに以下を入力して Enter
   ```
   about:debugging#/runtime/this-firefox
   ```
2. 左メニューの **This Firefox** (この Firefox) を選ぶ
3. 上部の **一時的なアドオンを読み込む... / Load Temporary Add-on...** を押す
4. 拡張機能フォルダー内の `manifest.json` を選ぶ
5. 一覧に **INIAD++ (Firefox)** が出れば成功
6. `https://moocs.iniad.org/` で動作確認

コードを書き換えた場合は同画面の **再読み込み / Reload** ボタンで反映できます。

---

### B. Developer Edition / Nightly / ESR で恒久インストール

1. 次のいずれかをインストール
   - [Firefox Developer Edition](https://www.mozilla.org/ja/firefox/developer/)
   - [Firefox Nightly](https://www.mozilla.org/ja/firefox/channel/desktop/#nightly)
   - [Firefox ESR](https://www.mozilla.org/ja/firefox/enterprise/)
2. `about:config` を開き、警告を承諾
3. `xpinstall.signatures.required` を **false** に変更
4. `.xpi` を作成
   - macOS / Linux:
     ```bash
     cd iniad_plus_firefox
     zip -r ../iniad_plus_firefox.xpi . -x "debugs/*" ".git/*" "*.md"
     ```
   - Windows: フォルダー内の中身を全選択 → 右クリックで zip 圧縮 → 拡張子を `.xpi` に変更
5. `about:addons` → 歯車 → **ファイルからアドオンをインストール...** → 作成した `.xpi` を指定

### C. 通常版 Firefox で恒久利用したい (Mozilla 署名を取得)

1. [Firefox Add-on Developer Hub](https://addons.mozilla.org/developers/) でアカウント登録
2. B 手順 4 で作った `.xpi` を **unlisted (self-distribution)** としてアップロード
3. 自動レビュー通過後、署名済み `.xpi` をダウンロード
4. 通常版 Firefox の `about:addons` から読み込む

> ⚠️ AMO への **listed (公開) 提出** はレビュー対象が増えます。非公式拡張のため、自分用であれば unlisted 署名で十分です。

---

## うまく動かないとき

- **読み込み時にエラー**: フォルダや ZIP ではなく `manifest.json` ファイル単体を選んでください
- **通常版 Firefox で B を試しても署名エラー**: 通常版では `xpinstall.signatures.required` を変更できません。Developer Edition などを使うか C の手順で署名を取得してください
- **機能が出ない**: 対象ページ (`moocs.iniad.org`, `docs.google.com/presentation`, `ace.toyo.ac.jp/ct/home`) を再読み込みしてみてください
- **スライド PDF ダウンロードが失敗する**: ブラウザコンソール (`Ctrl+Shift+J` / `Cmd+Shift+J`) のエラーを Issue に貼ってください

---

## このリポジトリで行った Firefox 対応

Chrome 版からの変更は最小限です。

- `manifest.json` に `browser_specific_settings.gecko` (拡張機能 ID と最小バージョン 115.0) を追加
- Google Slides の画像を取得する `fetch` を Firefox の content script (isolated world) で動かすため、**background script 経由** に変更 (`js/bg_fetch.js` を追加し `host_permissions` を設定)
- jsPDF の global 参照を `window.jspdf` → `globalThis.jspdf` に変更 (content script sandbox 対応)
- Chrome Web Store 関連の記述を削除し、Firefox 向けインストール手順に差し替え
- 本体機能の JavaScript / CSS は本家のものを流用

## 貢献について

- **機能に関する Issue / PR は本家 [akahoshi1421/INIAD-](https://github.com/akahoshi1421/INIAD-) にお願いします**
- Firefox 移植に固有の問題 (インストール、CORS、Firefox での挙動差異など) のみ本リポジトリで扱います

---

## ライセンスと第三者ソフトウェア

- 本リポジトリに含まれる本体コードの著作権は本家 ([@akahoshi1421](https://github.com/akahoshi1421)) に帰属します。
- `js/download.js` および `lib/` 以下のライブラリはそれぞれ **MIT License** です。各ファイル冒頭のライセンス表記は保持しています。
- 同梱ライブラリと著作権表示の一覧は [NOTICE.md](./NOTICE.md) を参照してください。

## 免責事項

本拡張の利用にあたっては **[DISCLAIMER.md](./DISCLAIMER.md)** を必ずお読みください。

要点のみ抜粋:

- 本ソフトウェアは **東洋大学・INIAD の公式ソフトウェアではありません**
- 利用によって生じたいかなる損害についても作者は責任を負いません
- スライドの複製は **著作権法の範囲内 (私的利用など)** で行ってください。二次配布は法律違反となる場合があります

---

## SNS などで紹介していただける方へ

ご紹介いただける場合は、次の 2 点だけご配慮ください。

1. **非公式の Firefox 移植版** であることの明記
2. **本家リポジトリ [akahoshi1421/INIAD-](https://github.com/akahoshi1421/INIAD-) へのリンク**

本家作者さんへの敬意の表明として、大変助かります。
