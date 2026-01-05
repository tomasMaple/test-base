import { Sidebar, type SidebarGroupType } from "@/components/ui/sidebar";

const navigationGroups: SidebarGroupType[] = [
  {
    label: 'Charts',
    defaultOpen: true,
    items: [
      { href: '/overview/area-chart', label: 'Area Chart' },
      { href: '/overview/bar-chart', label: 'Bar Chart' },
      { href: '/overview/bar-stack-chart', label: 'Bar Stack Chart' },
      { href: '/overview/bar-stack-horizontal-chart', label: 'Bar Stack Horizontal' },
      { href: '/overview/bar-group-chart', label: 'Bar Group Chart' },
      { href: '/overview/bar-group-horizontal-chart', label: 'Bar Group Horizontal' },
    ],
  },
  {
    label: 'Layout',
    defaultOpen: true,
    items: [
      { href: '/overview/navbar', label: 'Navbar' },
      { href: '/overview/dashboard-card', label: 'Dashboard Card' },
      { href: '/overview/scroll-area', label: 'Scroll Area' },
    ],
  },
  {
    label: 'Overlays',
    defaultOpen: true,
    items: [
      { href: '/overview/dialog', label: 'Dialog' },
      { href: '/overview/alert-dialog', label: 'Alert Dialog' },
      { href: '/overview/modal-presets', label: 'Modal Presets' },
      { href: '/overview/popover', label: 'Popover' },
      { href: '/overview/tooltip', label: 'Tooltip' },
      { href: '/overview/toast', label: 'Toast' },
    ],
  },
  {
    label: 'Actions',
    defaultOpen: true,
    items: [
      { href: '/overview/buttons', label: 'Button' },
      { href: '/overview/icon-button', label: 'Icon Button' },
      { href: '/overview/button-examples', label: 'Button Examples' },
      { href: '/overview/link', label: 'Link' },
      { href: '/overview/toggle', label: 'Toggle' },
      { href: '/overview/tabs', label: 'Tabs' },
    ],
  },
  {
    label: 'Form Inputs',
    defaultOpen: true,
    items: [
      { href: '/overview/field', label: 'Field' },
      { href: '/overview/number-field', label: 'Number Field' },
      { href: '/overview/select', label: 'Select' },
      { href: '/overview/checkbox', label: 'Checkbox' },
      { href: '/overview/radio', label: 'Radio' },
      { href: '/overview/switch', label: 'Switch' },
    ],
  },
  {
    label: 'Data Display',
    defaultOpen: true,
    items: [
      { href: '/overview/avatar', label: 'Avatar' },
      { href: '/overview/badge', label: 'Badge' },
      { href: '/overview/pill', label: 'Pill' },
      { href: '/overview/token-logo', label: 'Token Logo' },
      { href: '/overview/progress', label: 'Progress' },
    ],
  },
  {
    label: 'Utilities',
    defaultOpen: true,
    items: [
      { href: '/overview/placeholder', label: 'Placeholder' },
    ],
  },
]

export default function OverviewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-canvas">
      <Sidebar groups={navigationGroups} title="Components" />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
