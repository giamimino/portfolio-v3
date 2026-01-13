import { Dispatch, SetStateAction } from "react";

const filters: {
  id: string;
  label: string;
  type: "type" | "category" | "languages";
}[] = [
  { id: "client", label: "Client", type: "type" },
  { id: "personal", label: "Personal", type: "type" },
  { id: "team", label: "Team / Collaboration", type: "type" },
];

export const FilterItem = ({
  handleFilterToggle,
  active,
  f,
}: {
  handleFilterToggle: (f: {
    filter: string;
    type: "type" | "category" | "languages";
  }) => void;
  active: boolean;
  f: { id: string; label: string; type: "type" | "category" | "languages" };
}) => {
  const handleToggle = () => {
    handleFilterToggle({ filter: f.id, type: f.type });
  };
  return (
    <div className="flex gap-2.5 items-center">
      <div
        className={`p-0.5 w-3.5 h-3.5 ${
          active ? "bg-green-600" : "bg-grey-20"
        } transition-all duration-500 rounded-sm cursor-pointer relative overflow-hidden`}
        onClick={handleToggle}
      ></div>
      <button
        className="text-blue-50 font-medium cursor-pointer"
        onClick={handleToggle}
      >
        {f.label}
      </button>
    </div>
  );
};

export const FilterWrapper = ({
  additionalFilters,
  filter,
  onChange,
}: {
  additionalFilters?: {
    id: string;
    label: string;
    type: "type" | "category" | "languages";
  }[];
  onChange: Dispatch<
    SetStateAction<{ filter: string; type: "type" | "category" | "languages" }[]>
  >;
  filter: { filter: string; type: "type" | "category" | "languages" }[];
}) => {
  const handleFilterToggle = (f: {
    filter: string;
    type: "type" | "category" | "languages";
  }) => {
    onChange((prev) =>
      prev.some((fl) => fl.filter === f.filter)
        ? prev.filter((pf) => pf.filter !== f.filter)
        : prev.some((fl) => fl.type === "type")
        ? prev.map((fl) => (fl.type === "type" ? f : fl))
        : [...(prev ?? []), f]
    );
  };

  return (
    <div className="mt-2">
      {[...(filters ?? []), ...(additionalFilters ?? [])].map((f) => (
        <FilterItem
          key={f.id}
          f={f}
          active={filter.some((fl) => fl.filter === f.id)}
          handleFilterToggle={handleFilterToggle}
        />
      ))}
    </div>
  );
};
