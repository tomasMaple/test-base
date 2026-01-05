title: badge
anatomy:
"2":
type: text
root:
type: container
eleptical-marquee:
type: instance
detectedIn: size:=56, type:=primary, appearance:=default, value:=icon
instanceOf: eleptical-marquee
props:
icon:
type: string
default: 13147:3152
size:
type: string
default: "56"
enum: - "56" - "48" - "40" - "36" - "32" - "24" - "20" - "16" - "12"
type:
type: string
default: primary
enum: - primary - secondary - brand - info - positive - warning - negative - custom
appearance:
type: string
default: default
enum: - default - subtle
value:
type: string
default: number
enum: - number - icon
default:
name: size:=56, type:=primary, appearance:=default, value:=number
elements:
"2":
parent: root
styles:
fills: colors/fg/inverse-primary
layoutSizingHorizontal: HUG
layoutSizingVertical: HUG
textStyleId: label/fixed/X-Large
textAlignHorizontal: CENTER
textAlignVertical: CENTER
root:
children: - "2"
styles:
fills: colors/bg/inverse-primary
cornerRadius: dimension/border-radius/pill
height: dimension/size/2XL
minWidth: dimension/size/2XL
minHeight: dimension/size/2XL
maxHeight: dimension/size/2XL
primaryAxisAlignItems: CENTER
counterAxisAlignItems: CENTER
layoutMode: HORIZONTAL
itemSpacing: dimension/space/0
paddingLeft: dimension/space/87
paddingRight: dimension/space/87
paddingTop: dimension/space/0
paddingBottom: dimension/space/0
eleptical-marquee:
styles:
width: 32
height: 32
propReferences:
mainComponent:
$ref: "#/props/icon:"
variants:

- name: size:=56, type:=primary, appearance:=default, value:=icon
  configuration:
  "value:": icon
  elements:
  "2": {}
  root:
  children: - eleptical-marquee
  styles:
  fills: colors/bg/inverse-primary
  cornerRadius: dimension/border-radius/pill
  width: dimension/size/2XL
  height: dimension/size/2XL
  minWidth: dimension/size/2XL
  minHeight: dimension/size/2XL
  maxWidth: dimension/size/SM
  maxHeight: dimension/size/2XL
  primaryAxisAlignItems: CENTER
  counterAxisAlignItems: CENTER
  layoutMode: HORIZONTAL
  itemSpacing: dimension/space/0
  paddingLeft: dimension/space/0
  paddingRight: dimension/space/0
  paddingTop: dimension/space/0
  paddingBottom: dimension/space/0
  eleptical-marquee:
  parent: root
  styles:
  width: 32
  height: 32
  propReferences:
  mainComponent:
  $ref: "#/props/icon:"
- name: size:=56, type:=primary, appearance:=subtle, value:=number
  configuration:
  "appearance:": subtle
  elements:
  "2":
  parent: root
  styles:
  fills: colors/fg/secondary
  layoutSizingHorizontal: HUG
  layoutSizingVertical: HUG
  textStyleId: label/fixed/X-Large
  textAlignHorizontal: CENTER
  textAlignVertical: CENTER
  root:
  children: - "2"
  styles:
  fills: colors/bg/primary
  cornerRadius: dimension/border-radius/pill
  height: dimension/size/2XL
  minWidth: dimension/size/2XL
  minHeight: dimension/size/2XL
  maxHeight: dimension/size/2XL
  primaryAxisAlignItems: CENTER
  counterAxisAlignItems: CENTER
  layoutMode: HORIZONTAL
  itemSpacing: dimension/space/0
  paddingLeft: dimension/space/87
  paddingRight: dimension/space/87
  paddingTop: dimension/space/0
  paddingBottom: dimension/space/0
  eleptical-marquee:
  propReferences:
  mainComponent:
  $ref: "#/props/icon:"
