# App: searchFoodTrunk
 https://uberchallenge.netlify.app/

## アプリの概要と使い方

- 任意の地点における近場のフードトラック（以下「トラック」）を検索するアプリ。（対応範囲：アメリカ合衆国サンフランシスコ）
- google マップ上の search ボタンをクリックするとマップ上にトラックの位置を示したマーカーが表示される。
- ページ下部に検索されたトラックがリスト表示される。
- マップ上のマーカーかリストのトラックをクリックすればトラック詳細が表示される。

## バックエンドかフロントエンドか

- フロントエンドを主眼としたプロジェクト。
- バックエンド機能は実装していません。API からのデータ取得もフロント側で対応
- ホスティングサイトを利用しているため、インフラやサーバー設定も行っていません。

## 技術スタック

### 開発環境

docker にて nodejs 環境のあるコンテナを立ち上げて開発。  
node.js のバージョンは stable である v16 環境を選定。

- docker
- docker-compose
- node v16.15

### ライブラリ選定

React 最新バージョンである v18 環境にて開発。  
設定ファイル以外は typescript を使用。  
アプリのデザインは、マテリアルデザインでの統一感を意識し、mui（v5）を使用。
google マップライブラリは「react-wrapper」を使用。  
選定理由は googleMap デベロッパーページにて本ライブラリが紹介されていたため。

- react v18.2
- mui v5.8
- @googlemaps/react-wrapper v1.1
- typescript v4.7

## 参考にしたサイト

[react-warapper](https://developers.google.com/maps/documentation/javascript/react-map?hl=ja)

[google-map-api](https://developers.google.com/maps/documentation/javascript/reference)

[mui](https://developers.google.com/maps/documentation/javascript/reference)

[react-testing-libray](https://qiita.com/ossan-engineer/items/4757d7457fafd44d2d2f)

[cypress](https://docs.cypress.io/guides/references/best-practices)

## 履歴書のリンクやプロフィールリンク

[開発者 github](https://github.com/junwatanabe72)

[アプリのリポジトリ](https://github.com/junwatanabe72/uberChallenge)

[アプリページ](https://uberchallenge.netlify.app/)

## 要求されていることで欠けていること

- googlemap 上のマーカーにトラックの情報ウインドウ設定
- 座標が同じトラックがあった場合のマーカー位置調整（現状重なってしまう場合がある）
- 各トラックの詳細ページ（現状は、該当トランクの情報を持ったmodalがオープンする）
- 対象エリア（サンフランシスコ）外で検索した場合の対応
- view と store の分離（recoil ライブラリ導入）7/20済
- 検索設定の変更 7/21 circleの設定追加。
- スマホで使用する際の height 調整（縦スクロールできてしまう）
- 初期取得するトラック配列のキャッシュ化(できるか？)
- 各種設定(head タグ内、pwa)
- テストのコードの数

## その他（所感）
- googlemap 関連のライブラリが多々あり、最初迷子になりました。
- react-wapper の公式チュートリアルが非常に参考になりました。
- フロントエンド側のテストが不慣れ。react-testing-libray と cypress 等のテストライブラリの使い方を勉強したい。  
