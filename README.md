# メイドちゃん

GASで動作するOpenAI APIのchatを利用したアプリ  

# 使い方

GASでの作成＋Slack連携を前提として進める  

1. プロジェクトの設定 > スクリプトプロパティ に以下2点を追加する
    - OPEN_AI_API_KEY: 自身のOpenAI API Key
    - SLACK_BOT_OAUTH_TOKEN: Slack AppのToken
2. ライブラリにSlackAppを追加する
    - スクリプトID: 1on93YOYfSmV92R5q59NpKmsyWIQD8qnoLYk-gkQBI92C58SPyA2x1-bq
3. 本リポジトリのsrc配下のコードを、GASにスクリプトとして追加する
4. あとはSlackAppといい感じにつないでください
