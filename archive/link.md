title: link-button
anatomy:
root:
type: container
eleptical-marquee:
type: instance
instanceOf: eleptical-marquee
slot:
type: slot
label:
type: text
direction-upward-right:
type: instance
instanceOf: direction-upward-right
props:
before-icon:
type: string
default: 13147:3152
after-icon:
type: string
default: 13146:492
before-slot:
type: boolean
default: false
after-slot:
type: boolean
default: false
font-size:
type: string
default: medium
enum: - medium - small - x-small
type:
type: string
default: primary
enum: - primary - inverse-primary - secondary
state:
type: string
default: default
enum: - default - hover - focused - disabled
underlined:
type: boolean
default: true
x-platform:
FIGMA:
type: VARIANT
default:
name: font-size:=medium, type:=primary, state:=default, underlined?=true
elements:
root:
children: - eleptical-marquee - slot - label - direction-upward-right - slot
styles:
counterAxisAlignItems: CENTER
layoutMode: HORIZONTAL
itemSpacing: 4
eleptical-marquee:
parent: root
styles:
visible: false
width: 20
height: 20
propReferences:
visible:
$ref: "#/props/before-icon?"
mainComponent:
$ref: "#/props/before-Icon:"
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
label:
parent: root
styles:
fills: colors/fg/primary
layoutSizingHorizontal: HUG
layoutSizingVertical: HUG
textStyleId: label/fixed/Medium
direction-upward-right:
parent: root
styles:
width: 20
height: 20
propReferences:
visible:
$ref: "#/props/after-icon?"
mainComponent:
$ref: "#/props/after-icon:"
variants:

- name: font-size:=medium, type:=primary, state:=default, underlined?=false
  configuration:
  underlined?: false
  elements:
  root:
  children: - slot - eleptical-marquee - label - direction-upward-right - slot
  styles:
  counterAxisAlignItems: CENTER
  layoutMode: HORIZONTAL
  itemSpacing: 4
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
  eleptical-marquee:
  parent: root
  styles:
  visible: false
  width: 20
  height: 20
  propReferences:
  visible:
  $ref: "#/props/before-icon?"
  mainComponent:
  $ref: "#/props/before-Icon:"
  label:
  parent: root
  styles:
  fills: colors/fg/primary
  layoutSizingHorizontal: HUG
  layoutSizingVertical: HUG
  textStyleId: label/fixed/Medium
  direction-upward-right:
  parent: root
  styles:
  width: 20
  height: 20
  propReferences:
  visible:
  $ref: "#/props/after-icon?"
  mainComponent:
  $ref: "#/props/after-icon:"
- name: font-size:=medium, type:=primary, state:=hover, underlined?=true
  configuration:
  "state:": hover
  elements:
  root:
  children: - slot - eleptical-marquee - label - direction-upward-right - slot
  styles:
  counterAxisAlignItems: CENTER
  layoutMode: HORIZONTAL
  itemSpacing: 4
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
  eleptical-marquee:
  parent: root
  styles:
  visible: false
  width: 20
  height: 20
  propReferences:
  visible:
  $ref: "#/props/before-icon?"
  mainComponent:
  $ref: "#/props/before-Icon:"
  label:
  parent: root
  styles:
  fills: colors/fg/secondary
  layoutSizingHorizontal: HUG
  layoutSizingVertical: HUG
  textStyleId: label/fixed/Medium
  direction-upward-right:
  parent: root
  styles:
  width: 20
  height: 20
  propReferences:
  visible:
  $ref: "#/props/after-icon?"
  mainComponent:
  $ref: "#/props/after-icon:"
- name: font-size:=medium, type:=primary, state:=focused, underlined?=true
  configuration:
  "state:": focused
  elements:
  root:
  children: - slot - eleptical-marquee - label - direction-upward-right - slot
  styles:
  counterAxisAlignItems: CENTER
  layoutMode: HORIZONTAL
  itemSpacing: 4
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
  eleptical-marquee:
  parent: root
  styles:
  visible: false
  width: 20
  height: 20
  propReferences:
  visible:
  $ref: "#/props/before-icon?"
  mainComponent:
  $ref: "#/props/before-Icon:"
  label:
  parent: root
  styles:
  fills: colors/fg/tertiary
  layoutSizingHorizontal: HUG
  layoutSizingVertical: HUG
  textStyleId: label/fixed/Medium
  direction-upward-right:
  parent: root
  styles:
  width: 20
  height: 20
  propReferences:
  visible:
  $ref: "#/props/after-icon?"
  mainComponent:
  $ref: "#/props/after-icon:"
