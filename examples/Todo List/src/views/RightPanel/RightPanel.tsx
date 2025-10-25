import { VBox } from "@components";
import { memo, type VFC } from "react";
import { ChosenItem } from "./ChosenItem";
import { NewTodoField } from "./NewTodoField";

export const RightPanel: VFC<{ onAdd: (title: string) => void }> = memo(
  ({ onAdd }) => (
    <VBox>
      <NewTodoField onAdd={onAdd} />
      <ChosenItem />
    </VBox>
  )
);
