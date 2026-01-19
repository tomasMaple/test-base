# Luke's Feedback v3 - Implementation Plan

This plan implements the "Call Transcript" feedback from Luke's v3 review, organized by page for **parallel agent execution**.

---

## Page 1: Main Dashboard Page ✅ COMPLETED

**Files modified:**
- `src/app/borrower/page.tsx`
- `src/app/borrower/components/portfolio-summary.tsx`
- `src/app/borrower/components/loan-card.tsx`
- `src/app/borrower/components/loans-table.tsx`
- `src/app/borrower/components/filter-sort-bar.tsx`
- `src/app/borrower/types.ts`
- `src/app/borrower/mock-data.ts`

### 1.1 Top Cards - Add "New Loan" Button (Disabled) ✅
**File:** `portfolio-summary.tsx`
- Added disabled `<Button>` with text "New loan" to the Total Borrowed GroupedCard
- Position: bottom of card (consistent with other card buttons)
- Uses `variant="secondary"`, `disabled={true}`, and Plus icon

### 1.2 Rename "Interest" to "Next Interest Payment" ✅
**File:** `portfolio-summary.tsx`
- Changed card title from "Interest Payments" to "Next Interest Payment"

### 1.3 Interest Payment Includes Fees (Code Comment) ✅
**File:** `portfolio-summary.tsx`
- Added comment: `// Note: Interest payment amount includes fees`

### 1.4 Default to Table View ✅
**File:** `page.tsx`
- Changed default view from `'cards'` to `'table'`
- Updated localStorage fallback to default to `'table'`

### 1.5 Add Interest Rate to Loan Cards and Table ✅
**Files:** `loan-card.tsx`, `loans-table.tsx`, `types.ts`, `mock-data.ts`

**Data model:**
- Added `protocolFee: number` to `Loan` interface
- Added `protocolFee: 0.0025` (0.25%) to all 5 mock loans

**Loan Card changes:**
- Added interest rate display (e.g., "10.25%") in header row
- Shows Net Rate + Protocol Fee breakdown on hover using BaseTooltip
- Format: "Net: 10.00% + Protocol: 0.25%"

**Table changes:**
- Added "Interest Rate" column with hover tooltip
- Format: "10.25%" with info icon
- Tooltip shows breakdown on hover

### 1.6 Collateral Display on Loan Cards ✅ (REVISED)
**File:** `loan-card.tsx`
- Originally added collateral amount + USD value
- **Revised per feedback:** Now shows only the collateral token logo (no amount or USD value)
- Full details available on loan details page

### 1.7 Margin Call & Liquidation Column Structure ✅
**File:** `loans-table.tsx`
- Updated both columns to show:
  - Main value: Price (e.g., "$62,498")
  - Subtext: "at {X}% LTV" (e.g., "at 70% LTV")

### 1.8 CSV Export - Extended Columns ✅
**File:** `filter-sort-bar.tsx`
- Extended CSV with 20 columns including:
  - Collateral Value (USD)
  - Initial LTV (%)
  - Net Interest Rate (%)
  - Protocol Fee (%)
  - Total Interest Rate (%)
  - Current Price

### 1.11 CSV Export - Column Reordering ✅
**File:** `filter-sort-bar.tsx`
- Reordered columns to match requested structure:
  1. Loan ID, Entity, Principal (USD), Payment Coin, Collateral Amount, Collateral Coin, Collateral Value (USD)
  2. Current LTV (%), Margin Call Price, Margin Call LTV (%), Liquidation Price, Liquidation LTV (%), Initial LTV (%)
  3. Status, Interest Due Date, Interest Amount (USD), Net Interest Rate (%), Protocol Fee (%), Total Interest Rate (%), Current Price
- Margin Call Price now comes before Margin Call LTV
- Liquidation Price now comes before Liquidation LTV
- Renamed "Collateral Type" to "Collateral Coin"

### 1.9 LTV Column - Show Initial LTV ✅
**File:** `loans-table.tsx`
- Changed column header from "LTV" to "LTV / Initial LTV" for clarity
- Changed values to show "Current LTV / Initial LTV" instead of "Current LTV / Margin Call LTV"
- Example: "72% / 55%" shows current vs initial

