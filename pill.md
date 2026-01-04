title: pill
anatomy:
root:
type: container
slot:
type: slot
eleptical-marquee-fill:
type: instance
instanceOf: eleptical-marquee-fill
label-wrapper:
type: container
label:
type: text
props:
before-icon:
type: string
default: 13145:5414
after-icon:
type: string
default: 13145:5414
before-slot:
type: boolean
default: false
after-slot:
type: boolean
default: false
size:
type: string
default: "32"
enum: - "32" - "24" - "20" - "16"
type:
type: string
default: primary
enum: - primary - secondary - brand - info - positive - warning - negative - custom
appearance:
type: string
default: default
enum: - default - subtle - ghost
default:
name: size:=32, type:=primary, appearance:=default
elements:
root:
children: - slot - eleptical-marquee-fill - label-wrapper - slot - eleptical-marquee-fill
styles:
fills: colors/bg/inverse-primary
cornerRadius: 120
height: dimension/size/SM
minHeight: dimension/size/SM
maxHeight: dimension/size/SM
primaryAxisAlignItems: CENTER
counterAxisAlignItems: CENTER
layoutMode: HORIZONTAL
itemSpacing: dimension/space/12
paddingLeft: dimension/space/50
paddingRight: dimension/space/50
paddingTop: dimension/space/0
paddingBottom: dimension/space/0
slot:
parent: root
styles:
visible: false
fills: "#7B61FF, 10%"
layoutSizingHorizontal: HUG
layoutSizingVertical: HUG
propConfigurations:
"": ""
propReferences:
visible:
$ref: "#/props/after-slot?"
mainComponent:
$ref: "#/props/after-slot:"
eleptical-marquee-fill:
parent: root
styles:
visible: false
width: 14
height: 14
propReferences:
visible:
$ref: "#/props/after-icon?"
mainComponent:
$ref: "#/props/after-icon:"
label-wrapper:
parent: root
children: - label
styles:
counterAxisAlignItems: CENTER
layoutMode: HORIZONTAL
layoutSizingHorizontal: HUG
layoutSizingVertical: HUG
itemSpacing: dimension/space/0
paddingLeft: dimension/space/25
paddingRight: dimension/space/25
paddingTop: dimension/space/0
paddingBottom: dimension/space/0
label:
parent: label-wrapper
styles:
fills: colors/fg/inverse-primary
layoutSizingHorizontal: HUG
layoutSizingVertical: HUG
textStyleId: label/fixed/X-Small
textAlignHorizontal: CENTER
textAlignVertical: CENTER
variants:

- name: size:=32, type:=primary, appearance:=subtle
  configuration:
  "appearance:": subtle
  elements:
  root:
  children: - slot - eleptical-marquee-fill - label-wrapper - slot - eleptical-marquee-fill
  styles:
  fills: colors/bg/primary
  cornerRadius: 120
  height: dimension/size/SM
  minHeight: dimension/size/SM
  maxHeight: dimension/size/SM
  primaryAxisAlignItems: CENTER
  counterAxisAlignItems: CENTER
  layoutMode: HORIZONTAL
  itemSpacing: dimension/space/12
  paddingLeft: dimension/space/50
  paddingRight: dimension/space/50
  paddingTop: dimension/space/0
  paddingBottom: dimension/space/0
  slot:
  parent: root
  styles:
  visible: false
  fills: "#7B61FF, 10%"
  layoutSizingHorizontal: HUG
  layoutSizingVertical: HUG
  propConfigurations:
  "": ""
  propReferences:
  visible:
  $ref: "#/props/after-slot?"
  mainComponent:
  $ref: "#/props/after-slot:"
  eleptical-marquee-fill:
  parent: root
  styles:
  visible: false
  width: 14
  height: 14
  propReferences:
  visible:
  $ref: "#/props/after-icon?"
  mainComponent:
  $ref: "#/props/after-icon:"
  label-wrapper:
  parent: root
  children: - label
  styles:
  counterAxisAlignItems: CENTER
  layoutMode: HORIZONTAL
  layoutSizingHorizontal: HUG
  layoutSizingVertical: HUG
  itemSpacing: dimension/space/0
  paddingLeft: dimension/space/25
  paddingRight: dimension/space/25
  paddingTop: dimension/space/0
  paddingBottom: dimension/space/0
  label:
  parent: label-wrapper
  styles:
  fills: colors/fg/secondary
  layoutSizingHorizontal: HUG
  layoutSizingVertical: HUG
  textStyleId: label/fixed/X-Small
  textAlignHorizontal: CENTER
  textAlignVertical: CENTER
