import { VBox } from "@components";
import { memo, useState } from "react";
import { List } from "./List";
import { SearchTodoField } from "./SearchTodoField";

/**
 * LeftPanel is a plain functional component, which controls the state of the search string.
 */
export const LeftPanel = memo(() => {
  const [searchText, setSearchText] = useState("");

  return (
    <VBox style={{ marginRight: 10 }}>
      <SearchTodoField onChange={setSearchText} value={searchText} />
      <List searchText={searchText} />
    </VBox>
  );
});
