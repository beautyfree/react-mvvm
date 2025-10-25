import { HBox, VBox } from "@components";
import type { ArticlesService, TArticle } from "@services";
import { computed } from "mobx";
import { childView, ViewModel, view } from "react-mvvm";
import { injectable } from "tsyringe";
import type { AppViewModel } from "./App";

type ArticleProps = {
  data: TArticle;
};

@injectable()
class ArticlesViewModel extends ViewModel<AppViewModel, ArticleProps> {
  @computed get read(): boolean {
    return this.articlesService.readIds.has(this.viewProps?.data.id);
  }

  constructor(public articlesService: ArticlesService) {
    super();
  }

  onRead = () => this.articlesService.read(this.viewProps.data);
}

const Article = view(ArticlesViewModel)<ArticleProps>(({ viewModel, data }) => (
  <VBox
    cls={`article ${viewModel.read ? "read" : ""}`}
    justify="space-between"
    key={Math.random()}
  >
    <h2 className="article__title">{data.title}</h2>
    <button className="article__btn" onClick={viewModel.onRead}>
      Read
    </button>
  </VBox>
));

export const Articles = childView<AppViewModel>()(({ viewModel }) => (
  <HBox cls="articles" wrap>
    {viewModel.data.map((it) => (
      <Article data={it} key={it.id} />
    ))}
  </HBox>
));