- name: size:=32, type:=primary, appearance:=ghost
  configuration:
  "appearance:": ghost
  elements:
  root:
  children: - slot - eleptical-marquee-fill - label-wrapper - slot - eleptical-marquee-fill
  styles:
  cornerRadius: 120
  height: dimension/size/SM
  minHeight: dimension/size/SM
  maxHeight: dimension/size/SM
  primaryAxisAlignItems: CENTER
  counterAxisAlignItems: CENTER
  layoutMode: HORIZONTAL
  itemSpacing: dimension/space/12
  paddingLeft: dimension/space/50
  paddingRight: dimension/space/50
  paddingTop: dimension/space/0
  paddingBottom: dimension/space/0
  slot:
  parent: root
  styles:
  visible: false
  fills: "#7B61FF, 10%"
  layoutSizingHorizontal: HUG
  layoutSizingVertical: HUG
  propConfigurations:
  "": ""
  propReferences:
  visible:
  $ref: "#/props/after-slot?"
  mainComponent:
  $ref: "#/props/after-slot:"
  eleptical-marquee-fill:
  parent: root
  styles:
  visible: false
  width: 14
  height: 14
  propReferences:
  visible:
  $ref: "#/props/after-icon?"
  mainComponent:
  $ref: "#/props/after-icon:"
  label-wrapper:
  parent: root
  children: - label
  styles:
  counterAxisAlignItems: CENTER
  layoutMode: HORIZONTAL
  layoutSizingHorizontal: HUG
  layoutSizingVertical: HUG
  itemSpacing: dimension/space/0
  paddingLeft: dimension/space/25
  paddingRight: dimension/space/25
  paddingTop: dimension/space/0
  paddingBottom: dimension/space/0
  label:
  parent: label-wrapper
  styles:
  fills: colors/fg/secondary
  layoutSizingHorizontal: HUG
  layoutSizingVertical: HUG
  textStyleId: label/fixed/X-Small
  textAlignHorizontal: CENTER
  textAlignVertical: CENTER
- name: size:=32, type:=secondary, appearance:=default
  configuration:
  "type:": secondary
  elements:
  root:
  children: - slot - eleptical-marquee-fill - label-wrapper - slot - eleptical-marquee-fill
  styles:
  fills: colors/bg/surface
  cornerRadius: 120
  height: dimension/size/SM
  minHeight: dimension/size/SM
  maxHeight: dimension/size/SM
  primaryAxisAlignItems: CENTER
  counterAxisAlignItems: CENTER
  layoutMode: HORIZONTAL
  strokes: colors/border/subtle
  strokeAlign: OUTSIDE
  strokeWeight: dimension/border-width/50
  itemSpacing: dimension/space/12
  paddingLeft: dimension/space/50
  paddingRight: dimension/space/50
  paddingTop: dimension/space/0
  paddingBottom: dimension/space/0
  slot:
  parent: root
  styles:
  visible: false
  fills: "#7B61FF, 10%"
  layoutSizingHorizontal: HUG
  layoutSizingVertical: HUG
  propConfigurations:
  "": ""
  propReferences:
  visible:
  $ref: "#/props/after-slot?"
  mainComponent:
  $ref: "#/props/after-slot:"
  eleptical-marquee-fill:
  parent: root
  styles:
  visible: false
  width: 14
  height: 14
  propReferences:
  visible:
  $ref: "#/props/after-icon?"
  mainComponent:
  $ref: "#/props/after-icon:"
  label-wrapper:
  parent: root
  children: - label
  styles:
  counterAxisAlignItems: CENTER
  layoutMode: HORIZONTAL
  layoutSizingHorizontal: HUG
  layoutSizingVertical: HUG
  itemSpacing: dimension/space/0
  paddingLeft: dimension/space/25
  paddingRight: dimension/space/25
  paddingTop: dimension/space/0
  paddingBottom: dimension/space/0
  label:
  parent: label-wrapper
  styles:
  fills: colors/fg/primary
  layoutSizingHorizontal: HUG
  layoutSizingVertical: HUG
  textStyleId: label/fixed/X-Small
  textAlignHorizontal: CENTER
  textAlignVertical: CENTER