### 1.10 Rename "Refund" to "Initial LTV" on Cards ✅
**Files:** `loan-card.tsx`, `ltv-gauge.tsx`
- Renamed "Refund X%" to "Initial LTV X%" in the LTV legend on loan cards
- Updated both the inline legend in loan-card.tsx and the LtvDisplay component in ltv-gauge.tsx
- Applies to main dashboard cards and loan details page

---

## Page 2: Loan Details Page ✅ COMPLETED

**Files modified:**
- `src/app/borrower/loans/[id]/page.tsx`

### 2.1 Margin Call Alert - Show Two Options Upfront ✅
**Implementation:**
- When loan has `status === 'margin-call'`, alert now shows both options side-by-side

**Option A: Add Collateral**
- Calculates collateral needed to restore to **initial LTV** (e.g., 55%)
- Shows amount in collateral token (6 decimals) with copy button
- Shows USD equivalent underneath (≈ $X,XXX,XXX.XX)

**Option B: Pay Down Principal**
- Calculates total payment needed (principal + accrued interest + make-whole fee)
- Shows total amount only (breakdown shown in LTV Calculator)
- Includes copy button for the total

**Design:**
- Two boxes with red background (`bg-negative/15`) - no borders
- Compact layout: `gap-50`, `p-75`, `mb-25` for tighter spacing
- Labels in red uppercase (`text-negative font-medium uppercase`)
- Copy buttons in header row of each box

### 2.2 Remove LTV Calculator Tab ✅
- Removed LTV Calculator tab trigger from TabsList
- Removed LTV Calculator TabsPanel component
- Removed unused components: `LtvCalculatorTab`, `LtvCalculatorLayout`, `SimulationResultsCard`
- Cleaned up unused imports (`LtvGauge`, `CollateralType`)
- Calculator now only exists at `/borrower/calculator`

---

## Page 3: LTV Calculator (Standalone Page) ✅ COMPLETED

**Files modified:**
- `src/app/borrower/calculator/page.tsx`

### 3.1 Principal Repayment - Show Total with Breakdown ✅
**Implementation:**
- When `principalPaydown > 0`, shows breakdown card with:
  - **Total to pay** (highlighted with token logo)
  - **Breakdown section:**
    - Principal amount
    - Accrued interest (with days since last payment)
    - Make-whole fee (with recall period days)

**Calculation logic:**
- Accrued interest = `(interestRate / 365) * daysSinceLastPayment * principalUsd`
- Make-whole fee = `(interestRate / 365) * recallPeriodDays * principalPaydown`
- Total = principal + accrued interest + make-whole fee

**UI:**
- Card with `bg-primary` background, rounded corners
- Total at top with larger font
- Breakdown below divider with smaller muted text

### 3.2 Add LTV Legend to Calculator ✅
**File:** `calculator/page.tsx`
- Added legend row above the LTV gauge showing: Initial LTV, Margin Call, Liq. Level
- Matches the format used on loan cards and loan details page exactly
- Layout: "Simulated LTV {value}%" on left, legend items on right
- Shows colored indicators (green for Initial LTV, red for Margin Call, dark red for Liquidation)

---

## Page 4: Transactions Page ✅ COMPLETED

**Files modified:**
- `src/app/borrower/transactions/page.tsx`
- `src/app/borrower/types.ts`
- `src/app/borrower/mock-data.ts`
- `src/components/ui/dialog.tsx`

### 4.1 Split Loans Filter into Current and Past ✅
**Implementation:**
- Created `LoanFilterPopover` component with checkbox-based multi-select
- Two sections: "Current Loans" and "Past Loans" with section headers
- Each loan shown with checkbox, last 4 of contract address, entity name, and collateral icon
- "Select all" checkbox for each section with indeterminate state support
- Default: All loans selected (current AND past)
- Filter state resets on page refresh (no persistence)

**Data model changes:**
- Added `isActive: boolean` to `Loan` interface in `types.ts`
- Added `isActive: true` to all 5 existing loans
- Added 2 past loans (`LOAN-PAST-001`, `LOAN-PAST-002`) with `isActive: false`
- Added helper functions: `getCurrentLoans()`, `getPastLoans()`

