# iniad_plus_firefox

> **非公式** の Firefox 移植版です。本家および東洋大学とは関係ありません。

INIAD MOOCs / ace / Google Slides 向けの Chrome 拡張機能 [**INIAD++**](https://github.com/akahoshi1421/INIAD-) を、**Firefox (Manifest V3) で動作するように移植したもの**です。

本体機能のオリジナル著作者は以下の方々です。本リポジトリは Firefox 対応に必要な改変のみを加えた派生物です。

- 本家 (オリジナル): [**akahoshi1421/INIAD-**](https://github.com/akahoshi1421/INIAD-) by [@akahoshi1421](https://github.com/akahoshi1421)
- Chrome 移植版 (直接の上流): [**Kensuke-sam/iniad_plus**](https://github.com/Kensuke-sam/iniad_plus) by [@Kensuke-sam](https://github.com/Kensuke-sam)

---

## まず結論: とりあえず使ってみたい人へ

一番かんたんな方法は **「一時読み込み」** です。Firefox を再起動すると消えますが、インストール作業は 1 分で終わります。

1. このページ右上の緑色の **Code** ボタン → **Download ZIP** で ZIP をダウンロード
2. ZIP を解凍 (デスクトップなど分かる場所でOK)
3. Firefox のアドレスバーに次を入力して Enter

   ```
   about:debugging#/runtime/this-firefox
   ```

4. **一時的なアドオンを読み込む...** を押す
5. 解凍したフォルダの中にある **`manifest.json`** を選ぶ
6. 一覧に **INIAD++ (Firefox)** が出れば成功
7. [https://moocs.iniad.org/](https://moocs.iniad.org/) を開いて動作確認

> Firefox を閉じると拡張は消えます。次回また使いたいときは 3〜6 をやり直せばOKです。
> 「毎回これを繰り返すのは面倒」という人は、後述の **B/C の恒久インストール** を見てください。

---

## 対応環境

- **Firefox 115 以降** (デスクトップ版)
- Developer Edition / Nightly / ESR でも動作

Chrome 版を使いたい人は本家 [akahoshi1421/INIAD-](https://github.com/akahoshi1421/INIAD-) を参照してください。

---

## 機能について

拡張機能そのものの機能一覧・スクリーンショット・詳しい使い方は、**本家 [akahoshi1421/INIAD-](https://github.com/akahoshi1421/INIAD-) の README を参照してください**。本リポジトリは Firefox 移植に関する情報のみを扱います。

---

## インストール方法 (3 パターン)

| | 手順 | メリット | デメリット |
|---|------|----------|------------|
| **A** | 一時読み込み | 誰でもすぐ使える | Firefox を閉じると消える |
| **B** | Developer Edition などに恒久インストール | 一度入れたら消えない | Firefox Developer Edition などのインストールが必要 |
| **C** | 通常版 Firefox に Mozilla 署名で恒久インストール | 今使っている Firefox でそのまま使える | Mozilla 開発者アカウント登録が必要 |

迷ったら **A → (使い続けたくなったら) B → (正規に運用したくなったら) C** の順で進めてください。

---

### A. 一時読み込み (1 分で終わる・おすすめ最初の一歩)

「まず結論」に書いたとおり。もう一度まとめます。

1. ZIP ダウンロード (緑の **Code** → **Download ZIP**)、またはクローン
   ```bash
   git clone https://github.com/Kensuke-sam/iniad_plus_firefox.git
   ```
2. 解凍したフォルダ内に `manifest.json` があることを確認
3. Firefox のアドレスバーに
   ```
   about:debugging#/runtime/this-firefox
   ```
   を入力して Enter
4. **一時的なアドオンを読み込む...** を押し、`manifest.json` を選択
5. [https://moocs.iniad.org/](https://moocs.iniad.org/) で動作確認

> コードを自分で書き換えた場合は、同じ画面の **再読み込み** ボタンで反映できます。

---

### B. Developer Edition / Nightly / ESR に恒久インストール

通常版 Firefox は **署名されていない拡張** の恒久インストールを許可しません。そこで、署名チェックを無効化できる別バージョンの Firefox を使います。

#### 1. 専用の Firefox をインストール

次のどれかをダウンロードしてインストールしてください。普段使っている Firefox とは別物として共存できます。

- [Firefox Developer Edition](https://www.mozilla.org/ja/firefox/developer/) (おすすめ)
- [Firefox Nightly](https://www.mozilla.org/ja/firefox/channel/desktop/#nightly)
- [Firefox ESR](https://www.mozilla.org/ja/firefox/enterprise/)

#### 2. 署名チェックを無効化

1. アドレスバーに `about:config` と入力して Enter
2. 警告画面で「危険性を承知の上で使用する」を選ぶ
3. 検索ボックスに `xpinstall.signatures.required` と入力
4. 値を **false** に変更 (右端のトグルボタンをクリック)

#### 3. 拡張を `.xpi` にパッケージ

**macOS / Linux:**
```bash
cd iniad_plus_firefox
zip -r ../iniad_plus_firefox.xpi . \
  -x "debugs/*" ".git/*" "*.md" ".DS_Store" "*/.DS_Store" \
     ".vs/*" "node_modules/*" "web-ext-artifacts/*" "*.xpi"
```

**Windows:**
1. `iniad_plus_firefox` フォルダを開く
2. フォルダ内のファイル・フォルダを **すべて選択** (フォルダ自体ではなく中身)
3. 右クリック → **送る** → **圧縮 (zip 形式) フォルダー**
4. できた ZIP の拡張子を `.zip` から `.xpi` に変更

#### 4. `.xpi` を読み込む

1. Developer Edition 等のアドレスバーに `about:addons` と入力
2. 歯車アイコン → **ファイルからアドオンをインストール...**
3. 作成した `.xpi` を選択
4. インストール確認ダイアログで **追加** を押す

これで再起動しても消えません。

---

### C. 通常版 Firefox で使いたい (Mozilla 署名を取得)

普段使いの Firefox でどうしても使いたい場合のみ。少し手間がかかります。

1. [Firefox Add-on Developer Hub](https://addons.mozilla.org/developers/) でアカウント作成
2. B の手順 3 で作成した `.xpi` を **自己配布 (unlisted / self-distribution)** としてアップロード
3. 自動レビューを通過すると、署名済みの `.xpi` がダウンロード可能になる
4. 通常版 Firefox の `about:addons` から、署名済み `.xpi` を読み込む

> **listed (公開) 提出** にすると審査が厳しくなります。自分用で使うだけなら **unlisted で十分** です。

---

## 動作確認

インストール後、以下を開いて拡張が動いているか確認してください。

| URL | 確認ポイント |
|-----|--------------|
| `https://moocs.iniad.org/` | 画面上部にメモ欄やカラー切替などのボタンが追加される |
| `https://docs.google.com/presentation/d/e/...` (INIAD のスライド) | ダウンロード確認ダイアログが出る |
| `https://www.ace.toyo.ac.jp/ct/home...` | JSON ダウンロードボタンが出る |

---

## うまく動かないとき

- **読み込み時にエラー**: ZIP ファイルではなく **解凍した後のフォルダ内の `manifest.json`** を選んでください。ZIP そのまま選ぶ方式ではないです
- **通常版 Firefox で B を試しても署名エラー**: 通常版は `xpinstall.signatures.required` を変更できません。必ず Developer Edition / Nightly / ESR を使ってください
- **機能が出ない**: 対象ページ (`moocs.iniad.org`, `docs.google.com/presentation`, `ace.toyo.ac.jp/ct/home`) を **Ctrl+Shift+R** (Mac は Cmd+Shift+R) で強制再読み込みしてみてください
- **`about:debugging` で一時読み込みしたが再起動で消える**: A の方法は仕様どおり一時的です。恒久的に使うには B か C を利用してください
- **スライド PDF のダウンロードがうまくいかない**: ブラウザコンソールのログを添えて Issue を立ててください
  - `about:debugging#/runtime/this-firefox` を開き、INIAD++ (Firefox) の **検査** をクリック → Console タブ
  - スライドのページを開いた側では **Ctrl+Shift+J** (Mac は Cmd+Shift+J) で Web コンソール
  - 両方のエラーメッセージを貼っていただけると原因が追えます

---

## このリポジトリで行った Firefox 対応

Chrome 版からの変更は **最小限** に抑えています。本体機能には手を入れていません。

- `manifest.json` に `browser_specific_settings.gecko` (拡張機能 ID と最小バージョン 115.0) と `host_permissions` を追加
- Google Slides の画像取得 `fetch` を、Firefox の content script (isolated world) の CORS 制約を回避するため **background script 経由** に変更 (`js/bg_fetch.js` を追加)
- jsPDF の参照を `window.jspdf` → `globalThis.jspdf || self.jspdf || window.jspdf` に変更 (content script sandbox 対応)
- Chrome Web Store 関連の記述を削除し、Firefox 向けインストール手順に差し替え
- 本体機能の JavaScript / CSS は **本家のものをそのまま流用**

---

## 貢献について

- **機能に関する Issue / PR は本家 [akahoshi1421/INIAD-](https://github.com/akahoshi1421/INIAD-) にお願いします**
- Firefox 移植に固有の問題 (インストール、Firefox での挙動差異、CORS など) のみ本リポジトリで扱います

---

## ライセンスと第三者ソフトウェア

- 本リポジトリに含まれる本体コードの著作権は本家 ([@akahoshi1421](https://github.com/akahoshi1421)) に帰属します
- `js/download.js` および `lib/` 以下のライブラリはそれぞれ **MIT License** です。各ファイル冒頭のライセンス表記は保持しています
- 同梱ライブラリと著作権表示の一覧は [NOTICE.md](./NOTICE.md) を参照してください

---

## 免責事項

本拡張の利用にあたっては **[DISCLAIMER.md](./DISCLAIMER.md)** を必ずお読みください。要点のみ抜粋:

- 本ソフトウェアは **東洋大学・INIAD の公式ソフトウェアではありません**
- 利用によって生じたいかなる損害についても作者は責任を負いません
- スライドの複製は **著作権法の範囲内 (私的利用など)** で行ってください。二次配布は法律違反となる場合があります

---

## SNS などで紹介していただける方へ

ご紹介いただける場合は、次の 2 点だけご配慮ください。

1. **非公式の Firefox 移植版** であることの明記
2. **本家リポジトリ [akahoshi1421/INIAD-](https://github.com/akahoshi1421/INIAD-) へのリンク**

本家作者さんへの敬意の表明として、大変助かります。
