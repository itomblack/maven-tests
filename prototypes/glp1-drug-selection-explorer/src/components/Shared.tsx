import { useState, type ReactNode } from "react";
import {
  Check,
  ChevronDown,
  ChevronUp,
  CircleHelp,
  Pill,
  ShieldCheck,
  Syringe,
  X,
} from "lucide-react";
import { disclaimer, money } from "../data";
import type { Medication, SelectionProps } from "../types";

export const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

export function MedicationIcon({ type }: { type: Medication["type"] }) {
  const Icon = type === "Pill" ? Pill : Syringe;
  return (
    <span className="flex size-24 shrink-0 items-center justify-center rounded-full bg-maven-100 text-icon-maven">
      <Icon aria-hidden="true" className="size-12" strokeWidth={1.8} />
    </span>
  );
}

export function Badge({ children, quiet = false }: { children: ReactNode; quiet?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-full px-8 py-4 font-primary text-legal font-medium leading-none",
        quiet ? "bg-coconut-100 text-text-secondary" : "bg-maven-100 text-maven-800",
      )}
    >
      {children}
    </span>
  );
}

export function ScreenHeader({ step = "3 of 5" }: { step?: string }) {
  return (
    <>
      <div className="flex items-center justify-between border-b border-border-disabled bg-surface-primary px-16 py-12">
        <a href="../../" className="font-primary text-body-sm text-text-link-primary no-underline">
          ← All prototypes
        </a>
        <span className="font-emphasis text-subheadline-xs text-text-primary">Maven</span>
        <span className="font-primary text-legal text-text-secondary">{step}</span>
      </div>
      <div className="h-4 bg-gray-300" aria-label={`Progress: ${step}`}>
        <div className="h-4 w-1/2 bg-maven-500" />
      </div>
    </>
  );
}

export function ScreenIntro({
  eyebrow,
  title = "Do you have a GLP-1 in mind?",
  body,
  compact = false,
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
  compact?: boolean;
}) {
  return (
    <header className={cn("grid gap-8", compact ? "mb-16" : "mb-20")}>
      {eyebrow ? (
        <p className="m-0 font-primary text-overline uppercase tracking-overline text-maven-800">{eyebrow}</p>
      ) : null}
      <h1 className="m-0 font-emphasis text-headline-lg font-normal tracking-headline text-text-primary">
        {title}
      </h1>
      {body ? <p className="m-0 font-primary text-body-sm text-text-secondary">{body}</p> : null}
    </header>
  );
}

export function SelectIndicator({ selected }: { selected: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex size-20 shrink-0 items-center justify-center rounded-full border",
        selected
          ? "border-border-brand bg-fill-button-primary text-icon-primary-inverse"
          : "border-border-primary bg-surface-primary",
      )}
    >
      {selected ? <Check className="size-12" strokeWidth={2.5} /> : null}
    </span>
  );
}