- name: size:=56, type:=secondary, appearance:=default, value:=number
  configuration:
  "type:": secondary
  elements:
  "2":
  parent: root
  styles:
  fills: colors/fg/primary
  layoutSizingHorizontal: HUG
  layoutSizingVertical: HUG
  textStyleId: label/fixed/X-Large
  textAlignHorizontal: CENTER
  textAlignVertical: CENTER
  root:
  children: - "2"
  styles:
  fills: colors/bg/surface
  cornerRadius: dimension/border-radius/pill
  height: dimension/size/2XL
  minWidth: dimension/size/2XL
  minHeight: dimension/size/2XL
  maxHeight: dimension/size/2XL
  primaryAxisAlignItems: CENTER
  counterAxisAlignItems: CENTER
  layoutMode: HORIZONTAL
  strokes: colors/border/subtle
  strokeAlign: OUTSIDE
  strokeWeight: dimension/border-width/50
  itemSpacing: dimension/space/0
  paddingLeft: dimension/space/87
  paddingRight: dimension/space/87
  paddingTop: dimension/space/0
  paddingBottom: dimension/space/0
  eleptical-marquee:
  propReferences:
  mainComponent:
  $ref: "#/props/icon:"
- name: size:=56, type:=brand, appearance:=default, value:=number
  configuration:
  "type:": brand
  elements:
  "2":
  parent: root
  styles:
  fills: colors/fg/on-brand
  layoutSizingHorizontal: HUG
  layoutSizingVertical: HUG
  textStyleId: label/fixed/X-Large
  textAlignHorizontal: CENTER
  textAlignVertical: CENTER
  root:
  children: - "2"
  styles:
  fills: colors/brand/primary
  cornerRadius: dimension/border-radius/pill
  height: dimension/size/2XL
  minWidth: dimension/size/2XL
  minHeight: dimension/size/2XL
  maxHeight: dimension/size/2XL
  primaryAxisAlignItems: CENTER
  counterAxisAlignItems: CENTER
  layoutMode: HORIZONTAL
  itemSpacing: dimension/space/0
  paddingLeft: dimension/space/87
  paddingRight: dimension/space/87
  paddingTop: dimension/space/0
  paddingBottom: dimension/space/0
  eleptical-marquee:
  propReferences:
  mainComponent:
  $ref: "#/props/icon:"
- name: size:=56, type:=info, appearance:=default, value:=number
  configuration:
  "type:": info
  elements:
  "2":
  parent: root
  styles:
  fills: colors/fg/on-brand
  layoutSizingHorizontal: HUG
  layoutSizingVertical: HUG
  textStyleId: label/fixed/X-Large
  textAlignHorizontal: CENTER
  textAlignVertical: CENTER
  root:
  children: - "2"
  styles:
  fills: colors/info/primary
  cornerRadius: dimension/border-radius/pill
  height: dimension/size/2XL
  minWidth: dimension/size/2XL
  minHeight: dimension/size/2XL
  maxHeight: dimension/size/2XL
  primaryAxisAlignItems: CENTER
  counterAxisAlignItems: CENTER
  layoutMode: HORIZONTAL
  itemSpacing: dimension/space/0
  paddingLeft: dimension/space/87
  paddingRight: dimension/space/87
  paddingTop: dimension/space/0
  paddingBottom: dimension/space/0
  eleptical-marquee:
  propReferences:
  mainComponent:
  $ref: "#/props/icon:"
- name: size:=56, type:=positive, appearance:=default, value:=number
  configuration:
  "type:": positive
  elements:
  "2":
  parent: root
  styles:
  fills: colors/fg/on-brand
  layoutSizingHorizontal: HUG
  layoutSizingVertical: HUG
  textStyleId: label/fixed/X-Large
  textAlignHorizontal: CENTER
  textAlignVertical: CENTER
  root:
  children: - "2"
  styles:
  fills: colors/positive/primary
  cornerRadius: dimension/border-radius/pill
  height: dimension/size/2XL
  minWidth: dimension/size/2XL
  minHeight: dimension/size/2XL
  maxHeight: dimension/size/2XL
  primaryAxisAlignItems: CENTER
  counterAxisAlignItems: CENTER
  layoutMode: HORIZONTAL
  itemSpacing: dimension/space/0
  paddingLeft: dimension/space/87
  paddingRight: dimension/space/87
  paddingTop: dimension/space/0
  paddingBottom: dimension/space/0
  eleptical-marquee:
  propReferences:
  mainComponent:
  $ref: "#/props/icon:"