- name: size:=32, type:=brand, appearance:=default
  configuration:
  "type:": brand
  elements:
  root:
  children: - slot - eleptical-marquee-fill - label-wrapper - slot - eleptical-marquee-fill
  styles:
  fills: colors/brand/primary
  cornerRadius: 120
  height: dimension/size/SM
  minHeight: dimension/size/SM
  maxHeight: dimension/size/SM
  primaryAxisAlignItems: CENTER
  counterAxisAlignItems: CENTER
  layoutMode: HORIZONTAL
  itemSpacing: dimension/space/12
  paddingLeft: dimension/space/50
  paddingRight: dimension/space/50
  paddingTop: dimension/space/0
  paddingBottom: dimension/space/0
  slot:
  parent: root
  styles:
  visible: false
  fills: "#7B61FF, 10%"
  layoutSizingHorizontal: HUG
  layoutSizingVertical: HUG
  propConfigurations:
  "": ""
  propReferences:
  visible:
  $ref: "#/props/after-slot?"
  mainComponent:
  $ref: "#/props/after-slot:"
  eleptical-marquee-fill:
  parent: root
  styles:
  visible: false
  width: 14
  height: 14
  propReferences:
  visible:
  $ref: "#/props/after-icon?"
  mainComponent:
  $ref: "#/props/after-icon:"
  label-wrapper:
  parent: root
  children: - label
  styles:
  counterAxisAlignItems: CENTER
  layoutMode: HORIZONTAL
  layoutSizingHorizontal: HUG
  layoutSizingVertical: HUG
  itemSpacing: dimension/space/0
  paddingLeft: dimension/space/25
  paddingRight: dimension/space/25
  paddingTop: dimension/space/0
  paddingBottom: dimension/space/0
  label:
  parent: label-wrapper
  styles:
  fills: colors/fg/on-brand
  layoutSizingHorizontal: HUG
  layoutSizingVertical: HUG
  textStyleId: label/fixed/X-Small
  textAlignHorizontal: CENTER
  textAlignVertical: CENTER
