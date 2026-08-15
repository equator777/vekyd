# 🛠️ Vekyd - Pre-Owned Goods, Groceries & Certified Skilled Trades Marketplace

A dynamic, vibrant, colorful e-commerce web application built for registered users to **buy & sell used goods** (tools, tech, furniture, vehicles, vintage items) and **hire/register certified trade professionals** under dedicated categories:
- **Craftsman** (Furniture design, joinery, woodcarving, leather art)
- **Welder** (MIG/TIG welding, pipe fabrication, structural metalwork, custom gates)
- **Electrician** (200A panel upgrades, EV chargers, smart home rewiring)
- **Plumber** (Tankless water heaters, copper repiping, emergency plumbing)
- **Mason** (Bricklaying, stone patios, fireplaces, retaining walls)
- **Carpenter** (Framing, decks, custom built-in cabinetry)
- **Painter** (Interior/exterior spray painting, drywall repair)
- **HVAC Specialist** (Heat pumps, AC repair, air quality)
- **Landscaper** (Hardscaping, sod installation, smart irrigation)

---

## 🎨 Key Features & Aesthetics

- **Vibrant & Luminous UI**: Vibrant dark neon default theme with switchable light theme, glassmorphism cards, glowing badges, gradient text headers, and smooth micro-animations.
- **Used Goods Marketplace**: Filter by category, condition (*Like New, Excellent, Good, Fair*), price range slider, sort by price, item details modal with price negotiation ("Send Offer"), and instant buy actions.
- **Skilled Tradesmen Directory**: Dedicated horizontal trade category bar and grid showcase. Professional profiles feature hourly rates, verified badges, skills tags, portfolio galleries, direct phone/email contact, and instant "Request Quote" modal with celebratory confetti.
- **User Registration & Auth**: Authentication modal supporting registration as a standard buyer/seller or trade professional.
- **Local Persistence**: State (listings, registered trade profiles, cart, favorites) seamlessly persists in browser `localStorage`.
- **Cart & Checkout Drawer**: Slide-out cart with quantity controls, subtotal/shipping breakdown, and instant free checkout simulation.

---

## 🚀 Free Hosting Instructions (GitHub Pages, Netlify, Vercel)

This application is engineered as a static Single-Page Application (SPA) with relative base path configuration (`base: './'`), making it 100% ready for free static hosting.

### Option 1: GitHub Pages (Recommended)

1. **Initialize Git & Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of TradeCraft & Swap"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

2. **Deploy to GitHub Pages with 1 Command**:
   ```bash
   npm run deploy
   ```
   *This automatically builds the app and publishes the `dist` directory to the `gh-pages` branch.*

3. **Enable Pages in GitHub Repository**:
   - Go to GitHub Repo → **Settings** → **Pages**.
   - Under **Build and deployment**, select `Source: Deploy from a branch`, and choose branch `gh-pages`.
   - Your site will be live at `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`.

---

### Option 2: Netlify (1-Click Free Hosting)

1. Sign in to [Netlify](https://www.netlify.com/).
2. Click **Add new site** → **Import an existing project**.
3. Connect your GitHub repository.
4. Netlify will auto-detect configuration from `netlify.toml`:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Click **Deploy Site**. Your app will be live immediately!

---

### Option 3: Vercel (1-Click Free Hosting)

1. Sign in to [Vercel](https://vercel.com/).
2. Click **Add New** → **Project**.
3. Import your GitHub repository.
4. Vercel automatically detects `Vite` framework configuration and `vercel.json` rewrites.
5. Click **Deploy**. Your app will be live on a custom `.vercel.app` domain!

---

## 💻 Local Development Setup

To run locally on your computer:

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 🛠️ Built With

- **React 18**
- **Vite**
- **Lucide React Icons**
- **Canvas Confetti**
- **Vanilla CSS3 Custom Properties & Tailwind Utilities**