- name: size:=56, type:=warning, appearance:=default, value:=number
  configuration:
  "type:": warning
  elements:
  "2":
  parent: root
  styles:
  fills: colors/fg/on-brand
  layoutSizingHorizontal: HUG
  layoutSizingVertical: HUG
  textStyleId: label/fixed/X-Large
  textAlignHorizontal: CENTER
  textAlignVertical: CENTER
  root:
  children: - "2"
  styles:
  fills: colors/warning/primary
  cornerRadius: dimension/border-radius/pill
  height: dimension/size/2XL
  minWidth: dimension/size/2XL
  minHeight: dimension/size/2XL
  maxHeight: dimension/size/2XL
  primaryAxisAlignItems: CENTER
  counterAxisAlignItems: CENTER
  layoutMode: HORIZONTAL
  itemSpacing: dimension/space/0
  paddingLeft: dimension/space/87
  paddingRight: dimension/space/87
  paddingTop: dimension/space/0
  paddingBottom: dimension/space/0
  eleptical-marquee:
  propReferences:
  mainComponent:
  $ref: "#/props/icon:"
- name: size:=56, type:=negative, appearance:=default, value:=number
  configuration:
  "type:": negative
  elements:
  "2":
  parent: root
  styles:
  fills: colors/fg/on-brand
  layoutSizingHorizontal: HUG
  layoutSizingVertical: HUG
  textStyleId: label/fixed/X-Large
  textAlignHorizontal: CENTER
  textAlignVertical: CENTER
  root:
  children: - "2"
  styles:
  fills: colors/negative/primary
  cornerRadius: dimension/border-radius/pill
  height: dimension/size/2XL
  minWidth: dimension/size/2XL
  minHeight: dimension/size/2XL
  maxHeight: dimension/size/2XL
  primaryAxisAlignItems: CENTER
  counterAxisAlignItems: CENTER
  layoutMode: HORIZONTAL
  itemSpacing: dimension/space/0
  paddingLeft: dimension/space/87
  paddingRight: dimension/space/87
  paddingTop: dimension/space/0
  paddingBottom: dimension/space/0
  eleptical-marquee:
  propReferences:
  mainComponent:
  $ref: "#/props/icon:"
- name: size:=56, type:=custom, appearance:=default, value:=number
  configuration:
  "type:": custom
  elements:
  "2":
  parent: root
  styles:
  fills: colors/fg/on-accent
  layoutSizingHorizontal: HUG
  layoutSizingVertical: HUG
  textStyleId: label/fixed/X-Large
  textAlignHorizontal: CENTER
  textAlignVertical: CENTER
  root:
  children: - "2"
  styles:
  cornerRadius: dimension/border-radius/pill
  height: dimension/size/2XL
  minWidth: dimension/size/2XL
  minHeight: dimension/size/2XL
  maxHeight: dimension/size/2XL
  primaryAxisAlignItems: CENTER
  counterAxisAlignItems: CENTER
  layoutMode: HORIZONTAL
  itemSpacing: dimension/space/0
  paddingLeft: dimension/space/87
  paddingRight: dimension/space/87
  paddingTop: dimension/space/0
  paddingBottom: dimension/space/0
  eleptical-marquee:
  propReferences:
  mainComponent:
  $ref: "#/props/icon:"
- name: size:=48, type:=primary, appearance:=default, value:=number
  configuration:
  "size:": "48"
  elements:
  "2":
  parent: root
  styles:
  fills: colors/fg/inverse-primary
  layoutSizingHorizontal: HUG
  layoutSizingVertical: HUG
  textStyleId: label/fixed/X-Large
  textAlignHorizontal: CENTER
  textAlignVertical: CENTER
  root:
  children: - "2"
  styles:
  fills: colors/bg/inverse-primary
  cornerRadius: dimension/border-radius/pill
  height: dimension/size/XL
  minWidth: dimension/size/XL
  minHeight: dimension/size/XL
  maxHeight: dimension/size/XL
  primaryAxisAlignItems: CENTER
  counterAxisAlignItems: CENTER
  layoutMode: HORIZONTAL
  itemSpacing: dimension/space/0
  paddingLeft: dimension/space/87
  paddingRight: dimension/space/87
  paddingTop: dimension/space/0
  paddingBottom: dimension/space/0
  eleptical-marquee:
  propReferences:
  mainComponent:
  $ref: "#/props/icon:"
