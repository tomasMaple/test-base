import { Sidebar, type SidebarItemType } from "@/components/ui/sidebar";

const navigationItems: SidebarItemType[] = [
  // Charts
  { href: '/overview/area-chart', label: 'Area Chart' },
  { href: '/overview/bar-chart', label: 'Bar Chart' },
  { href: '/overview/bar-stack-chart', label: 'Bar Stack Chart' },
  { href: '/overview/bar-stack-horizontal-chart', label: 'Bar Stack Horizontal' },
  { href: '/overview/bar-group-chart', label: 'Bar Group Chart' },
  { href: '/overview/bar-group-horizontal-chart', label: 'Bar Group Horizontal' },
  // Building Blocks
  { href: '/overview/navbar', label: 'Navbar' },
  { href: '/overview/dashboard-card', label: 'Dashboard Card' },
  { href: '/overview/modal-presets', label: 'Modal Presets' },
  // Base Components
  { href: '/overview/buttons', label: 'Button' },
  { href: '/overview/icon-button', label: 'Icon Button' },
  { href: '/overview/button-examples', label: 'Button Examples' },
  { href: '/overview/link', label: 'Link' },
  { href: '/overview/avatar', label: 'Avatar' },
  { href: '/overview/badge', label: 'Badge' },
  { href: '/overview/checkbox', label: 'Checkbox' },
  { href: '/overview/radio', label: 'Radio' },
  { href: '/overview/switch', label: 'Switch' },
  { href: '/overview/progress', label: 'Progress' },
  { href: '/overview/popover', label: 'Popover' },
  { href: '/overview/pill', label: 'Pill' },
  { href: '/overview/toast', label: 'Toast' },
  { href: '/overview/toggle', label: 'Toggle' },
  { href: '/overview/select', label: 'Select' },
  { href: '/overview/field', label: 'Field' },
  { href: '/overview/tabs', label: 'Tabs' },
  { href: '/overview/scroll-area', label: 'Scroll Area' },
  { href: '/overview/tooltip', label: 'Tooltip' },
  { href: '/overview/token-logo', label: 'Token Logo' },
  { href: '/overview/number-field', label: 'Number Field' },
  { href: '/overview/alert-dialog', label: 'Alert Dialog' },
  { href: '/overview/placeholder', label: 'Placeholder' },
]

export default function OverviewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar items={navigationItems} />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
