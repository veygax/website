import type { Component } from 'svelte';

export type TuiItemId = string;

export interface TuiItem {
  id: TuiItemId;
  label: string;
  detail?: Component<any>;
  meta?: unknown;
}

export interface TuiTab {
  id: string;
  label: string;
  items: TuiItem[];
}

export interface TuiConfig {
  tabs: TuiTab[];
}

