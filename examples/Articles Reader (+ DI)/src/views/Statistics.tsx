import { HBox, VBox } from "@components";
import type { ArticlesService } from "@services";
import { action } from "mobx";
import type { FC } from "react";
import { ViewModel, view } from "react-mvvm";
import { injectable } from "tsyringe";
import type { AppViewModel } from "./App";

@injectable()
class StatisticsViewModel extends ViewModel<AppViewModel> {
  constructor(public readonly service: ArticlesService) {
    super();
  }

  @action onCheckChange = () => {
    this.service.collectStatistics = !this.service.collectStatistics;
  };

  onCreateExtra = () => this.parent.createExtraArticle();
}

const Item: FC<{ title: string; value: string | number }> = ({
  title,
  value,
}) => (
  <HBox cls="statistics__item">
    <div className="statistics__item_title">{title}:</div>
    <div className="statistics__item_value">{value}</div>
  </HBox>
);

export const Statistics = view(StatisticsViewModel)(({ viewModel }) => (
  <VBox cls="statistics">
    <h2 className="statistics__title">Statistics</h2>
    <Item
      title="Amount of read articles"
      value={viewModel.service.readIds.size}
    />
    <Item title="Amount of readings" value={viewModel.service.readCount} />
    <label style={{ marginTop: 8 }}>
      <input
        checked={viewModel.service.collectStatistics}
        onChange={viewModel.onCheckChange}
        type="checkbox"
      />
      Collect statistics
    </label>

    <button onClick={viewModel.onCreateExtra} style={{ marginTop: 24 }}>
      Create extra article
    </button>
  </VBox>
));