- name: font-size:=medium, type:=primary, state:=disabled, underlined?=true
  configuration:
  "state:": disabled
  elements:
  root:
  children: - slot - eleptical-marquee - label - direction-upward-right - slot
  styles:
  counterAxisAlignItems: CENTER
  layoutMode: HORIZONTAL
  itemSpacing: 4
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
  eleptical-marquee:
  parent: root
  styles:
  visible: false
  width: 20
  height: 20
  propReferences:
  visible:
  $ref: "#/props/before-icon?"
  mainComponent:
  $ref: "#/props/before-Icon:"
  label:
  parent: root
  styles:
  fills: colors/fg/subtle
  layoutSizingHorizontal: HUG
  layoutSizingVertical: HUG
  textStyleId: label/fixed/Medium
  direction-upward-right:
  parent: root
  styles:
  width: 20
  height: 20
  propReferences:
  visible:
  $ref: "#/props/after-icon?"
  mainComponent:
  $ref: "#/props/after-icon:"
- name: font-size:=medium, type:=inverse-primary, state:=default, underlined?=true
  configuration:
  "type:": inverse-primary
  elements:
  root:
  children: - slot - eleptical-marquee - label - direction-upward-right - slot
  styles:
  counterAxisAlignItems: CENTER
  layoutMode: HORIZONTAL
  itemSpacing: 4
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
  eleptical-marquee:
  parent: root
  styles:
  visible: false
  width: 20
  height: 20
  propReferences:
  visible:
  $ref: "#/props/before-icon?"
  mainComponent:
  $ref: "#/props/before-Icon:"
  label:
  parent: root
  styles:
  fills: colors/fg/inverse-primary
  layoutSizingHorizontal: HUG
  layoutSizingVertical: HUG
  textStyleId: label/fixed/Medium
  direction-upward-right:
  parent: root
  styles:
  width: 20
  height: 20
  propReferences:
  visible:
  $ref: "#/props/after-icon?"
  mainComponent:
  $ref: "#/props/after-icon:"
- name: font-size:=medium, type:=secondary, state:=default, underlined?=true
  configuration:
  "type:": secondary
  elements:
  root:
  children: - slot - eleptical-marquee - label - direction-upward-right - slot
  styles:
  counterAxisAlignItems: CENTER
  layoutMode: HORIZONTAL
  itemSpacing: 4
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
  eleptical-marquee:
  parent: root
  styles:
  visible: false
  width: 20
  height: 20
  propReferences:
  visible:
  $ref: "#/props/before-icon?"
  mainComponent:
  $ref: "#/props/before-Icon:"
  label:
  parent: root
  styles:
  fills: colors/fg/muted
  layoutSizingHorizontal: HUG
  layoutSizingVertical: HUG
  textStyleId: label/fixed/Medium
  direction-upward-right:
  parent: root
  styles:
  width: 20
  height: 20
  propReferences:
  visible:
  $ref: "#/props/after-icon?"
  mainComponent:
  $ref: "#/props/after-icon:"
- name: font-size:=small, type:=primary, state:=default, underlined?=true
  configuration:
  "font-size:": small
  elements:
  root:
  children: - slot - eleptical-marquee - label - direction-upward-right - slot
  styles:
  counterAxisAlignItems: CENTER
  layoutMode: HORIZONTAL
  itemSpacing: 4
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
  eleptical-marquee:
  parent: root
  styles:
  visible: false
  width: 20
  height: 20
  propReferences:
  visible:
  $ref: "#/props/before-icon?"
  mainComponent:
  $ref: "#/props/before-Icon:"
  label:
  parent: root
  styles:
  fills: colors/fg/primary
  layoutSizingHorizontal: HUG
  layoutSizingVertical: HUG
  textStyleId: label/fixed/Small
  direction-upward-right:
  parent: root
  styles:
  width: 20
  height: 20
  propReferences:
  visible:
  $ref: "#/props/after-icon?"
  mainComponent:
  $ref: "#/props/after-icon:"
- name: font-size:=x-small, type:=primary, state:=default, underlined?=true
  configuration:
  "font-size:": x-small
  elements:
  root:
  children: - slot - eleptical-marquee - label - direction-upward-right - slot
  styles:
  counterAxisAlignItems: CENTER
  layoutMode: HORIZONTAL
  itemSpacing: 2
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
  eleptical-marquee:
  parent: root
  styles:
  visible: false
  width: 16
  height: 16
  propReferences:
  visible:
  $ref: "#/props/before-icon?"
  mainComponent:
  $ref: "#/props/before-Icon:"
  label:
  parent: root
  styles:
  fills: colors/fg/primary
  layoutSizingHorizontal: HUG
  layoutSizingVertical: HUG
  textStyleId: label/fixed/X-Small
  textAlignHorizontal: CENTER
  direction-upward-right:
  parent: root
  styles:
  width: 16
  height: 16
  propReferences:
  visible:
  $ref: "#/props/after-icon?"
  mainComponent:
  $ref: "#/props/after-icon:"
  invalidVariantCombinations: []
  metadata:
  author: tomas
  lastUpdated: 2026-01-04T10:03:00.205Z
  generator:
  url: https://www.figma.com/community/plugin/1549454283615386215/anova
  version: 4
  name: Directed Edges Anova Figma Plugin
  schema:
  url: https://github.com/DirectedEdges/anova/blob/main/anova.schema.json
  version: 0.3.0
  source:
  pageId: 13286:10277
  nodeId: 13146:2900
