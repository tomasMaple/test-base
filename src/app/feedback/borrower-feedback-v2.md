# Borrower Dashboard Implementation Plan

## Global Rule: USDC/USDT Display Pattern

**Applies to:** All files displaying monetary amounts in USDC/USDT

**Pattern:** Always show `<TokenLogo token={loan.paymentCoin} size="xs" />` before the amount value. Never show "USDC" or "USDT" as text after amounts.

**Example:**
```tsx
<div className="flex items-center gap-50">
  <TokenLogo token={loan.paymentCoin} size="xs" />
  <span>5,000,000</span>
</div>
```

**Reference:** See `InterestPaymentsModal` in `portfolio-summary.tsx` for existing pattern with `TokenLogo`.

---

## ✅ Task 1: Currency Display - Show Token Logo Before USDC/USDT Amounts [COMPLETED]

**Files:** `portfolio-summary.tsx`, `loan-card.tsx`, `loans/[id]/page.tsx`

**Context:** Replace `$X` format with `[USDC logo] X` or `[USDT logo] X` pattern throughout. Collateral prices (margin call price, liquidation price) stay in USD as they represent collateral asset prices.

**Changes:**

1. **`portfolio-summary.tsx`**:
   - ✅ Updated `formatCurrency()` and `formatFullCurrency()` to accept optional `includeSymbol` parameter
   - ✅ Wrapped individual loan principal/interest displays with TokenLogo + amount pattern
   - ✅ Applies to: `MarginCallLevelsModal` loan amounts, `InterestPaymentsModal` amounts
   - ✅ Kept aggregate totals (Portfolio cards, entity totals) as USD with $ signs

2. **`loan-card.tsx`**:
   - ✅ Updated principal display to use TokenLogo pattern with `gap-25` spacing
   - ✅ Updated interest amount display to use TokenLogo pattern with `gap-25` spacing
   - ✅ Icon sizes aligned with text size (sm for h4 headings)

3. **`loans/[id]/page.tsx`**:
   - ✅ Updated principal display on loan detail page with TokenLogo
   - ✅ Updated interest amount due with TokenLogo
   - ✅ Added `includeSymbol` parameter to `formatCurrency()`

**Keep in USD:** Margin call prices, liquidation prices, collateral values, aggregate totals (these are asset prices or aggregates, not individual loan amounts)

**Acceptance Criteria:**
- ✅ Individual loan principal shows as `[USDC icon] 5,000,000` not `$5,000,000`
- ✅ Individual loan interest shows as `[USDC icon] 41,667` not `$41,667`
- ✅ Margin call/liquidation prices remain as `$62,498` (these are BTC/ETH prices)
- ✅ Portfolio aggregate totals remain as `$5.0M` (represent both USDC/USDT)
- ✅ Consistent `gap-25` spacing between logo and amount throughout

---

## ✅ Task 2: Total Borrowed Card - Add Total Collateral [COMPLETED]

**Files:** `portfolio-summary.tsx`, `mock-data.ts`

**Context:** The "Total Borrowed" card only shows `data.totalPrincipal`. Add total collateral value.

**Changes:**

1. **`mock-data.ts`** - Update `calculatePortfolioSummary()`:
   - ✅ Added `totalCollateralUsd` calculation: `mockLoans.reduce((sum, l) => sum + l.collateralValueUsd, 0)`
   - ✅ Added to return object

2. **`portfolio-summary.tsx`** - Update `PortfolioSummaryData` interface:
   - ✅ Added `totalCollateralUsd: number`