- name: size:=32, type:=info, appearance:=default
  configuration:
  "type:": info
  elements:
  root:
  children: - slot - eleptical-marquee-fill - label-wrapper - slot - eleptical-marquee-fill
  styles:
  fills: colors/info/primary
  cornerRadius: 120
  height: dimension/size/SM
  minHeight: dimension/size/SM
  maxHeight: dimension/size/SM
  primaryAxisAlignItems: CENTER
  counterAxisAlignItems: CENTER
  layoutMode: HORIZONTAL
  itemSpacing: dimension/space/12
  paddingLeft: dimension/space/50
  paddingRight: dimension/space/50
  paddingTop: dimension/space/0
  paddingBottom: dimension/space/0
  slot:
  parent: root
  styles:
  visible: false
  fills: "#7B61FF, 10%"
  layoutSizingHorizontal: HUG
  layoutSizingVertical: HUG
  propConfigurations:
  "": ""
  propReferences:
  visible:
  $ref: "#/props/after-slot?"
  mainComponent:
  $ref: "#/props/after-slot:"
  eleptical-marquee-fill:
  parent: root
  styles:
  visible: false
  width: 14
  height: 14
  propReferences:
  visible:
  $ref: "#/props/after-icon?"
  mainComponent:
  $ref: "#/props/after-icon:"
  label-wrapper:
  parent: root
  children: - label
  styles:
  counterAxisAlignItems: CENTER
  layoutMode: HORIZONTAL
  layoutSizingHorizontal: HUG
  layoutSizingVertical: HUG
  itemSpacing: dimension/space/0
  paddingLeft: dimension/space/25
  paddingRight: dimension/space/25
  paddingTop: dimension/space/0
  paddingBottom: dimension/space/0
  label:
  parent: label-wrapper
  styles:
  fills: colors/fg/on-accent
  layoutSizingHorizontal: HUG
  layoutSizingVertical: HUG
  textStyleId: label/fixed/X-Small
  textAlignHorizontal: CENTER
  textAlignVertical: CENTER
- name: size:=32, type:=positive, appearance:=default
  configuration:
  "type:": positive
  elements:
  root:
  children: - slot - eleptical-marquee-fill - label-wrapper - slot - eleptical-marquee-fill
  styles:
  fills: colors/positive/primary
  cornerRadius: 120
  height: dimension/size/SM
  minHeight: dimension/size/SM
  maxHeight: dimension/size/SM
  primaryAxisAlignItems: CENTER
  counterAxisAlignItems: CENTER
  layoutMode: HORIZONTAL
  itemSpacing: dimension/space/12
  paddingLeft: dimension/space/50
  paddingRight: dimension/space/50
  paddingTop: dimension/space/0
  paddingBottom: dimension/space/0
  slot:
  parent: root
  styles:
  visible: false
  fills: "#7B61FF, 10%"
  layoutSizingHorizontal: HUG
  layoutSizingVertical: HUG
  propConfigurations:
  "": ""
  propReferences:
  visible:
  $ref: "#/props/after-slot?"
  mainComponent:
  $ref: "#/props/after-slot:"
  eleptical-marquee-fill:
  parent: root
  styles:
  visible: false
  width: 14
  height: 14
  propReferences:
  visible:
  $ref: "#/props/after-icon?"
  mainComponent:
  $ref: "#/props/after-icon:"
  label-wrapper:
  parent: root
  children: - label
  styles:
  counterAxisAlignItems: CENTER
  layoutMode: HORIZONTAL
  layoutSizingHorizontal: HUG
  layoutSizingVertical: HUG
  itemSpacing: dimension/space/0
  paddingLeft: dimension/space/25
  paddingRight: dimension/space/25
  paddingTop: dimension/space/0
  paddingBottom: dimension/space/0
  label:
  parent: label-wrapper
  styles:
  fills: colors/fg/on-accent
  layoutSizingHorizontal: HUG
  layoutSizingVertical: HUG
  textStyleId: label/fixed/X-Small
  textAlignHorizontal: CENTER
  textAlignVertical: CENTER
