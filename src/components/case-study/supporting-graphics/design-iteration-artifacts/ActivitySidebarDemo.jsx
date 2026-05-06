/**
 * ActivitySidebar Self-Contained Demo
 *
 * Supporting portfolio graphic only. This preserves the shared design-iteration artifact
 * and is not the production LMS component.
 *
 * This file contains all components, icons, and styles needed to render
 * the ActivitySidebar in both expanded and collapsed states.
 *
 * Dependencies: React only
 */

import React, { useState, useRef, useEffect } from 'react';

// =============================================================================
// CSS STYLES (Embedded)
// =============================================================================
const styles = `
/* === CSS Variables (Design Tokens) === */
.demo-container {
  /* Primary Colors */
  --color-primary: #006FEE;
  --color-primary-dark: #0050B3;
  --color-primary-light: #2088FF;
  --color-primary-50: #eff6ff;

  /* Blue */
  --color-blue-500: #3b82f6;
  --color-blue-600: #2563eb;
  --color-blue-50: #eff6ff;

  /* Success (Green) */
  --color-success: #22C55E;
  --color-success-dark: #16A34A;

  /* Warning (Amber) */
  --color-warning: #F59E0B;

  /* Purple */
  --color-purple: #8B5CF6;
  --color-purple-dark: #7C3AED;

  /* Neutrals (Slate) */
  --color-slate-50: #F8FAFC;
  --color-slate-100: #F1F5F9;
  --color-slate-200: #E2E8F0;
  --color-slate-300: #CBD5E1;
  --color-slate-400: #94A3B8;
  --color-slate-500: #64748B;
  --color-slate-600: #475569;
  --color-slate-700: #334155;
  --color-slate-800: #1E293B;
  --color-slate-900: #0F172A;

  /* Semantic Colors */
  --text-primary: #11181C;
  --text-secondary: #71717A;
  --text-muted: #A1A1AA;
  --text-tertiary: #9CA3AF;
  --text-inverse: #FFFFFF;
  --background-primary: #FFFFFF;
  --background-secondary: #F8FAFC;
  --border-default: #E4E4E7;
  --border-medium: #D1D5DB;

  /* Gradients */
  --gradient-primary: linear-gradient(90deg, #006FEE 0%, #2088FF 100%);

  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 12px;
  --spacing-lg: 16px;
  --spacing-xl: 24px;

  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1);
  --shadow-primary-sm: 0 2px 8px rgba(0, 111, 238, 0.3);

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-normal: 200ms ease;

  /* Typography */
  --font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-base: 16px;
  --font-size-lg: 18px;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
}

.demo-container,
.demo-container * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.demo-container {
  font-family: var(--font-family);
  background: #f0f4f8;
}

/* =============================================================================
   ACTIVITY SIDEBAR
   ============================================================================= */
.activity-sidebar {
  width: 360px;
  min-width: 72px;
  max-width: 480px;
  background: var(--color-slate-100);
  border-right: 1px solid var(--border-default);
  color: var(--text-secondary);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  transition: width var(--transition-normal), min-width var(--transition-normal);
  overflow: visible;
  position: relative;
  height: 100vh;
  z-index: 10;
}

.activity-sidebar.collapsed {
  width: 72px;
  min-width: 72px;
  z-index: 100;
  overflow: visible;
}

/* SIDEBAR HEADER */
.activity-sidebar .sidebar-header {
  padding: var(--spacing-sm) var(--spacing-lg);
  border-bottom: 1px solid var(--border-default);
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  height: 57px;
  box-sizing: border-box;
}

.activity-sidebar .sidebar-logo-full {
  height: 24px;
  width: auto;
  transition: opacity var(--transition-fast);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.activity-sidebar .sidebar-logo-icon {
  height: 32px;
  width: 32px;
  display: none;
  flex-shrink: 0;
}

.activity-sidebar.collapsed .sidebar-logo-full {
  display: none;
}

.activity-sidebar.collapsed .sidebar-logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gradient-primary);
  border-radius: var(--radius-md);
  color: white;
  font-weight: bold;
  font-size: 14px;
}

/* SIDEBAR TOGGLE */
.activity-sidebar .sidebar-toggle {
  position: absolute;
  right: -14px;
  top: 50%;
  transform: translateY(-50%);
  width: 28px;
  height: 28px;
  border-radius: var(--radius-full);
  background: var(--background-primary);
  border: 1px solid var(--border-default);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-fast);
  z-index: 1000;
  box-shadow: var(--shadow-sm);
}

.activity-sidebar .sidebar-toggle:hover {
  background: var(--color-slate-100);
  border-color: var(--border-medium);
  box-shadow: var(--shadow-md);
}

.activity-sidebar .sidebar-toggle svg {
  color: var(--text-tertiary);
  transition: transform var(--transition-fast);
}

.activity-sidebar.collapsed .sidebar-toggle svg {
  transform: rotate(180deg);
}

/* BACK BUTTON + COURSE NAME ROW */
.activity-sidebar .back-course-row {
  padding: var(--spacing-md) var(--spacing-lg);
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  border-bottom: 1px solid var(--border-default);
}

.activity-sidebar .back-btn {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-md);
  background: var(--background-primary);
  border: 1px solid var(--border-default);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-fast);
  flex-shrink: 0;
  color: var(--text-secondary);
}

.activity-sidebar .back-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
  box-shadow: var(--shadow-sm);
}

.activity-sidebar .course-name-text {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* MODULE/UNIT LABEL */
.activity-sidebar .module-unit-label {
  padding: var(--spacing-lg);
  font-size: 11px;
  font-weight: var(--font-weight-semibold);
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.activity-sidebar .module-unit-label-collapsed {
  display: none;
  padding: var(--spacing-sm);
  font-size: 11px;
  font-weight: var(--font-weight-bold);
  color: var(--text-muted);
  text-align: center;
  background: var(--background-secondary);
}

/* PARENT CONTEXT */
.activity-sidebar .parent-context {
  padding: 0 var(--spacing-lg) var(--spacing-lg);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.activity-sidebar .parent-number-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  background: rgba(0, 111, 238, 0.1);
  color: var(--color-primary);
  white-space: nowrap;
  flex-shrink: 0;
  min-height: 24px;
}

.activity-sidebar .parent-title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  line-height: 1.4;
}

/* ACTIVITY LIST */
.activity-sidebar .activity-list {
  flex: 1;
  overflow-y: auto;
  background: var(--background-primary);
  border-top: 1px solid var(--border-default);
  scrollbar-width: thin;
  scrollbar-color: var(--color-slate-300) transparent;
}

.activity-sidebar .activity-list::-webkit-scrollbar {
  width: 4px;
}

.activity-sidebar .activity-list::-webkit-scrollbar-thumb {
  background: var(--color-slate-300);
  border-radius: var(--radius-full);
}

.activity-sidebar .activity-item {
  border-bottom: 1px solid var(--color-slate-200);
}

.activity-sidebar .activity-item:last-child {
  border-bottom: none;
}

.activity-sidebar .activity-item.current {
  border-bottom: none;
  padding: var(--spacing-xs) 0;
}

.activity-sidebar .activity-item.clickable {
  cursor: pointer;
}

.activity-sidebar .activity-item.clickable:hover .activity-sidebar-item {
  background: var(--color-slate-50);
}

/* INNER NAVIGATION LIST */
.activity-sidebar .inner-nav-list {
  display: none;
  padding: var(--spacing-xs) var(--spacing-lg) var(--spacing-md);
  padding-left: calc(var(--spacing-lg) + 48px);
  background: var(--background-primary);
  position: relative;
}

.activity-sidebar .inner-nav-list::before {
  content: '';
  position: absolute;
  left: calc(var(--spacing-lg) + 48px + 10px);
  top: calc(var(--spacing-xs) + 18px);
  bottom: calc(var(--spacing-md) + 18px);
  width: 2px;
  background: var(--color-slate-200);
  border-radius: 1px;
  z-index: 0;
}

.activity-sidebar .activity-item.expanded .inner-nav-list {
  display: block;
}

.activity-sidebar .activity-item.expanded {
  border-bottom: 1px solid var(--color-slate-200);
}

/* Collapsed inner nav list */
.activity-sidebar.collapsed .inner-nav-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--spacing-sm) 0;
  padding-left: 0;
  gap: var(--spacing-xs);
  background: var(--color-primary-50);
  border-radius: 0 0 var(--radius-md) var(--radius-md);
  margin: 0 var(--spacing-xs);
}

.activity-sidebar.collapsed .inner-nav-list::before {
  display: none;
}

.activity-sidebar.collapsed .inner-nav-item {
  justify-content: center;
  padding: var(--spacing-xs) 0;
}

.activity-sidebar.collapsed .inner-nav-title {
  display: none;
}

.activity-sidebar.collapsed .inner-nav-number {
  width: 20px;
  height: 20px;
  font-size: 9px;
  cursor: pointer;
  transition: all var(--transition-fast);
}

/* USER PROFILE */
.activity-sidebar .user-profile {
  padding: var(--spacing-md) var(--spacing-lg);
  border-top: 1px solid var(--border-default);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-top: auto;
  background: var(--background-primary);
  position: relative;
  z-index: 2;
  box-shadow: 0 -4px 8px -4px rgba(0, 0, 0, 0.1);
}

.activity-sidebar .user-avatar-wrapper {
  position: relative;
  flex-shrink: 0;
  cursor: pointer;
}

.activity-sidebar .user-avatar {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-full);
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-blue-500) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-inverse);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  box-shadow: var(--shadow-primary-sm);
}

.activity-sidebar .user-info {
  flex: 1;
  min-width: 0;
  overflow: hidden;
}

.activity-sidebar .user-name {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-slate-700);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.activity-sidebar .user-menu-btn {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-md);
  background: transparent;
  border: 1px solid transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--text-tertiary);
  transition: all var(--transition-fast);
  flex-shrink: 0;
}

.activity-sidebar .user-menu-btn:hover {
  background: var(--color-slate-100);
  color: var(--color-slate-600);
}

/* COLLAPSED STATE */
.activity-sidebar.collapsed .sidebar-header {
  justify-content: center;
  padding: var(--spacing-md);
}

.activity-sidebar.collapsed .back-course-row {
  flex-direction: column;
  padding: var(--spacing-sm);
  gap: var(--spacing-xs);
}

.activity-sidebar.collapsed .course-name-text {
  display: none;
}

.activity-sidebar.collapsed .module-unit-label {
  display: none;
}

.activity-sidebar.collapsed .module-unit-label-collapsed {
  display: block;
}

.activity-sidebar.collapsed .parent-context {
  display: none;
}

.activity-sidebar.collapsed .activity-list {
  padding: var(--spacing-sm);
  overflow: visible;
  position: relative;
  z-index: 100;
}

.activity-sidebar.collapsed .activity-item {
  margin-bottom: var(--spacing-sm);
  position: relative;
}

.activity-sidebar.collapsed .user-profile {
  justify-content: center;
  padding: var(--spacing-md) var(--spacing-sm);
}

.activity-sidebar.collapsed .user-info,
.activity-sidebar.collapsed .user-menu-btn {
  display: none;
}

/* TOOLTIP FOR COLLAPSED STATE */
.activity-sidebar .activity-tooltip {
  display: none;
  position: absolute;
  left: calc(100% + 8px);
  top: 50%;
  transform: translateY(-50%);
  background: var(--background-primary);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
  min-width: 280px;
  max-width: 320px;
  box-shadow: var(--shadow-xl);
  z-index: 9999;
  pointer-events: none;
  flex-direction: row;
  align-items: flex-start;
  gap: var(--spacing-md);
}

.activity-sidebar .activity-tooltip::before {
  content: '';
  position: absolute;
  left: -6px;
  top: 50%;
  transform: translateY(-50%);
  border: 6px solid transparent;
  border-right-color: var(--border-default);
}

.activity-sidebar .activity-tooltip::after {
  content: '';
  position: absolute;
  left: -5px;
  top: 50%;
  transform: translateY(-50%);
  border: 5px solid transparent;
  border-right-color: var(--background-primary);
}

.activity-sidebar.collapsed .activity-item:hover .activity-tooltip {
  display: flex;
}

.activity-sidebar .activity-tooltip-number {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--text-muted);
  flex-shrink: 0;
  padding-top: 2px;
}

.activity-sidebar .activity-tooltip.current .activity-tooltip-number {
  color: var(--color-primary);
}

.activity-sidebar .activity-tooltip-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  min-width: 0;
}

.activity-sidebar .activity-tooltip-title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
  line-height: 1.4;
}

.activity-sidebar .activity-tooltip-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  border-radius: var(--radius-full);
  background: var(--chip-bg, rgba(0, 111, 238, 0.1));
  color: var(--chip-color, var(--color-primary));
  font-size: 10px;
  font-weight: var(--font-weight-medium);
  width: fit-content;
}

.activity-sidebar .activity-tooltip-progress {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  flex-shrink: 0;
}

.activity-sidebar .activity-tooltip-progress-text {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
}

.activity-sidebar .activity-tooltip.current {
  background: var(--color-primary-50);
  border-color: var(--color-primary);
}

/* =============================================================================
   ACTIVITY SIDEBAR ITEM
   ============================================================================= */
.activity-sidebar-item {
  display: flex;
  align-items: flex-start;
  padding: var(--spacing-md) var(--spacing-xl);
  cursor: pointer;
  transition: all var(--transition-fast);
  gap: var(--spacing-sm);
  position: relative;
  background: var(--background-primary);
}

.activity-sidebar-item:hover {
  background: var(--color-slate-50);
}

.activity-sidebar-item.current {
  background: linear-gradient(135deg, rgba(0, 111, 238, 0.08) 0%, rgba(0, 111, 238, 0.04) 100%);
  cursor: default;
  margin: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-lg);
}

.activity-sidebar-item .sidebar-item-number {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-slate-400);
  flex-shrink: 0;
  padding-top: 2px;
}

.activity-sidebar-item.current .sidebar-item-number {
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
}

.activity-sidebar-item .sidebar-item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  min-width: 0;
  max-width: 200px;
}

.activity-sidebar-item .sidebar-item-title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-slate-400);
  line-height: 1.4;
  word-wrap: break-word;
}

.activity-sidebar-item.current .sidebar-item-title {
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
}

.activity-sidebar-item .sidebar-item-chip {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 1px 6px;
  background: var(--chip-bg, var(--color-slate-100));
  color: var(--chip-color, var(--color-slate-500));
  border-radius: var(--radius-sm);
  white-space: nowrap;
  width: fit-content;
  font-size: 10px;
}

.activity-sidebar-item .sidebar-item-progress {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  flex-shrink: 0;
  margin-left: auto;
}

.activity-sidebar-item .sidebar-progress-text {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
}

/* Collapsed sidebar item */
.activity-sidebar.collapsed .activity-sidebar-item {
  justify-content: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm);
  margin: 0;
}

.activity-sidebar.collapsed .activity-sidebar-item .sidebar-item-info,
.activity-sidebar.collapsed .activity-sidebar-item .sidebar-item-progress {
  display: none;
}

.activity-sidebar.collapsed .activity-sidebar-item .sidebar-item-number {
  font-size: 10px;
  min-width: auto;
  padding-top: 0;
}

.activity-sidebar.collapsed .activity-sidebar-item.current {
  background: var(--gradient-primary);
  border-radius: var(--radius-md) var(--radius-md) 0 0;
  margin: 0 var(--spacing-xs);
  padding: var(--spacing-sm);
  box-shadow: 0 2px 4px rgba(0, 111, 238, 0.2);
}

.activity-sidebar.collapsed .activity-sidebar-item.current .sidebar-item-number {
  color: var(--text-inverse);
  font-weight: var(--font-weight-bold);
}

.activity-sidebar-item .sidebar-number-prefix {
  display: none;
}

.activity-sidebar-item .sidebar-number-serial::after {
  content: '.';
}

.activity-sidebar-item .sidebar-item-title-row {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  flex-wrap: wrap;
}

/* =============================================================================
   INNER NAV ITEM
   ============================================================================= */
.inner-nav-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) 0;
  cursor: pointer;
  transition: all var(--transition-fast);
  position: relative;
  z-index: 1;
}

.inner-nav-item:hover {
  opacity: 0.8;
}

.inner-nav-item:hover .inner-nav-title {
  color: var(--color-primary);
}

.inner-nav-item:hover .inner-nav-number {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.inner-nav-item .inner-nav-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  background: var(--background-primary);
  border: 1.5px solid var(--color-slate-300);
  border-radius: var(--radius-full);
  font-size: 10px;
  font-weight: var(--font-weight-bold);
  color: var(--text-muted);
  transition: all var(--transition-fast);
}

.inner-nav-item.active .inner-nav-number {
  width: 22px;
  height: 22px;
  background: var(--gradient-primary);
  border-color: var(--color-primary);
  color: var(--text-inverse);
  font-size: 11px;
  box-shadow: 0 1px 4px rgba(0, 111, 238, 0.3);
}

.inner-nav-item.completed .inner-nav-number {
  background: var(--color-success);
  border-color: var(--color-success);
  color: var(--text-inverse);
}

.inner-nav-item .inner-nav-title {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  color: var(--text-secondary);
  line-height: 1.4;
  flex: 1;
  transition: color var(--transition-fast);
}

.inner-nav-item.active .inner-nav-title {
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
}

/* =============================================================================
   DONUT PROGRESS
   ============================================================================= */
.donut-progress {
  flex-shrink: 0;
  position: relative;
  z-index: 2;
}

/* =============================================================================
   GRADE MEDAL
   ============================================================================= */
.grade-medal {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
}

.grade-medal-svg {
  width: 100%;
  height: 100%;
}

.grade-medal-content {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 5%;
  left: 50%;
  transform: translateX(-50%);
  width: 70%;
  height: 60%;
}

.grade-medal-label {
  color: white;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  opacity: 0.9;
}

.grade-medal-letter {
  color: white;
  font-weight: 700;
  line-height: 1;
}

.grade-medal--xs {
  width: 20px;
  height: 28px;
}

.grade-medal--xs .grade-medal-label {
  display: none;
}

.grade-medal--xs .grade-medal-letter {
  font-size: 10px;
}

.grade-medal--xs .grade-medal-content {
  top: 3%;
  height: 60%;
}

/* =============================================================================
   DEMO CONTAINER
   ============================================================================= */
.demo-container {
  display: flex;
  gap: 40px;
  padding: 20px;
  min-height: 100vh;
  background: #f0f4f8;
}

.activity-sidebar-demo-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.activity-sidebar-demo-section h3 {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
  text-align: center;
}

.activity-sidebar-demo-wrapper {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}
`;

