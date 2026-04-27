import site from "../../content/site.json";

function hasModelConfig() {
  return Boolean(site?.showcase?.model?.src);
}

export default function ShowcasePanel() {
  const model = site?.showcase?.model;

  return (
    <div className="overflow-hidden rounded-2xl border border-stroke bg-surface">
      <div className="flex items-center justify-between border-b border-stroke bg-bg px-5 py-3">
        <div className="text-xs text-muted font-mono">showcase</div>
        <div className="text-xs text-muted font-mono">
          {hasModelConfig() ? "3d" : "static"}
        </div>
      </div>

      <div className="relative p-6">
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] scanlines" />

        {!hasModelConfig() ? (
          <div className="rounded-xl border border-stroke bg-bg p-5">
            <div className="text-xs text-muted font-mono">$ tip</div>
            <div className="mt-3 text-sm leading-relaxed text-fg/80 font-mono">
              Want a 3D model here? Drop a <span className="text-fg">.glb</span>{" "}
              file into <span className="text-fg">public/models</span> and set{" "}
              <span className="text-fg">site.json → showcase.model.src</span>.
            </div>
            <div className="mt-4 text-xs text-muted font-mono">
              (This section stays clean even without 3D.)
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-stroke bg-bg p-2">
            {/* model-viewer is a web component loaded from index.html (optional) */}
            <model-viewer
              src={model.src}
              alt={model.alt || "3D model"}
              camera-controls
              auto-rotate={model.autoRotate ? true : undefined}
              rotation-per-second={model.rotationPerSecond || "20deg"}
              environment-image={model.environmentImage || "neutral"}
              exposure={model.exposure || "1"}
              style={{
                width: "100%",
                height: "320px",
                background: "transparent",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

