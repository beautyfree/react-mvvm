import { HBox } from "@components";
import type { VFC } from "react";

export const SearchTodoField: VFC<{
  value: string;
  onChange: (title: string) => void;
}> = ({ value, onChange }) => (
  <HBox>
    <input
      className="search-field"
      onChange={(evt) => onChange(evt.target.value)}
      placeholder="Search"
      value={value}
    />
  </HBox>
);
