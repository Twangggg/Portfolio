import site from "../../content/site.json";

export default function ShowcasePanel() {
  const model = site?.showcase?.model;

  return (
    <div className="overflow-hidden rounded-xl border border-stroke bg-surface w-fit">
      <model-viewer
        src={model?.src}
        alt={model?.alt || "3D model"}
        auto-rotate
        rotation-per-second={model?.rotationPerSecond || "20deg"}
        environment-image={model?.environmentImage || "neutral"}
        exposure={model?.exposure || "1"}
        style={{
          width: "64px",
          height: "64px",
          background: "transparent",
        }}
      />
    </div>
  );
}

