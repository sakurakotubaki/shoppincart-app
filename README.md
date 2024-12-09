This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Shopping Cart App with Redux Toolkit

このプロジェクトは、Redux Toolkitを使用した基本的なショッピングカートアプリケーションです。
状態管理の基礎を学ぶための教育用デモアプリとして作成されています。

## Reduxの基本概念

### 1. Store（ストア）
- アプリケーションの状態（state）を保持する中央データストア
- このアプリでは、`store/store.ts`で定義
- 商品の情報や数量などのデータを一元管理

```typescript
// store/store.ts
export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
```

### 2. State（状態）
- アプリケーションのデータを表すオブジェクト
- このアプリでは、商品の配列を管理
```typescript
// store/cartSlice.ts
interface CartState {
  items: Product[];  // 商品の配列
}
```

### 3. Action（アクション）
- 状態を変更するためのイベント
- このアプリでは、数量の増減アクション
```typescript
// store/cartSlice.ts
incrementQuantity: (state, action: PayloadAction<number>) => {
  const item = state.items.find(item => item.id === action.payload);
  if (item) {
    item.quantity += 1;
  }
}
```

### 4. Reducer（レデューサー）
- アクションを受け取り、状態を更新する関数
- 現在の状態とアクションから、新しい状態を生成
```typescript
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    incrementQuantity: ...,
    decrementQuantity: ...,
  },
});
```

### 5. Dispatch（ディスパッチ）
- アクションを発行する関数
- コンポーネントからアクションを送信する際に使用
```typescript
// コンポーネント内での使用例
const dispatch = useDispatch();
dispatch(incrementQuantity(productId));
```

## データフローの流れ

1. ユーザーがボタンをクリック
2. コンポーネントがdispatchを使ってアクションを発行
3. Reducerがアクションを受け取り、状態を更新
4. 更新された状態が自動的にUIに反映

```
User Action → Dispatch → Action → Reducer → New State → UI Update
```

## 主要コンポーネント

### 1. ProductModal（商品モーダル）
- 商品の詳細表示と数量調整
- Reduxの状態を参照・更新

### 2. CartPage（カートページ）
- カートに追加された商品の一覧
- 合計金額の計算と表示

## Reduxを使用するメリット

1. 予測可能な状態管理
   - 状態の変更が一方向のデータフローで行われる
   - デバッグが容易

2. パフォーマンス最適化
   - 必要なコンポーネントのみが再レンダリング
   - 無駄な更新を防ぐ

3. 開発効率
   - 状態ロジックの集中管理
   - コードの保守性向上

## 開発環境

- Next.js
- TypeScript
- Redux Toolkit
- Tailwind CSS

## 始め方

```bash
# プロジェクトのクローン
git clone [repository-url]

# 依存関係のインストール
bun install

# 開発サーバーの起動
bun dev
```