3. **`portfolio-summary.tsx`** - Update "Total Borrowed" GroupedCard:
   - ✅ Show total collateral as secondary line: "Collateral: $111.4M"
   - ✅ Collateral value stays in USD (it's asset value, not loan currency)

**Acceptance Criteria:**
- ✅ Total Borrowed card shows principal on main line: `$65.5M`
- ✅ Secondary line shows "Collateral: $111.4M" in USD

---

## ✅ Task 3: Margin Call Modal - Make Loan Rows Clickable [COMPLETED]

**File:** `portfolio-summary.tsx`

**Context:** `MarginCallLevelsModal` displays loan rows. Each row should navigate to `/borrower/loans/${loan.id}`.

**Changes:**

1. ✅ Added `useRouter` import from `next/navigation` at line 4

2. ✅ Updated `MarginCallLevelsModal`:
   - Added `const router = useRouter()` at line 120
   - Made loan row div clickable with `onClick={() => router.push(`/borrower/loans/${loan.id}`)}` at line 156
   - Added `cursor-pointer hover:border-border-strong transition-colors` classes at line 149

**Acceptance Criteria:**
- ✅ Each loan row in margin call modal is clickable
- ✅ Clicking navigates to that loan's detail page
- ✅ Hover state shows cursor pointer and border change

---

## ✅ Task 4: Loan Card - Add Price Drop % to Margin Call [COMPLETED]

**File:** `loan-card.tsx`

**Context:** Show percentage price drop needed to trigger margin call (e.g., "BTC -18% to MC").

**Changes:**

1. ✅ Added helper function at line 45:
   ```tsx
   function calculatePriceDropPercent(currentPrice: number, triggerPrice: number): number {
     return ((currentPrice - triggerPrice) / currentPrice) * 100
   }
   ```

2. ✅ Updated Row 4 margin call display to include percentage at line 183-185:
   - Format: "Margin call if BTC < $62,498 (36% drop)"
   - Only shows percentage if loan is not already in margin call

**Acceptance Criteria:**
- ✅ Shows "Margin call if BTC < $62,498 (36% drop)"
- ✅ Percentage represents how much price must fall
- ✅ Hidden when already margin called

---

## ✅ Task 5: Initial LTV - Add to Data Model, LTV Bar as Refund Level, Display Everywhere [COMPLETED]

**Files:** `types.ts`, `mock-data.ts`, `ltv-gauge.tsx`, `loan-card.tsx`, loan detail page

**Context:** Initial LTV serves dual purpose: (1) historical reference, (2) refund threshold on LTV bar. When current LTV drops below initial LTV, borrower can request collateral back.

**Changes:**

1. **`types.ts`** - Add to `Loan` interface:
   - ✅ `initialLtv: number`

2. **`mock-data.ts`** - Add `initialLtv` to each loan in `mockLoans`:
   - ✅ Calculate realistic initial LTV for each loan (typically 40-55%)

3. **`ltv-gauge.tsx`** - Add refund level marker:
   - ✅ Add `refundLtv?: number` prop to `LtvGaugeProps`
   - ✅ Add green marker at refund level position (use same pattern as margin call marker)
   - ✅ Marker appears on left side of bar (low LTV = over-collateralized)

4. **`loan-card.tsx`**:
   - ✅ Pass `loan.initialLtv` to `LtvGauge` as `refundLtv`
   - ✅ Add to legend: green square + "Refund {initialLtv}%"

5. **Loan detail page** - Display Initial LTV in summary stats
   - ✅ Pass `refundLtv` to `LtvDisplay` in Summary tab
   - ✅ Add "Initial LTV" metric to LTV thresholds card in Loan Terms tab

**Acceptance Criteria:**
- ✅ Each loan has `initialLtv` in data
- ✅ LTV bar shows green marker at initial LTV position
- ✅ Legend shows "Refund X%" with green indicator
- ✅ Loan detail page shows Initial LTV stat

---

## ✅ Task 6: LTV Calculator - Separate Page with Loan Selector [COMPLETED]

**Files:** New `app/borrower/calculator/page.tsx`, update navigation

**Context:** LTV calculator moves to its own page with a loan selector dropdown.

**Changes:**

1. ✅ Created `app/borrower/calculator/page.tsx`:
   - Loan selector dropdown at top showing all available loans
   - Dropdown format: `{Entity} - {Principal} {PaymentCoin} - {CollateralType}`
     - Example: "Galaxy US - 5,000,000 USDC - BTC"
   - Three simulation scenarios implemented:
     - Price change (with slider and text input)
     - Add/remove collateral (with mode selector)
     - Principal paydown (with make-whole fee display)

2. ✅ **Loan selector component:**
   - Simple select dropdown with formatted option text
   - Automatically resets calculator when loan changes
   - Shows "Choose a loan..." placeholder when none selected

3. ✅ **Make-whole fee calculation** (for principal paydown scenario):
   ```tsx
   const makeWholeFee = (loan.interestRate / 365) * loan.recallPeriodDays * paydownAmount
   ```
   - Displays in warning-styled box below paydown input when amount > 0
   - Shows token logo before amount
   - Includes recall period days in label

4. ✅ **Calculator features:**
   - Real-time LTV gauge visualization
   - Live comma formatting for all number inputs
   - Quick preset buttons (Current, Margin Call, Liq. Level)
   - Reset button to clear all simulations
   - Results summary showing new LTV, remaining principal, and updated trigger prices

**Acceptance Criteria:**
- ✅ New page at `/borrower/calculator`
- ✅ Dropdown shows all loans with Entity - Principal - Collateral format
- ✅ Selecting loan loads its current values into calculator
- ✅ Principal paydown scenario shows make-whole fee
- ✅ Make-whole fee uses loan's interest rate and recall period
- ✅ "LTV Calculator" link added to top navigation
- ✅ "Landing" link removed from top navigation

---

## Task 7: Loan List - Dual View Toggle + CSV Export

**Files:** `filter-sort-bar.tsx`, `entity-section.tsx`, `page.tsx` (main dashboard)

**Context:** Toggle between card view and table view. Remember user's preference.

**Changes:**

1. **`page.tsx`** - Add view state with localStorage persistence:
   ```tsx
   const [viewMode, setViewMode] = useState<'cards' | 'table'>(() => {
     if (typeof window !== 'undefined') {
       return localStorage.getItem('loanViewMode') as 'cards' | 'table' || 'cards'
     }
     return 'cards'
   })
   
   useEffect(() => {
     localStorage.setItem('loanViewMode', viewMode)
   }, [viewMode])
   ```

2. **`filter-sort-bar.tsx`**:
   - Add `viewMode` and `onViewModeChange` props
   - Add toggle button group (Grid icon / List icon) in the bar
   - Position before sort dropdown

3. **`entity-section.tsx`**:
   - Add `viewMode` prop
   - If `cards`: render current `<LoanCard>` components
   - If `table`: render `<table>` with columns: Collateral, Principal (with token logo), LTV, MC Price, Interest Due, Status

4. **CSV Export**:
   - Add "Export CSV" button at end of filter bar
   - Generate CSV with loan data, trigger download

**Acceptance Criteria:**
- Toggle switches between card and table views
- View preference persists across page reloads
- Table view shows loans in compact rows with token logos for amounts
- Export CSV downloads loan data

---

## Task 8: Transactions Page (Replaces History Tab on Loan Detail)

**Files:** New `app/borrower/transactions/page.tsx`, update loan detail page

**Context:** Consolidated transactions view for all loans. Remove history tab from loan detail page.

**Changes:**

1. Create `app/borrower/transactions/page.tsx`:
   - Table columns: Loan ID, Entity, Date, Type, Amount (with token logo), Status, Tx Hash (link)
   - Filters: Loan ID dropdown, Entity dropdown, Transaction type
   - Sort by date (default: newest first)
   - Loan ID clickable → navigates to loan detail

2. **`mock-data.ts`** - Add helper:
   ```tsx
   export function getAllTransactions(): (PaymentHistoryItem & { entityName: string })[] {
     return mockPaymentHistory
       .map(tx => {
         const loan = getLoanById(tx.loanId)
         return { ...tx, entityName: loan?.entityName || '' }
       })
       .sort((a, b) => b.date.getTime() - a.date.getTime())
   }
   ```

3. **Loan detail page** - Remove the History tab entirely

4. Add navigation link to transactions page in dashboard header

**Acceptance Criteria:**
- New page at `/borrower/transactions`
- Shows all transactions across all loans
- Loan ID is first column, clickable to loan detail
- Amount column shows token logo before value
- History tab removed from loan detail page

---

## Suggested Implementation Order

1. **Task 1** - Currency display pattern (foundational, affects all other tasks)
2. **Task 5** - Initial LTV data + refund level (data model change)
3. **Task 2** - Total collateral on summary card
4. **Task 3** - Clickable margin call modal rows
5. **Task 4** - Price drop percentage
6. **Task 7** - View toggle + CSV export
7. **Task 6** - LTV Calculator page
8. **Task 8** - Transactions page + remove history tab