export function SelectableCard({
  selected,
  onClick,
  children,
  label,
  className,
}: {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      aria-label={label}
      onClick={onClick}
      className={cn(
        "w-full rounded-md border bg-surface-primary p-16 text-left transition",
        selected ? "border-border-brand ring-1 ring-border-brand" : "border-border-disabled",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function NotSureCard({ selected, onSelect }: SelectionProps) {
  const active = selected === "not-sure";
  return (
    <SelectableCard selected={active} onClick={() => onSelect("not-sure")} label="I'm not sure">
      <span className="flex items-center gap-12">
        <span className="flex size-24 items-center justify-center rounded-full bg-coconut-100 text-icon-maven">
          <CircleHelp aria-hidden="true" className="size-12" />
        </span>
        <span className="min-w-0 flex-1">
          <strong className="block font-primary text-body-default font-medium text-text-primary">I’m not sure</strong>
          <span className="block font-primary text-body-sm text-text-secondary">
            Let my clinician recommend an option
          </span>
        </span>
        <SelectIndicator selected={active} />
      </span>
    </SelectableCard>
  );
}

export function PriceDetails({ medication, compact = false }: { medication: Medication; compact?: boolean }) {
  const rows = [
    ["First month", money(medication.firstMonth)],
    ["Typical ongoing", `${money(medication.ongoing)}/month`],
    medication.prepay3 ? ["3-month prepay", `${money(medication.prepay3)}/month`] : null,
    medication.prepay12 ? ["12-month prepay", `${money(medication.prepay12)}/month`] : null,
    ["Total due today", money(medication.firstMonth)],
  ].filter(Boolean) as string[][];

  return (
    <div className={cn("grid", compact ? "gap-8" : "gap-12")}>
      {rows.map(([label, value]) => (
        <div key={label} className="flex items-baseline justify-between gap-12 font-primary text-body-sm">
          <span className="text-text-secondary">{label}</span>
          <strong className="price-nums text-right font-medium text-text-primary">{value}</strong>
        </div>
      ))}
      {medication.prepay12 ? (
        <div className="rounded-sm bg-fill-success-secondary p-12 font-primary text-body-sm text-maven-800">
          Save {money(medication.ongoing - medication.prepay12)}/month with 12-month prepay.
        </div>
      ) : (
        <p className="m-0 font-primary text-legal text-text-secondary">No prepay discount is currently available.</p>
      )}
    </div>
  );
}

export function DisclosureButton({
  open,
  onClick,
  children,
}: {
  open: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  const Icon = open ? ChevronUp : ChevronDown;
  return (
    <button
      type="button"
      aria-expanded={open}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      className="flex items-center gap-4 border-0 bg-transparent p-0 font-primary text-body-sm text-text-link-primary underline-offset-4 hover:underline"
    >
      {children}
      <Icon aria-hidden="true" className="size-12" />
    </button>
  );
}

export function StickyCTA({ selected }: { selected: string | null }) {
  const [confirmed, setConfirmed] = useState(false);
  const enabled = Boolean(selected);
  return (
    <div className="sticky-cta border-t border-border-disabled bg-surface-primary px-16 py-12">
      <p className="mb-8 mt-0 font-primary text-legal text-text-secondary">{disclaimer}</p>
      <button
        type="button"
        disabled={!enabled}
        onClick={() => setConfirmed(true)}
        className={cn(
          "w-full rounded-full px-16 py-12 font-primary text-body-default font-medium transition",
          enabled
            ? "bg-fill-button-primary text-text-primary-inverse hover:bg-maven-900"
            : "cursor-not-allowed bg-fill-button-disabled text-text-disabled",
        )}
      >
        {confirmed ? "Selection saved" : selected === "not-sure" ? "Continue with clinician recommendation" : "Continue with selection"}
      </button>
    </div>
  );
}

export function BottomSheet({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="phone-overlay" role="presentation" onClick={onClose}>
      <section
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="bottom-sheet grid gap-16 rounded-t-lg bg-surface-primary p-20 shadow-elevation-overlay"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-16">
          <div>
            <p className="m-0 font-primary text-overline uppercase tracking-overline text-maven-800">Complete pricing</p>
            <h2 className="mb-0 mt-4 font-emphasis text-subheadline-lg font-normal text-text-primary">{title}</h2>
          </div>
          <button
            type="button"
            aria-label="Close pricing details"
            onClick={onClose}
            className="flex size-24 items-center justify-center rounded-full border border-border-disabled bg-surface-primary text-icon-primary"
          >
            <X aria-hidden="true" className="size-12" />
          </button>
        </div>
        {children}
        <div className="flex items-start gap-8 rounded-sm bg-coconut-100 p-12">
          <ShieldCheck aria-hidden="true" className="mt-2 size-16 shrink-0 text-icon-maven" />
          <p className="m-0 font-primary text-legal text-text-secondary">{disclaimer}</p>
        </div>
      </section>
    </div>
  );
}

export function PhoneScreen({ children, selected }: { children: ReactNode; selected: string | null }) {
  return (
    <div className="phone-shell rounded-lg bg-maven-900 p-8 shadow-elevation-overlay">
      <div className="phone-surface relative overflow-hidden rounded-md bg-surface-secondary">
        <ScreenHeader />
        <main className="phone-content overflow-y-auto px-16 py-20">{children}</main>
        <StickyCTA selected={selected} />
      </div>
    </div>
  );
}