- name: size:=40, type:=primary, appearance:=default, value:=number
  configuration:
  "size:": "40"
  elements:
  "2":
  parent: root
  styles:
  fills: colors/fg/inverse-primary
  layoutSizingHorizontal: HUG
  layoutSizingVertical: HUG
  textStyleId: label/fixed/Large
  textAlignHorizontal: CENTER
  textAlignVertical: CENTER
  root:
  children: - "2"
  styles:
  fills: colors/bg/inverse-primary
  cornerRadius: dimension/border-radius/pill
  height: dimension/size/LG
  minWidth: dimension/size/LG
  minHeight: dimension/size/LG
  maxHeight: dimension/size/LG
  primaryAxisAlignItems: CENTER
  counterAxisAlignItems: CENTER
  layoutMode: HORIZONTAL
  itemSpacing: dimension/space/0
  paddingLeft: dimension/space/75
  paddingRight: dimension/space/75
  paddingTop: dimension/space/0
  paddingBottom: dimension/space/0
  eleptical-marquee:
  propReferences:
  mainComponent:
  $ref: "#/props/icon:"
- name: size:=36, type:=primary, appearance:=default, value:=number
  configuration:
  "size:": "36"
  elements:
  "2":
  parent: root
  styles:
  fills: colors/fg/inverse-primary
  layoutSizingHorizontal: HUG
  layoutSizingVertical: HUG
  textStyleId: label/fixed/Medium
  textAlignHorizontal: CENTER
  textAlignVertical: CENTER
  root:
  children: - "2"
  styles:
  fills: colors/bg/inverse-primary
  cornerRadius: dimension/border-radius/pill
  height: dimension/size/MD
  minWidth: dimension/size/MD
  minHeight: dimension/size/MD
  maxHeight: dimension/size/MD
  primaryAxisAlignItems: CENTER
  counterAxisAlignItems: CENTER
  layoutMode: HORIZONTAL
  itemSpacing: dimension/space/0
  paddingLeft: dimension/space/67
  paddingRight: dimension/space/67
  paddingTop: dimension/space/0
  paddingBottom: dimension/space/0
  eleptical-marquee:
  propReferences:
  mainComponent:
  $ref: "#/props/icon:"
- name: size:=32, type:=primary, appearance:=default, value:=number
  configuration:
  "size:": "32"
  elements:
  "2":
  parent: root
  styles:
  fills: colors/fg/inverse-primary
  layoutSizingHorizontal: HUG
  layoutSizingVertical: HUG
  textStyleId: label/fixed/Medium
  textAlignHorizontal: CENTER
  textAlignVertical: CENTER
  root:
  children: - "2"
  styles:
  fills: colors/bg/inverse-primary
  cornerRadius: dimension/border-radius/pill
  height: dimension/size/SM
  minWidth: dimension/size/SM
  minHeight: dimension/size/SM
  maxHeight: dimension/size/SM
  primaryAxisAlignItems: CENTER
  counterAxisAlignItems: CENTER
  layoutMode: HORIZONTAL
  itemSpacing: dimension/space/0
  paddingLeft: dimension/space/50
  paddingRight: dimension/space/50
  paddingTop: dimension/space/0
  paddingBottom: dimension/space/0
  eleptical-marquee:
  propReferences:
  mainComponent:
  $ref: "#/props/icon:"
- name: size:=24, type:=primary, appearance:=default, value:=number
  configuration:
  "size:": "24"
  elements:
  "2":
  parent: root
  styles:
  fills: colors/fg/inverse-primary
  layoutSizingHorizontal: HUG
  layoutSizingVertical: HUG
  textStyleId: label/fixed/X-Small
  textAlignHorizontal: CENTER
  textAlignVertical: CENTER
  root:
  children: - "2"
  styles:
  fills: colors/bg/inverse-primary
  cornerRadius: dimension/border-radius/pill
  height: dimension/size/XS
  minWidth: dimension/size/XS
  minHeight: dimension/size/XS
  maxHeight: dimension/size/XS
  primaryAxisAlignItems: CENTER
  counterAxisAlignItems: CENTER
  layoutMode: HORIZONTAL
  itemSpacing: dimension/space/0
  paddingLeft: dimension/space/50
  paddingRight: dimension/space/50
  paddingTop: dimension/space/0
  paddingBottom: dimension/space/0
  eleptical-marquee:
  propReferences:
  mainComponent:
  $ref: "#/props/icon:"
