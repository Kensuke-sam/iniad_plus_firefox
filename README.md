# iniad_plus_firefox

[INIAD++](https://github.com/Kensuke-sam/iniad_plus) を **Firefox で動かすために移植した** 非公式のリポジトリです。

本リポジトリは Firefox 移植に関する部分のみを扱います。拡張機能そのものの機能説明・免責事項・ライセンス・本家の開発方針については、フォーク元の [Kensuke-sam/iniad_plus](https://github.com/Kensuke-sam/iniad_plus) を参照してください。

---

## 動作環境
- Firefox 115 以降（MV3 対応バージョン）
- Firefox Developer Edition / Nightly / ESR でも動作します

---

## Firefox へのインストール手順

Firefox では未署名のアドオンを恒久的に入れることが通常版ではできないため、用途に応じて以下の方法を選んでください。

- **A. とりあえず試したい人** → 一時読み込み（再起動で消えます／通常版 Firefox で可）
- **B. 再起動後も使い続けたい人** → Developer Edition 等で `.xpi` をインストール
- **C. 通常版 Firefox で恒久的に使いたい人** → Mozilla の署名を取得する

### 事前準備：このリポジトリを取得する

1. このリポジトリの右上の緑色の **Code** ボタンを押して **Download ZIP** を選び、好きな場所に展開します。
   - Git が使える人は次のコマンドでも OK:
     ```bash
     git clone https://github.com/Kensuke-sam/iniad_plus_firefox.git
     ```
2. 展開または clone したフォルダーの直下に `manifest.json` があることを確認してください。以降の手順ではこのフォルダーを **拡張機能フォルダー** と呼びます。

---

### A. 一時的に読み込む（再起動で消える・通常版 Firefox で可）

もっとも簡単で、Firefox のバージョン・種類を問わず利用できる方法です。Firefox を再起動すると自動的に解除されます。

1. Firefox を起動し、アドレスバーに以下を入力して Enter
   ```
   about:debugging#/runtime/this-firefox
   ```
2. 左側メニューの **This Firefox**（この Firefox）が選ばれていることを確認
3. 画面上部の **一時的なアドオンを読み込む... / Load Temporary Add-on...** ボタンを押す
4. ファイル選択ダイアログで、拡張機能フォルダー内の `manifest.json` を選んで開く
5. 一覧に **INIAD++ (Firefox)** が表示されれば読み込み成功です
6. [https://moocs.iniad.org/](https://moocs.iniad.org/) を開いて、追加された機能が動くことを確認してください

#### 更新・解除について
- ファイルを書き換えた後は `about:debugging` 画面で **再読み込み / Reload** を押すと反映されます
- やめたい場合は **削除 / Remove** を押すか、Firefox を再起動してください

---

### B. Developer Edition / Nightly / ESR で恒久的にインストールする

署名検証を無効化できる Firefox を使う方法です。自分専用で恒久的に使いたい場合に便利です。

1. 次のいずれかをインストール
   - [Firefox Developer Edition](https://www.mozilla.org/ja/firefox/developer/)
   - [Firefox Nightly](https://www.mozilla.org/ja/firefox/channel/desktop/#nightly)
   - [Firefox ESR](https://www.mozilla.org/ja/firefox/enterprise/)
2. アドレスバーに `about:config` と入力し、警告画面で **危険性を承知の上で使用する** を選ぶ
3. 検索ボックスに `xpinstall.signatures.required` と入力し、値をダブルクリックして **false** に変更する
4. `.xpi` を作成する
   - macOS / Linux:
     ```bash
     cd iniad_plus_firefox
     zip -r ../iniad_plus_firefox.xpi . -x "debugs/*" ".git/*"
     ```
   - Windows（コマンドが使えない場合）:
     1. 拡張機能フォルダーを開き、**中身（manifest.json・css・img・js・lib 等）をすべて選択**
     2. 右クリック → **送る > 圧縮 (zip) フォルダー** を選択
     3. できた `.zip` ファイルの拡張子を `.xpi` にリネーム
5. アドレスバーに `about:addons` と入力 → 右上の歯車アイコン → **ファイルからアドオンをインストール...** を選ぶ
6. 作成した `iniad_plus_firefox.xpi` を指定し、確認ダイアログで **追加** を押す

---

### C. 通常版 Firefox で使いたい（Mozilla 署名を取得する）

通常版 Firefox は署名済みのアドオンしか恒久的にインストールできません。自分だけで使うための署名 (self-distribution / unlisted) は無料で取得できます。

1. [Firefox Add-on Developer Hub](https://addons.mozilla.org/developers/) でアカウントを登録
2. 左メニューの **Submit a New Add-on** から、B 手順 4 で作成した `.xpi` をアップロード
3. 配布方法の選択では **On your own（自分で配布）= unlisted** を選ぶ
   - AMO のストアには並びません。自分でリンクを共有して使う形です
4. 自動レビューが通ると、署名済みの `.xpi` がダウンロードできるようになります
5. 通常版 Firefox の `about:addons` → 歯車 → **ファイルからアドオンをインストール...** で署名済み `.xpi` を読み込む

> ⚠️ AMO に **公開 (listed)** として提出すると人手レビュー対象になります。非公式拡張のため、unlisted (self-distribution) での署名取得を推奨します。

---

## うまく動かないとき
- **読み込み時に「エラー: There was an error during installation」等が出る**  
  `manifest.json` を直接選択しているかを確認してください（フォルダーや ZIP を選んでもエラーになります）。
- **`about:addons` で警告が出る**  
  通常版 Firefox を使っている場合は署名が必要です。A または C の手順を利用してください。
- **機能が反映されない**  
  対象ページ (`https://moocs.iniad.org/`, `https://docs.google.com/presentation/*`, `https://www.ace.toyo.ac.jp/ct/home*`) を開いた状態で、一度タブを再読み込みしてください。

---

## このリポジトリで行った移植作業
- `manifest.json` に Firefox 用の `browser_specific_settings.gecko`（ID と最小バージョン）を追加
- Chrome Web Store に関する記述を README から削除し、Firefox 向けのインストール手順に差し替え
- 拡張機能本体の JavaScript / CSS は本家のものをそのまま利用しています

---

## フォーク元 / 著作権 / ライセンス
- 本体の実装・機能・免責事項・ライセンスは、すべてフォーク元の [Kensuke-sam/iniad_plus](https://github.com/Kensuke-sam/iniad_plus) に準拠します。詳細は本家の README を参照してください。
- 本リポジトリは Firefox 向けの移植作業のみを行っており、本家の内容を代弁するものではありません。