### 4.2 Add CSV Export for Transactions ✅
- Added "Export CSV" button to toolbar
- Exports all currently filtered transactions
- Extended columns: Loan ID, Loan Principal (USD), Loan Collateral Type, Entity, Date, Type, Amount (USD), Payment Coin, Collateral Amount, Collateral Type, Status, Transaction Hash

### 4.3 Add "Get Statement" Feature ✅
**Implementation:**
- Created `StatementModal` component
- Date range selector with start/end date inputs
- Preview sections showing: Balances, Loans Activity, Payments summary
- Download PDF button (placeholder/disabled with "Coming soon" text)
- Consistent spacing between sections

### 4.4 Add "Get Audit Snapshot" Feature ✅
**Implementation:**
- Created `AuditSnapshotModal` component
- Single date picker for any past date
- Shows preview of loans that existed at that date
- Working CSV download with comprehensive loan data (21 columns)
- Uses `getLoansAtDate()` helper to calculate loan states as-of selected date

### 4.6 Audit Snapshot CSV - Column Reordering ✅
**File:** `transactions/page.tsx`
- Reordered audit snapshot CSV columns to match main page export (minus Interest Amount and Interest Due Date)
- Added missing columns: Payment Coin, Margin Call Price, Liquidation Price, Total Interest Rate, Current Price
- New column order:
  1. Loan ID, Entity, Principal (USD), Payment Coin, Collateral Amount, Collateral Coin, Collateral Value (USD)
  2. Current LTV (%), Margin Call Price, Margin Call LTV (%), Liquidation Price, Liquidation LTV (%), Initial LTV (%)
  3. Status, Net Interest Rate (%), Protocol Fee (%), Total Interest Rate (%), Current Price
  4. Start Date, Maturity Date, Is Active (audit-specific columns kept at end)

### 4.5 Additional Improvements ✅
**Multi-select filters for Entity and Type:**
- Converted Entity and Type filters from single-select to multi-select checkboxes
- Created reusable `MultiSelectFilterPopover` component
- Added "Reset filters" button with `RotateCcw` icon (secondary variant, md size)
- Reset button disabled when filters are at default state

**Table Headers and Loan Identifier:**
- Added table header row with columns: Loan ID, Principal, Collateral, Entity, Date, Type, Amount, Status, Tx Hash
- Header row has subtle background, uppercase labels, proper alignment
- Loan Principal column shows value with USDC/USDT token icon (e.g., "12.0M" with USDC icon)
- Collateral column shows type with token icon (e.g., "BTC" with BTC icon)
- Equal spacing between columns using `gap-100`

**Dialog improvements:**
- Added `cursor-pointer` to DialogClose button in `dialog.tsx`
- Clicking outside modals closes them (backdrop click)

---

## Data Model Updates

**File:** `src/app/borrower/types.ts`

```typescript
// Add to Loan interface:
protocolFee: number  // Variable per loan (typically 0.0025 = 0.25%)
isActive: boolean    // true for current loans, false for closed/repaid
```

**File:** `src/app/borrower/mock-data.ts`

Add to each existing loan in `mockLoans`:
```typescript
protocolFee: 0.0025,  // 0.25% for most loans
isActive: true,
```

Add 1-2 **past/closed loans** for testing the filter:
```typescript
// Example past loan (repaid)
{
  id: 'LOAN-PAST-001',
  entityId: 'entity-1',
  entityName: 'Galaxy US',
  // ... other fields
  isActive: false,
  maturityDate: daysAgo(30), // Matured 30 days ago
}
```

Add helper functions:
```typescript
export function calculateAccruedInterest(loan: Loan): number { ... }
export function getLoansAtDate(date: Date): Loan[] { ... }
export function getTransactionsInRange(start: Date, end: Date): PaymentHistoryItem[] { ... }
export function getCurrentLoans(): Loan[] { return mockLoans.filter(l => l.isActive) }
export function getPastLoans(): Loan[] { return mockLoans.filter(l => !l.isActive) }
```

---

## Files Summary by Agent

| Agent | Page | Files |
|-------|------|-------|
| Agent 1 | Main Dashboard | `page.tsx`, `portfolio-summary.tsx`, `loan-card.tsx`, `loans-table.tsx`, `filter-sort-bar.tsx` |
| Agent 2 | Loan Details | `loans/[id]/page.tsx` |
| Agent 3 | LTV Calculator | `calculator/page.tsx`, `mock-data.ts` (helper) |
| Agent 4 | Transactions | `transactions/page.tsx`, `types.ts`, `mock-data.ts` |