- name: size:=20, type:=primary, appearance:=default, value:=number
  configuration:
  "size:": "20"
  elements:
  "2":
  parent: root
  styles:
  fills: colors/fg/inverse-primary
  layoutSizingHorizontal: FILL
  layoutSizingVertical: HUG
  textStyleId: label/fixed/X-Small
  textAlignHorizontal: CENTER
  textAlignVertical: CENTER
  root:
  children: - "2"
  styles:
  fills: colors/bg/inverse-primary
  cornerRadius: dimension/border-radius/pill
  height: 20
  minWidth: dimension/size/2XS
  minHeight: dimension/size/2XS
  maxHeight: dimension/size/2XS
  primaryAxisAlignItems: CENTER
  counterAxisAlignItems: CENTER
  layoutMode: HORIZONTAL
  itemSpacing: dimension/space/0
  paddingLeft: dimension/space/37
  paddingRight: dimension/space/37
  paddingTop: dimension/space/0
  paddingBottom: dimension/space/0
  eleptical-marquee:
  propReferences:
  mainComponent:
  $ref: "#/props/icon:"
- name: size:=16, type:=primary, appearance:=default, value:=number
  configuration:
  "size:": "16"
  elements:
  "2":
  parent: root
  styles:
  fills: colors/fg/inverse-primary
  layoutSizingHorizontal: HUG
  layoutSizingVertical: HUG
  textStyleId: label/fixed/2X-Small
  textAlignHorizontal: CENTER
  textAlignVertical: CENTER
  root:
  children: - "2"
  styles:
  fills: colors/bg/inverse-primary
  cornerRadius: dimension/border-radius/pill
  height: dimension/size/3XS
  minWidth: dimension/size/3XS
  minHeight: dimension/size/3XS
  maxHeight: dimension/size/3XS
  primaryAxisAlignItems: CENTER
  counterAxisAlignItems: CENTER
  layoutMode: HORIZONTAL
  itemSpacing: dimension/space/0
  paddingLeft: dimension/space/25
  paddingRight: dimension/space/25
  paddingTop: dimension/space/0
  paddingBottom: dimension/space/0
  eleptical-marquee:
  propReferences:
  mainComponent:
  $ref: "#/props/icon:"
- name: size:=12, type:=primary, appearance:=default, value:=number
  configuration:
  "size:": "12"
  elements:
  "2":
  parent: root
  styles:
  fills: colors/fg/inverse-primary
  layoutSizingHorizontal: HUG
  layoutSizingVertical: HUG
  textStyleId: label/fixed/2X-Small
  textAlignHorizontal: CENTER
  textAlignVertical: CENTER
  root:
  children: - "2"
  styles:
  fills: colors/bg/inverse-primary
  cornerRadius: dimension/border-radius/pill
  height: dimension/size/4XS
  minWidth: dimension/size/4XS
  minHeight: dimension/size/4XS
  maxHeight: dimension/size/4XS
  primaryAxisAlignItems: CENTER
  counterAxisAlignItems: CENTER
  layoutMode: HORIZONTAL
  itemSpacing: dimension/space/0
  paddingLeft: dimension/space/12
  paddingRight: dimension/space/12
  paddingTop: dimension/space/0
  paddingBottom: dimension/space/0
  eleptical-marquee:
  propReferences:
  mainComponent:
  $ref: "#/props/icon:"
  invalidVariantCombinations: []
  metadata:
  author: tomas
  lastUpdated: 2026-01-04T10:01:03.612Z
  generator:
  url: https://www.figma.com/community/plugin/1549454283615386215/anova
  version: 4
  name: Directed Edges Anova Figma Plugin
  schema:
  url: https://github.com/DirectedEdges/anova/blob/main/anova.schema.json
  version: 0.3.0
  source:
  pageId: 13147:2699
  nodeId: 13147:2730