// =============================================================================
// ICON COMPONENTS
// =============================================================================
const ChevronLeftIcon = ({ size = 16, className = '', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M10 12l-4-4 4-4" />
  </svg>
);

const ArrowLeftIcon = ({ size = 24, className = '', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} {...props}>
    <path d="M11 17l-5-5m0 0l5-5m-5 5h12" />
  </svg>
);

const DotsVerticalIcon = ({ size = 24, className = '', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} {...props}>
    <circle cx="12" cy="12" r="1" />
    <circle cx="12" cy="5" r="1" />
    <circle cx="12" cy="19" r="1" />
  </svg>
);

const BookOpenIcon = ({ size = 14, className = '', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const PencilSquareIcon = ({ size = 14, className = '', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const UQEIcon = ({ size = 14, className = '', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M9.5 9.5c0-1.5 1.1-2.5 2.5-2.5s2.5 1 2.5 2.5c0 1.5-1.5 2-2.5 2.5v1" />
    <circle cx="12" cy="16.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);

const CheckIcon = ({ size = 14, className = '', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M5 13l4 4L19 7" />
  </svg>
);

// =============================================================================
// DONUT PROGRESS COMPONENT
// =============================================================================
const DonutProgress = ({ completed, total, size = 18 }) => {
  const percentage = total > 0 ? (completed / total) * 100 : 0;
  const strokeWidth = 4;
  const radius = (size / 2) - (strokeWidth / 2);
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const isComplete = percentage === 100;
  const isNotStarted = percentage === 0;
  const trackColor = isNotStarted ? '#E2E8F0' : (isComplete ? 'rgba(34, 197, 94, 0.2)' : 'rgba(0, 111, 238, 0.2)');
  const progressColor = isComplete ? '#22C55E' : '#006FEE';

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="donut-progress">
      <circle cx={size / 2} cy={size / 2} r={radius - 1} fill="white" />
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={trackColor} strokeWidth={strokeWidth} />
      {!isNotStarted && (
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={progressColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} transform={`rotate(-90 ${size / 2} ${size / 2})`} />
      )}
    </svg>
  );
};

// =============================================================================
// GRADE MEDAL COMPONENT
// =============================================================================
const GradeMedal = ({ grade, size = 'md' }) => {
  const gradeColors = {
    A: '#22C55E',
    B: '#F5A524',
    C: '#F31260'
  };
  const color = gradeColors[grade] || gradeColors.C;

  return (
    <div className={`grade-medal grade-medal--${size} grade-medal--${grade?.toLowerCase()}`}>
      <svg viewBox="0 0 316 448" fill="none" xmlns="http://www.w3.org/2000/svg" className="grade-medal-svg">
        <path d="M251.136 439.52C251.136 446.24 243.616 450.24 238.016 446.56L162.176 396.8C159.296 394.88 155.776 394.88 152.896 396.8L77.0557 446.56C71.4557 450.24 63.9355 446.24 63.9355 439.52V312.768C91.3114 329.344 123.263 339.056 157.535 339.056C191.807 339.056 223.76 329.344 251.136 312.768V439.52Z" fill={color}/>
        <path d="M157.536 0C244.544 6.59844e-05 315.072 70.5282 315.072 157.536C315.072 244.544 244.544 315.072 157.536 315.072C70.5282 315.072 7.42132e-05 244.544 0 157.536C0 70.5281 70.5281 0 157.536 0Z" fill={color}/>
      </svg>
      <div className="grade-medal-content">
        <span className="grade-medal-letter">{grade}</span>
      </div>
    </div>
  );
};

// =============================================================================
// ACTIVITY TYPE CONFIG
// =============================================================================
const activityTypeConfig = {
  SPARK: {
    icon: BookOpenIcon,
    name: 'Concept',
    chipBg: 'rgba(0, 111, 238, 0.1)',
    chipColor: '#006FEE',
  },
  SKILL: {
    icon: PencilSquareIcon,
    name: 'Process Skill',
    chipBg: 'rgba(245, 158, 11, 0.12)',
    chipColor: '#B45309',
  },
  UQE: {
    icon: UQEIcon,
    name: 'UQE',
    chipBg: 'rgba(22, 163, 74, 0.12)',
    chipColor: '#16A34A',
  },
};

const formatEstimatedTime = (minutes) => {
  if (!minutes) return null;
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
};

// =============================================================================
// INNER NAV ITEM COMPONENT
// =============================================================================
const InnerNavItem = ({ number, title, isActive = false, isCompleted = false, onClick }) => {
  const className = ['inner-nav-item', isActive && 'active', isCompleted && 'completed'].filter(Boolean).join(' ');

  return (
    <div className={className} onClick={onClick} title={title}>
      <span className="inner-nav-number">
        {isCompleted ? <CheckIcon size={12} /> : number}
      </span>
      <span className="inner-nav-title">{title}</span>
    </div>
  );
};

// =============================================================================
// ACTIVITY SIDEBAR ITEM COMPONENT
// =============================================================================
const ActivitySidebarItem = ({ activity, activityIndex, moduleContext, isCurrent = false, onClick }) => {
  const activityNumber = moduleContext
    ? `${moduleContext.moduleNumber}.${moduleContext.unitNumber || 1}.${activityIndex + 1}`
    : `${activityIndex + 1}`;

  const isCompleted = activity.progressStatus === 'COMPLETED';
  const progress = activity.progressPercentage || 0;
  const hasGrade = isCompleted && activity.grade;

  const typeConfig = activityTypeConfig[activity.contentType] || activityTypeConfig.SPARK;
  const ActivityTypeIcon = typeConfig.icon;
  const estimatedTime = formatEstimatedTime(activity.estimatedTime);

  const numberParts = activityNumber.split('.');
  const serialNumber = numberParts[numberParts.length - 1];

  return (
    <div
      className={`activity-sidebar-item ${isCurrent ? 'current' : ''}`}
      onClick={!isCurrent ? onClick : undefined}
      style={{ cursor: !isCurrent ? 'pointer' : 'default' }}
    >
      <span className="sidebar-item-number">
        <span className="sidebar-number-serial">{serialNumber}</span>
      </span>

      <div className="sidebar-item-info">
        <div className="sidebar-item-title-row">
          <span className="sidebar-item-title">{activity.contentName}</span>
        </div>
        <span className="sidebar-item-chip" style={{ '--chip-bg': typeConfig.chipBg, '--chip-color': typeConfig.chipColor }}>
          <ActivityTypeIcon size={10} />
          {estimatedTime && <span className="chip-time">{estimatedTime}</span>}
        </span>
      </div>

      <div className="sidebar-item-progress">
        {hasGrade ? (
          <GradeMedal grade={activity.grade} size="xs" />
        ) : (
          <>
            {isCurrent && <span className="sidebar-progress-text">{progress}%</span>}
            <DonutProgress completed={progress} total={100} size={22} />
          </>
        )}
      </div>
    </div>
  );
};

// =============================================================================
// ACTIVITY SIDEBAR TOOLTIP COMPONENT
// =============================================================================
const ActivitySidebarTooltip = ({ activity, activityIndex, moduleContext, isCurrent }) => {
  const activityNumber = moduleContext
    ? `${moduleContext.moduleNumber}.${moduleContext.unitNumber || 1}.${activityIndex + 1}`
    : `${activityIndex + 1}`;

  const typeConfig = activityTypeConfig[activity.contentType] || activityTypeConfig.SPARK;
  const ActivityTypeIcon = typeConfig.icon;
  const estimatedTime = formatEstimatedTime(activity.estimatedTime);

  const isCompleted = activity.progressStatus === 'COMPLETED';
  const progress = activity.progressPercentage || 0;
  const hasGrade = isCompleted && activity.grade;

  return (
    <div className={`activity-tooltip ${isCurrent ? 'current' : ''}`}>
      <span className="activity-tooltip-number">{activityNumber}</span>
      <div className="activity-tooltip-info">
        <span className="activity-tooltip-title">{activity.contentName}</span>
        <div className="activity-tooltip-chip" style={{ '--chip-bg': typeConfig.chipBg, '--chip-color': typeConfig.chipColor }}>
          <ActivityTypeIcon size={10} />
          {estimatedTime && <span className="chip-time">{estimatedTime}</span>}
        </div>
      </div>
      <div className="activity-tooltip-progress">
        {hasGrade ? (
          <GradeMedal grade={activity.grade} size="xs" />
        ) : (
          <>
            <span className="activity-tooltip-progress-text">{progress}%</span>
            <DonutProgress completed={progress} total={100} size={18} />
          </>
        )}
      </div>
    </div>
  );
};

// =============================================================================
// ACTIVITY SIDEBAR COMPONENT
// =============================================================================
const ActivitySidebar = ({
  moduleContext,
  siblingActivities = [],
  currentActivityId,
  innerNavigation = [],
  currentInnerNavId,
  completedInnerNavIds = new Set(),
  onInnerNavChange,
  onActivityChange,
  collapsed = false,
  onToggleCollapse,
  userProfile,
  courseName,
}) => {
  const activityListRef = useRef(null);
  const currentActivityRef = useRef(null);

  const getParentContext = () => {
    if (!moduleContext) return null;
    if (moduleContext.unitNumber && moduleContext.unitTitle) {
      return {
        number: `${moduleContext.moduleNumber}.${moduleContext.unitNumber}`,
        title: moduleContext.unitTitle,
      };
    }
    return {
      number: `${moduleContext.moduleNumber}`,
      title: moduleContext.moduleTitle,
    };
  };

  const parentContext = getParentContext();

  return (
    <aside className={`activity-sidebar ${collapsed ? 'collapsed' : ''}`}>
      {/* Collapse Toggle Button */}
      <button className="sidebar-toggle" onClick={onToggleCollapse} title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
        <ChevronLeftIcon size={16} />
      </button>

      {/* Header with Logo */}
      <div className="sidebar-header">
        <div className="sidebar-logo-full">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="12,2 22,20 2,20" />
          </svg>
          PRISM
        </div>
        <div className="sidebar-logo-icon">P</div>
      </div>

      {/* Back Button + Course Name Row */}
      <div className="back-course-row">
        <button className="back-btn" title="Back to Course">
          <ArrowLeftIcon size={16} />
        </button>
        <span className="course-name-text">{courseName || 'Course'}</span>
      </div>

      {/* Module/Unit Label - Expanded state */}
      {moduleContext && (
        <div className="module-unit-label">
          MODULE {moduleContext.moduleNumber}
          {moduleContext.unitNumber && ` UNIT ${moduleContext.unitNumber}`}
        </div>
      )}

      {/* Module/Unit Label - Collapsed state */}
      {moduleContext && (
        <div className="module-unit-label-collapsed">
          M{moduleContext.moduleNumber}{moduleContext.unitNumber && `·U${moduleContext.unitNumber}`}
        </div>
      )}

      {/* Parent Context */}
      {parentContext && (
        <div className="parent-context">
          <span className="parent-number-chip">{parentContext.number}</span>
          <span className="parent-title">{parentContext.title}</span>
        </div>
      )}

      {/* Activity List */}
      <div className="activity-list" ref={activityListRef}>
        {siblingActivities.map((activity, index) => {
          const isCurrent = String(activity.contentId) === String(currentActivityId);

          return (
            <div
              key={activity.contentId}
              ref={isCurrent ? currentActivityRef : null}
              className={`activity-item ${isCurrent ? 'current expanded' : ''} ${!isCurrent ? 'clickable' : ''}`}
            >
              <ActivitySidebarItem
                activity={activity}
                activityIndex={index}
                moduleContext={moduleContext}
                isCurrent={isCurrent}
                onClick={() => onActivityChange?.(activity.contentId)}
              />

              {/* Inner Navigation */}
              {isCurrent && innerNavigation.length > 0 && (
                <div className="inner-nav-list">
                  {innerNavigation.map((navItem, navIndex) => (
                    <InnerNavItem
                      key={navItem.id}
                      number={navIndex + 1}
                      title={navItem.title || navItem.label}
                      isActive={currentInnerNavId === navItem.id}
                      isCompleted={completedInnerNavIds.has(navItem.id)}
                      onClick={() => onInnerNavChange?.(navItem.id)}
                    />
                  ))}
                </div>
              )}

              {/* Tooltip for collapsed state */}
              <ActivitySidebarTooltip
                activity={activity}
                activityIndex={index}
                moduleContext={moduleContext}
                isCurrent={isCurrent}
              />
            </div>
          );
        })}
      </div>

      {/* User Profile */}
      <div className="user-profile">
        <div className="user-avatar-wrapper">
          <div className="user-avatar">{userProfile?.initials || 'JD'}</div>
        </div>
        <div className="user-info">
          <div className="user-name">{userProfile?.name || 'John Doe'}</div>
        </div>
        <button className="user-menu-btn" title="Menu">
          <DotsVerticalIcon size={16} />
        </button>
      </div>
    </aside>
  );
};

// =============================================================================
// SAMPLE DATA
// =============================================================================
const sampleModuleContext = {
  moduleNumber: 1,
  moduleTitle: 'Linear Equations',
  unitNumber: 2,
  unitTitle: 'Solving One-Variable Equations',
};

const sampleActivities = [
  {
    contentId: '1',
    contentName: 'Introduction to Variables',
    contentType: 'SPARK',
    estimatedTime: 15,
    progressStatus: 'COMPLETED',
    progressPercentage: 100,
    grade: 'A',
  },
  {
    contentId: '2',
    contentName: 'Practice: Variable Expressions',
    contentType: 'SKILL',
    estimatedTime: 20,
    progressStatus: 'COMPLETED',
    progressPercentage: 100,
    grade: 'B',
  },
  {
    contentId: '3',
    contentName: 'Solving Linear Equations',
    contentType: 'SPARK',
    estimatedTime: 25,
    progressStatus: 'IN_PROGRESS',
    progressPercentage: 65,
  },
  {
    contentId: '4',
    contentName: 'Unit Quiz: Linear Equations',
    contentType: 'UQE',
    estimatedTime: 30,
    progressStatus: 'NOT_STARTED',
    progressPercentage: 0,
  },
];

const sampleInnerNavigation = [
  { id: 'intro', title: 'Introduction' },
  { id: 'concept', title: 'Core Concept' },
  { id: 'examples', title: 'Examples' },
  { id: 'practice', title: 'Practice Problems' },
  { id: 'summary', title: 'Summary' },
];

const sampleUserProfile = {
  name: 'John Doe',
  initials: 'JD',
  email: 'john.doe@example.com',
};

// =============================================================================
// DEMO COMPONENT
// =============================================================================
const ActivitySidebarDemo = () => {
  const [expandedCurrentNav, setExpandedCurrentNav] = useState('concept');
  const [collapsedCurrentNav, setCollapsedCurrentNav] = useState('concept');
  const [expandedCurrentActivity, setExpandedCurrentActivity] = useState('3');
  const [collapsedCurrentActivity, setCollapsedCurrentActivity] = useState('3');

  // Inject styles
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <div className="demo-container">
      {/* Expanded State */}
      <div className="activity-sidebar-demo-section">
        <h3>Expanded State</h3>
        <div className="activity-sidebar-demo-wrapper">
          <ActivitySidebar
            moduleContext={sampleModuleContext}
            siblingActivities={sampleActivities}
            currentActivityId={expandedCurrentActivity}
            innerNavigation={sampleInnerNavigation}
            currentInnerNavId={expandedCurrentNav}
            completedInnerNavIds={new Set(['intro'])}
            onInnerNavChange={setExpandedCurrentNav}
            onActivityChange={setExpandedCurrentActivity}
            collapsed={false}
            onToggleCollapse={() => {}}
            userProfile={sampleUserProfile}
            courseName="Linear Equations"
          />
        </div>
      </div>

      {/* Collapsed State */}
      <div className="activity-sidebar-demo-section">
        <h3>Collapsed State</h3>
        <div className="activity-sidebar-demo-wrapper">
          <ActivitySidebar
            moduleContext={sampleModuleContext}
            siblingActivities={sampleActivities}
            currentActivityId={collapsedCurrentActivity}
            innerNavigation={sampleInnerNavigation}
            currentInnerNavId={collapsedCurrentNav}
            completedInnerNavIds={new Set(['intro'])}
            onInnerNavChange={setCollapsedCurrentNav}
            onActivityChange={setCollapsedCurrentActivity}
            collapsed={true}
            onToggleCollapse={() => {}}
            userProfile={sampleUserProfile}
            courseName="Linear Equations"
          />
        </div>
      </div>
    </div>
  );
};

export default ActivitySidebarDemo;
