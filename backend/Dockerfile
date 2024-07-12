# ベースイメージ
FROM node:22.4.0

# 作業ディレクトリの設定
WORKDIR /usr/src/app

# パッケージのコピーとインストール
COPY package*.json ./
CMD ["npm", "install"]

# アプリケーションのソースをコピー
COPY . .

# ビルドの実行
CMD ["npm", "run", "build"]

# アプリケーションの起動
CMD ["npm", "start"]
