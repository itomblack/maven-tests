import { useState, type ComponentType } from "react";
import { annotations } from "./data";
import type { SelectionProps } from "./types";
import { PhoneScreen, cn } from "./components/Shared";
import { CurrentDesign } from "./concepts/CurrentDesign";
import { CostFirst } from "./concepts/CostFirst";
import { MinimalPricing } from "./concepts/MinimalPricing";
import { FormatFirst } from "./concepts/FormatFirst";
import { CostTimeline } from "./concepts/CostTimeline";
import { CommitmentPreview } from "./concepts/CommitmentPreview";
import { ComparisonTable } from "./concepts/ComparisonTable";
import { PriceAccordion } from "./concepts/PriceAccordion";
import { ConfidenceLed } from "./concepts/ConfidenceLed";
import { CostCalculator } from "./concepts/CostCalculator";
import { Transparency } from "./concepts/Transparency";

const views: ComponentType<SelectionProps>[] = [
  CurrentDesign,
  CostFirst,
  MinimalPricing,
  FormatFirst,
  CostTimeline,
  CommitmentPreview,
  ComparisonTable,
  PriceAccordion,
  ConfidenceLed,
  CostCalculator,
  Transparency,
];

export function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selections, setSelections] = useState<Record<number, string | null>>({});
  const ActiveView = views[activeIndex];
  const activeAnnotation = annotations[activeIndex];
  const selected = selections[activeIndex] ?? null;

  return (
    <div className="gallery-shell bg-surface-secondary">
      <header className="concept-switcher border-b border-border-disabled bg-surface-primary">
        <div className="mx-auto grid max-w-screen-xl gap-12 px-16 py-12">
          <div className="flex flex-wrap items-baseline justify-between gap-8">
            <div>
              <p className="m-0 font-primary text-overline uppercase tracking-overline text-maven-800">Maven design exploration</p>
              <h1 className="m-0 font-emphasis text-subheadline-lg font-normal text-text-primary">
                GLP-1 price transparency concepts
              </h1>
            </div>
            <p className="m-0 font-primary text-body-sm text-text-secondary">11 mobile views · 390px preview</p>
          </div>
          <nav className="concept-tabs flex gap-8 overflow-x-auto pb-4" aria-label="Concept switcher">
            {annotations.map((annotation, index) => (
              <button
                key={annotation.label}
                type="button"
                aria-current={activeIndex === index ? "page" : undefined}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "shrink-0 rounded-full border px-12 py-8 font-primary text-body-sm transition",
                  activeIndex === index
                    ? "border-border-brand bg-fill-button-primary text-text-primary-inverse"
                    : "border-border-disabled bg-surface-primary text-text-secondary hover:border-border-brand hover:text-text-link-primary",
                )}
              >
                {annotation.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto grid max-w-screen-xl items-start justify-center gap-24 px-16 py-24 lg:grid-cols-[390px_minmax(0,420px)]">
        <section aria-label={`${activeAnnotation.label} mobile preview`}>
          <PhoneScreen selected={selected}>
            <ActiveView
              selected={selected}
              onSelect={(id) => setSelections((current) => ({ ...current, [activeIndex]: id }))}
            />
          </PhoneScreen>
        </section>

        <aside className="sticky top-24 grid gap-20 rounded-lg border border-border-disabled bg-surface-primary p-24 shadow-elevation-overlay">
          <div>
            <p className="m-0 font-primary text-overline uppercase tracking-overline text-maven-800">
              {activeAnnotation.label}
            </p>
            <h2 className="mb-8 mt-4 font-emphasis text-headline-lg font-normal text-text-primary">
              {activeAnnotation.name}
            </h2>
            <p className="m-0 font-primary text-body-sm text-text-secondary">
              Switch concepts above; selection and detail states stay independent within each view.
            </p>
          </div>
          <dl className="m-0 grid gap-16">
            {[
              ["Psychological technique", activeAnnotation.technique],
              ["Main hypothesis", activeAnnotation.hypothesis],
              ["Key trade-off", activeAnnotation.risk],
              ["What to test", activeAnnotation.metric],
            ].map(([label, value]) => (
              <div key={label} className="grid gap-4 border-t border-border-disabled pt-16">
                <dt className="font-primary text-overline uppercase tracking-overline text-text-secondary">{label}</dt>
                <dd className="m-0 font-primary text-body-default text-text-primary">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="rounded-md bg-maven-25 p-16">
            <p className="m-0 font-primary text-body-sm text-text-secondary">
              All prices are illustrative. Medication selection remains subject to clinician review.
            </p>
          </div>
        </aside>
      </main>
    </div>
  );
}
