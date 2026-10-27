# Northwind Goods — Sourcepeek test shop

A small Next.js 16 (App Router, Turbopack) store wired to free public APIs, built so that **every accordion in Sourcepeek's More → view** has something real to show.

```bash
npm install          # sourcepeek 5.10.3 comes from vendor/sourcepeek-5.10.3.tgz
npm run dev          # http://localhost:3000
```

Optional: put `ANTHROPIC_API_KEY=…` (or any key from the Sourcepeek README) in `.env.local` for Summary, Change with AI, Refactor and Randomise.

To test a newer Sourcepeek build: `npm pack` it into `vendor/` and point `package.json` at the new tgz.

## APIs used

| API | Used for | Client style |
| --- | --- | --- |
| [DummyJSON](https://dummyjson.com) | products, categories, search, login (`emilys` / `emilyspass`), `/auth/me`, carts, `/http/500` | `fetch` (lib/api.ts), axios + Bearer interceptor (lib/authClient.ts) |
| [Frankfurter](https://frankfurter.dev) | live EUR/GBP/JPY/CHF rates for the currency switcher | `axios.create({ baseURL })` (lib/rates.ts) |
| [Random User](https://randomuser.me) | reviewer names and avatars | `useSWR` (components/Reviews.tsx) |
| [Open-Meteo](https://open-meteo.com) | "arrives on…" delivery estimate | `XMLHttpRequest` (components/DeliveryEstimate.tsx) |
| local `app/api/cart` | server cart (starts empty → good for **Randomise**) | `fetch` |
| local `app/api/promo/[code]` | promo codes, 404 for unknown codes | `fetch` |
| local `app/api/stock-stream` | live "someone just bought…" feed | `EventSource` |

## Where to click for each accordion

| Accordion | Click this | What you should see |
| --- | --- | --- |
| **Summary / Refactor** | anything (try a product card on `/`, or `CheckoutSummary` on `/cart`) | needs an AI key |
| **Change with AI** | Header link (CSS Module), Order summary on `/cart` (SCSS module + `$tokens` partial), product card (Tailwind) | "Styled with" differs per component; try *make the price red*, *add a PriceTag component*, *add a new page /hihi* |
| **Renders & state** | a product card on `/` | flash-sale countdown re-renders every second → `onAddToCart new reference, same value (prop)` rows; change currency → price prop changes |
|  | an Alpha/Beta/Gamma tile on `/lab` | buttons for state change, deep change (`config changed inside {theme: {…}}`), new object same contents, parent-only re-render |
| **Network** | product grid on `/` | DummyJSON GET with `{category}` placeholder; Frankfurter via axios baseURL |
|  | reviews on `/products/1` | SWR → randomuser.me; Delivery box → XHR to Open-Meteo |
|  | Add to cart on a product page | POST `/api/cart` with example payload; **Randomise** on GET `/api/cart` (cart page) |
|  | Order summary on `/cart` | POST `dummyjson.com/carts/add`; promo GET `/api/promo/{code}` (404 for bad codes) |
|  | Sign-in form on `/account` | POST `/auth/login`, axios GET `/auth/me` + `/carts/user/{id}` |
| **Storage** | product grid | `nw:wishlist` (custom `useLocalStorage`), `nw-cart` (zustand persist), `nw:currency` (persist via constant) |
|  | product page | `review-draft:{productId}` (dynamic key), `recently-viewed` (sessionStorage), Cache Storage `nw-products-v1` |
|  | sign-in form | `auth_token` (real JWT → masked), `nw:user` (JSON with `refreshToken` → field masked) |
|  | Storage playground on `/lab` | *Seed secrets* adds an `apiKey` and a JWT; *Fill Cache Storage*; `checkout-step` in sessionStorage |
| **Accessibility** | product card | icon-only wishlist button, `<img>` with no alt |
|  | promo banner on `/` | `alt="image.png"`, low-contrast text, focusable button inside `aria-hidden` |
|  | category chips on `/` | `<div onClick>` not keyboard reachable, `tabIndex={3}` |
|  | newsletter in footer | placeholder-only field, contrast 2.29:1 |
|  | footer | `h2 → h4` skip, icon link with no name |
|  | product gallery / quantity buttons | the clean ones, for comparison |
| **Meta tags** | anything on `/` | short description, no canonical, partial Open Graph |
|  | `/products/1` | everything filled in (all good) |
|  | `/lab` | two h1s, title set only by JavaScript |
|  | `/cart` | `noindex` robots tag |
| **Report** | `/lab` → *Failures for the Report* | 500, 404, 400 bad login, network error, `console.error`, uncaught error, unhandled rejection, broken image — then open Report on anything |

Also worth trying: **Text from translations** (click the hero title — it comes from `messages/en.json`), **Used in** (click a product card → `ProductGrid.tsx`), **git history** (four commits are included), and **Mock this** on the products request to see the MOCK badge and the amber bar.
