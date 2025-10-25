import { action, autorun, observable } from "mobx";
import { singleton } from "tsyringe";
import type { SnackService } from "./SnackService";

export type TArticle = {
  id: string;
  title: string;
};

/**
 * Every Service is supposed to be a singleton class.
 */
@singleton()
export class ArticlesService {
  @observable readCount = 0;

  @observable collectStatistics = true;

  @observable.shallow readIds = new Set<string>();

  private readonly snackService: SnackService;

  constructor(snackService: SnackService) {
    this.snackService = snackService;

    autorun(() => {
      if (this.readIds.size > 0 && this.readIds.size % 10 === 0) {
        this.snackService.make(
          `You've already read ${this.readIds.size} different articles.`
        );
      }
    });

    autorun(() => {
      if (this.readCount > 0 && this.readCount % 10 === 0) {
        this.snackService.make(
          `You've already pressed "Read" button ${this.readCount} times.`
        );
      }
    });
  }

  @action read = (article: TArticle): void => {
    if (!this.readIds.has(article.id)) {
      this.snackService.make(`You've read an article "${article.title}"`);
    }
    if (!this.collectStatistics) {
      return;
    }
    this.readCount++;
    this.readIds.add(article.id);
  };
}