---

## Verification Steps

### Main Dashboard
1. Load `/borrower` - verify table view is default
2. Check "New Loan" button appears disabled on first card
3. Verify interest rate shows on loan cards with hover tooltip
4. Check table has interest rate column with correct values
5. Verify margin call/liquidation columns show price + LTV% format
6. Export CSV and verify additional columns present

### Loan Details
1. Navigate to margin-call loan (LOAN-2b5F9d1C)
2. Verify both Option A and Option B display in alert
3. Verify calculations target initial LTV (55%)
4. Confirm LTV Calculator tab is removed

### LTV Calculator
1. Go to `/borrower/calculator`
2. Select a loan and enter principal paydown
3. Verify breakdown shows: Principal + Accrued Interest + Make-whole Fee

### Transactions ✅
1. Go to `/borrower/transactions`
2. Test checkbox filter for current/past loans - ✅ Working with multi-select
3. Export CSV and verify contents - ✅ Includes loan principal and collateral columns
4. Test "Get Statement" with date range - ✅ Modal works, PDF is placeholder
5. Test "Get Audit Snapshot" with past date, verify CSV - ✅ Working CSV download
6. Verify table headers display correctly - ✅ 9 columns with proper spacing
7. Verify Entity and Type filters are multi-select - ✅ Working
8. Test Reset filters button - ✅ Resets all filters to default

---

## Out of Scope
- Initial LTV column in table view (per Chuck - too many columns)

---

## Cleanup

### Navigation - Remove Test Link ✅
**File:** `src/components/app-navbar.tsx`
- Removed "Test" navigation link from the main navbar
- Remaining links: Borrower, LTV Calculator, Transactions, Overview

### New Loan Button - Add "Coming Soon" ✅
**File:** `src/app/borrower/components/portfolio-summary.tsx`
- Changed button label from "New loan" to "New loan (Coming Soon)"
- Clarifies to users that this feature is not yet available

### Interest Payments Modal - Filter Out Past Loans ✅
**File:** `src/app/borrower/components/portfolio-summary.tsx`
- Added filter to only show active loans in the Interest Payments modal
- Past/closed loans no longer appear as "overdue" in the modal

### Margin Calls Card - Rename Button ✅
**File:** `src/app/borrower/components/portfolio-summary.tsx`
- Changed button label from "View Details" to "Cure Margin Call"

### Closed Loans Section on Main Dashboard ✅
**Files modified:**
- `src/app/borrower/page.tsx`
- `src/app/borrower/components/loan-card.tsx`
- `src/app/borrower/components/loans-table.tsx`
- `src/app/borrower/components/index.ts`
- `src/app/borrower/mock-data.ts`

**Implementation:**
- Inactive/closed loans are now displayed in a separate "Closed Loans" section below active loans
- Section header: "Closed Loans" with muted styling
- Respects view mode toggle (cards vs table)

**New components:**
- `ClosedLoanCard` - Simplified card for inactive loans with:
  - Muted styling (`bg-muted`, `opacity-75`)
  - "Closed" status pill instead of health status
  - No LTV gauge, no action buttons, no trigger prices
  - Shows: contract address, entity, principal, collateral amount, initial LTV, closed date
- `ClosedLoansTable` - Simplified table for inactive loans with:
  - Columns: Entity, Principal, Collateral, Initial LTV, Closed Date, Status
  - Muted styling with `opacity-75`
  - No View button (not clickable/navigable)

**Data changes:**
- `mockEntities` now filters to only include active loans (`l.isActive`)
- Active loans shown in main section, closed loans in separate section

### CSV Export - Active Loans Only ✅
**File:** `src/app/borrower/page.tsx`
- Export CSV from main Borrower page now only exports **active loans**
- Uses `getCurrentLoans()` instead of `mockLoans`
- Audit Snapshot (Transactions page) continues to include all loans as expected

### Transactions Page - Principal Display ✅
**File:** `src/app/borrower/transactions/page.tsx`
- Principal column now shows two decimal places (e.g., "12.00M", "5.00K", "8.50M")