- name: size:=32, type:=warning, appearance:=default
  configuration:
  "type:": warning
  elements:
  root:
  children: - slot - eleptical-marquee-fill - label-wrapper - slot - eleptical-marquee-fill
  styles:
  fills: colors/warning/primary
  cornerRadius: 120
  height: dimension/size/SM
  minHeight: dimension/size/SM
  maxHeight: dimension/size/SM
  primaryAxisAlignItems: CENTER
  counterAxisAlignItems: CENTER
  layoutMode: HORIZONTAL
  itemSpacing: dimension/space/12
  paddingLeft: dimension/space/50
  paddingRight: dimension/space/50
  paddingTop: dimension/space/0
  paddingBottom: dimension/space/0
  slot:
  parent: root
  styles:
  visible: false
  fills: "#7B61FF, 10%"
  layoutSizingHorizontal: HUG
  layoutSizingVertical: HUG
  propConfigurations:
  "": ""
  propReferences:
  visible:
  $ref: "#/props/after-slot?"
  mainComponent:
  $ref: "#/props/after-slot:"
  eleptical-marquee-fill:
  parent: root
  styles:
  visible: false
  width: 14
  height: 14
  propReferences:
  visible:
  $ref: "#/props/after-icon?"
  mainComponent:
  $ref: "#/props/after-icon:"
  label-wrapper:
  parent: root
  children: - label
  styles:
  counterAxisAlignItems: CENTER
  layoutMode: HORIZONTAL
  layoutSizingHorizontal: HUG
  layoutSizingVertical: HUG
  itemSpacing: dimension/space/0
  paddingLeft: dimension/space/25
  paddingRight: dimension/space/25
  paddingTop: dimension/space/0
  paddingBottom: dimension/space/0
  label:
  parent: label-wrapper
  styles:
  fills: colors/fg/on-accent
  layoutSizingHorizontal: HUG
  layoutSizingVertical: HUG
  textStyleId: label/fixed/X-Small
  textAlignHorizontal: CENTER
  textAlignVertical: CENTER
- name: size:=32, type:=negative, appearance:=default
  configuration:
  "type:": negative
  elements:
  root:
  children: - slot - eleptical-marquee-fill - label-wrapper - slot - eleptical-marquee-fill
  styles:
  fills: colors/negative/primary
  cornerRadius: 120
  height: dimension/size/SM
  minHeight: dimension/size/SM
  maxHeight: dimension/size/SM
  primaryAxisAlignItems: CENTER
  counterAxisAlignItems: CENTER
  layoutMode: HORIZONTAL
  itemSpacing: dimension/space/12
  paddingLeft: dimension/space/50
  paddingRight: dimension/space/50
  paddingTop: dimension/space/0
  paddingBottom: dimension/space/0
  slot:
  parent: root
  styles:
  visible: false
  fills: "#7B61FF, 10%"
  layoutSizingHorizontal: HUG
  layoutSizingVertical: HUG
  propConfigurations:
  "": ""
  propReferences:
  visible:
  $ref: "#/props/after-slot?"
  mainComponent:
  $ref: "#/props/after-slot:"
  eleptical-marquee-fill:
  parent: root
  styles:
  visible: false
  width: 14
  height: 14
  propReferences:
  visible:
  $ref: "#/props/after-icon?"
  mainComponent:
  $ref: "#/props/after-icon:"
  label-wrapper:
  parent: root
  children: - label
  styles:
  counterAxisAlignItems: CENTER
  layoutMode: HORIZONTAL
  layoutSizingHorizontal: HUG
  layoutSizingVertical: HUG
  itemSpacing: dimension/space/0
  paddingLeft: dimension/space/25
  paddingRight: dimension/space/25
  paddingTop: dimension/space/0
  paddingBottom: dimension/space/0
  label:
  parent: label-wrapper
  styles:
  fills: colors/fg/on-accent
  layoutSizingHorizontal: HUG
  layoutSizingVertical: HUG
  textStyleId: label/fixed/X-Small
  textAlignHorizontal: CENTER
  textAlignVertical: CENTER
