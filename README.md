# Maple Prototype Template

A design system template for creating UI prototypes with AI assistance.

---

## Getting Started (For Non-Developers)

### Step 1: Hey

### Step 2: Download This Template

#### Option A: Download as ZIP (Easiest)

1. Click the green **"Code"** button at the top of this page
2. Click **"Download ZIP"**
3. Unzip the folder to your Desktop or Documents

#### Option B: Clone with Git (If you have Git installed)

```bash
git clone <repository-url>
```

---

### Step 3: Open the Project

1. Open **Cursor** (or your code editor)
2. Click **File → Open Folder**
3. Select the unzipped folder (e.g., `maple-prototype-template`)

---

### Step 4: Install Dependencies

1. In Cursor, press **Ctrl+`** (or **Cmd+`** on Mac) to open the terminal
2. Type:

```bash
npm install
```

3. Press **Enter** and wait for it to finish (takes 1-2 minutes)

---

### Step 5: Run the Development Server

1. In the same terminal, type:

```bash
npm run dev
```

2. Press **Enter**
3. Wait until you see something like:

```
▲ Next.js 16.x
- Local: http://localhost:3000
```

4. Open your browser and go to **http://localhost:3000**

🎉 **You should now see the prototype running!**

---

## Working with AI

### Using Cursor AI

1. Press **Cmd+K** (Mac) or **Ctrl+K** (Windows) to open the AI chat
2. Ask the AI to make changes, for example:
   - "Create a new page for account settings"
   - "Add a card showing user balance"
   - "Make the button bigger"

### Important Files

The AI will automatically follow rules in these files:

- `AGENTS.md` — Entry point for AI rules
- `rules/prototype-dev.md` — Detailed component guidelines
- `rules/component-dev.md` — Component development rules

---

## Stopping the Server

To stop the development server:

1. Click in the terminal
2. Press **Ctrl+C**

---

## Common Commands

| Command       | What it does                  |
| ------------- | ----------------------------- |
| `npm run dev` | Starts the development server |
| `npm install` | Installs dependencies         |
| **Ctrl+C**    | Stops the server              |

---

## Troubleshooting

### "npm: command not found"

You need to install Node.js (see Step 1.1)

### "Port 3000 is already in use"

Another server is running. Either:

- Stop it (Ctrl+C in its terminal)
- Or run on a different port: `npm run dev -- -p 3001`

### Page not loading

Make sure the terminal shows the server is running, then refresh the browser.

---

## Need Help?

Ask the AI in Cursor! Type something like:

- "Help me understand this error: [paste error]"
- "How do I add a new page?"
