### Avatar component

A component for displaying user avatars with support for images, initials, and status indicators. An avatar is a visual representation.

- **Keywords:** avatar, user, profile, image, presence, status, representation
- **Categories:** images, data-display
- **Status:** general-availability

#### Example

```tsx
import Avatar from "@atlaskit/avatar";

export default [
  <Avatar
    src="[https://example.com/avatar.jpg](https://example.com/avatar.jpg)"
    name="John Doe"
  />,
  <Avatar
    name="Jane Smith"
    appearance="hexagon"
    size="large"
    status="locked"
  />,
  <Avatar
    name="Bob Wilson"
    appearance="square"
    size="small"
    presence="online"
    status="approved"
  />,
];
```

Prop,Type
appearance,`'circle'
as,`keyof global.JSX.IntrinsicElements
borderColor,string
children,`string
href,string
imgLoading,`'lazy'
isDecorative,boolean
isDisabled,boolean
label,string
name,string
onClick,"(event: MouseEvent<Element, globalThis.MouseEvent>, analyticsEvent?: UIAnalyticsEvent) => void"
presence,`Presence
size,`'small'
src,string
stackIndex,number
status,"`Omit<ReactNode, string>"
tabIndex,number
target,`'\_blank'
Usage Guidelines

Use consistent sizing within the same context

Place avatars in logical groupings (e.g., team members)

Use presence indicators sparingly for real-time status only

Use status indicators for approval/permission states

Provide fallback initials when images fail to load

Use avatars to represent users, teams, projects, or any other entity that needs visual identification

Always provide meaningful names for accessibility

Use the name prop to include alternative text for screen readers

For decorative images, remove the name prop or leave it empty so it will be ignored by assistive technologies

Don't use a tooltip with an avatar when it's non-interactive or disabled. The tooltip won't work for keyboard users and screen readers.

Content Guidelines

Use full names when possible for better recognition

For companies/projects, use descriptive names

Avoid generic terms like 'User' or 'Admin'

Use consistent naming conventions across your app

Keep names concise but meaningful

Prop guidance

name — Always provide for accessibility (use full names when possible)

size — xsmall (inline), small (compact), medium (standard), large (prominent), xlarge (hero), xxlarge (marketing)

presence — Use sparingly for real-time status (online, busy, focus, offline)

status — For approval states (approved, declined, locked)

appearance — Use "square" for non-circular avatars

Translating from Tailwind

An example diff of a migration from Tailwind generated code to ADS generated code
+import Avatar from '@atlaskit/avatar';
-<img

- src="/avatar.jpg"
- alt="User"
- className="w-10 h-10 rounded-full"
  -/> +<Avatar src="/avatar.jpg" name="John Doe" />

-<div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">

- JD -</div> +<Avatar name="John Doe" />

-<div className="relative">

- <img src="/avatar.jpg" alt="User" className="w-10 h-10 rounded-full" />
- <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
  -</div>
  +<Avatar

* src="/avatar.jpg"
* name="John Doe"
* presence="online"
  +/>