- name: size:=32, type:=custom, appearance:=default
  configuration:
  "type:": custom
  elements:
  root:
  children: - slot - eleptical-marquee-fill - label-wrapper - slot - eleptical-marquee-fill
  styles:
  cornerRadius: 120
  height: dimension/size/SM
  minHeight: dimension/size/SM
  maxHeight: dimension/size/SM
  primaryAxisAlignItems: CENTER
  counterAxisAlignItems: CENTER
  layoutMode: HORIZONTAL
  itemSpacing: dimension/space/12
  paddingLeft: dimension/space/50
  paddingRight: dimension/space/50
  paddingTop: dimension/space/0
  paddingBottom: dimension/space/0
  slot:
  parent: root
  styles:
  visible: false
  fills: "#7B61FF, 10%"
  layoutSizingHorizontal: HUG
  layoutSizingVertical: HUG
  propConfigurations:
  "": ""
  propReferences:
  visible:
  $ref: "#/props/after-slot?"
  mainComponent:
  $ref: "#/props/after-slot:"
  eleptical-marquee-fill:
  parent: root
  styles:
  visible: false
  width: 14
  height: 14
  propReferences:
  visible:
  $ref: "#/props/after-icon?"
  mainComponent:
  $ref: "#/props/after-icon:"
  label-wrapper:
  parent: root
  children: - label
  styles:
  counterAxisAlignItems: CENTER
  layoutMode: HORIZONTAL
  layoutSizingHorizontal: HUG
  layoutSizingVertical: HUG
  itemSpacing: dimension/space/0
  paddingLeft: dimension/space/25
  paddingRight: dimension/space/25
  paddingTop: dimension/space/0
  paddingBottom: dimension/space/0
  label:
  parent: label-wrapper
  styles:
  fills: colors/fg/on-accent
  layoutSizingHorizontal: HUG
  layoutSizingVertical: HUG
  textStyleId: label/fixed/X-Small
  textAlignHorizontal: CENTER
  textAlignVertical: CENTER
- name: size:=24, type:=primary, appearance:=default
  configuration:
  "size:": "24"
  elements:
  root:
  children: - slot - eleptical-marquee-fill - label-wrapper - slot - eleptical-marquee-fill
  styles:
  fills: colors/bg/inverse-primary
  cornerRadius: 120
  height: dimension/size/XS
  minHeight: dimension/size/XS
  maxHeight: dimension/size/XS
  primaryAxisAlignItems: CENTER
  counterAxisAlignItems: CENTER
  layoutMode: HORIZONTAL
  itemSpacing: dimension/space/0
  paddingLeft: dimension/space/37
  paddingRight: dimension/space/37
  paddingTop: dimension/space/0
  paddingBottom: dimension/space/0
  slot:
  parent: root
  styles:
  visible: false
  fills: "#7B61FF, 10%"
  layoutSizingHorizontal: HUG
  layoutSizingVertical: HUG
  propConfigurations:
  "": ""
  propReferences:
  visible:
  $ref: "#/props/after-slot?"
  mainComponent:
  $ref: "#/props/after-slot:"
  eleptical-marquee-fill:
  parent: root
  styles:
  visible: false
  width: 14
  height: 14
  propReferences:
  visible:
  $ref: "#/props/after-icon?"
  mainComponent:
  $ref: "#/props/after-icon:"
  label-wrapper:
  parent: root
  children: - label
  styles:
  counterAxisAlignItems: CENTER
  layoutMode: HORIZONTAL
  layoutSizingHorizontal: HUG
  layoutSizingVertical: HUG
  itemSpacing: dimension/space/0
  paddingLeft: dimension/space/25
  paddingRight: dimension/space/25
  paddingTop: dimension/space/0
  paddingBottom: dimension/space/0
  label:
  parent: label-wrapper
  styles:
  fills: colors/fg/inverse-primary
  layoutSizingHorizontal: HUG
  layoutSizingVertical: HUG
  textStyleId: label/fixed/X-Small
  textAlignHorizontal: CENTER
  textAlignVertical: CENTER
