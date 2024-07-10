# ベースイメージ
FROM node:22.4.0

# 作業ディレクトリの設定
WORKDIR /usr/src/app

# パッケージのコピーとインストール
COPY package*.json ./
RUN npm install

# アプリケーションのソースをコピー
COPY . .

# ビルドの実行
RUN npm run build

# アプリケーションの起動
CMD ["npm", "start"]
