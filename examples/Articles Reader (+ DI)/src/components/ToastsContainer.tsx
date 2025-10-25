/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */
/** biome-ignore-all lint/style/noMagicNumbers: <explanation> */
import { SnackService, type TToast } from "@services";
import { observer } from "mobx-react";
import { type FC, useEffect, useState } from "react";
import { container } from "tsyringe";

const service = container.resolve(SnackService);

export const Toast: FC<{ data: TToast }> = ({ data }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    setTimeout(() => setVisible(false), 2000);
  }, [data]);

  return (
    <div
      className="toast"
      onTransitionEnd={() => !visible && service.data.shift()}
      style={{ opacity: visible ? 1 : 0 }}
    >
      {data.text}
    </div>
  );
};

export const ToastsContainer = observer(() => (
  <>{!!service.data.length && <Toast data={service.data[0]} />}</>
));