- name: size:=20, type:=primary, appearance:=default
  configuration:
  "size:": "20"
  elements:
  root:
  children: - slot - eleptical-marquee-fill - label-wrapper - slot - eleptical-marquee-fill
  styles:
  fills: colors/bg/inverse-primary
  cornerRadius: 120
  height: dimension/size/2XS
  minHeight: dimension/size/2XS
  maxHeight: dimension/size/2XS
  primaryAxisAlignItems: CENTER
  counterAxisAlignItems: CENTER
  layoutMode: HORIZONTAL
  itemSpacing: dimension/space/0
  paddingLeft: dimension/space/25
  paddingRight: dimension/space/25
  paddingTop: dimension/space/0
  paddingBottom: dimension/space/0
  slot:
  parent: root
  styles:
  visible: false
  fills: "#7B61FF, 10%"
  layoutSizingHorizontal: HUG
  layoutSizingVertical: HUG
  propConfigurations:
  "": ""
  propReferences:
  visible:
  $ref: "#/props/after-slot?"
  mainComponent:
  $ref: "#/props/after-slot:"
  eleptical-marquee-fill:
  parent: root
  styles:
  visible: false
  width: 12
  height: 12
  propReferences:
  visible:
  $ref: "#/props/after-icon?"
  mainComponent:
  $ref: "#/props/after-icon:"
  label-wrapper:
  parent: root
  children: - label
  styles:
  counterAxisAlignItems: CENTER
  layoutMode: HORIZONTAL
  layoutSizingHorizontal: HUG
  layoutSizingVertical: HUG
  itemSpacing: dimension/space/0
  paddingLeft: dimension/space/25
  paddingRight: dimension/space/25
  paddingTop: dimension/space/0
  paddingBottom: dimension/space/0
  label:
  parent: label-wrapper
  styles:
  fills: colors/fg/inverse-primary
  layoutSizingHorizontal: HUG
  layoutSizingVertical: HUG
  textStyleId: label/fixed/X-Small
  textAlignHorizontal: CENTER
  textAlignVertical: CENTER
- name: size:=16, type:=primary, appearance:=default
  configuration:
  "size:": "16"
  elements:
  root:
  children: - slot - eleptical-marquee-fill - label-wrapper - slot - eleptical-marquee-fill
  styles:
  fills: colors/bg/inverse-primary
  cornerRadius: 120
  height: dimension/size/3XS
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
  slot:
  parent: root
  styles:
  visible: false
  fills: "#7B61FF, 10%"
  layoutSizingHorizontal: HUG
  layoutSizingVertical: HUG
  propConfigurations:
  "": ""
  propReferences:
  visible:
  $ref: "#/props/after-slot?"
  mainComponent:
  $ref: "#/props/after-slot:"
  eleptical-marquee-fill:
  parent: root
  styles:
  visible: false
  width: 10
  height: 10
  propReferences:
  visible:
  $ref: "#/props/after-icon?"
  label-wrapper:
  parent: root
  children: - label
  styles:
  primaryAxisAlignItems: CENTER
  counterAxisAlignItems: CENTER
  layoutMode: HORIZONTAL
  layoutSizingHorizontal: HUG
  layoutSizingVertical: HUG
  itemSpacing: dimension/space/0
  paddingLeft: dimension/space/12
  paddingRight: dimension/space/12
  paddingTop: dimension/space/0
  paddingBottom: dimension/space/0
  label:
  parent: label-wrapper
  styles:
  fills: colors/fg/inverse-primary
  layoutSizingHorizontal: HUG
  layoutSizingVertical: HUG
  textStyleId: label/fixed/2X-Small
  textAlignHorizontal: CENTER
  textAlignVertical: CENTER
  invalidVariantCombinations: []
  metadata:
  author: tomas
  lastUpdated: 2026-01-04T09:55:39.540Z
  generator:
  url: https://www.figma.com/community/plugin/1549454283615386215/anova
  version: 4
  name: Directed Edges Anova Figma Plugin
  schema:
  url: https://github.com/DirectedEdges/anova/blob/main/anova.schema.json
  version: 0.3.0
  source:
  pageId: 13147:658
  nodeId: 13147:678
