export interface SearchRequestModel {
  context: {
    locale: {
      country: string;
      language: string;
    };
  };
  widget: {
    items: WidgetRequest[];
  };
}

interface WidgetRequest {
  entity: string;
  rfk_id: string;
  search: {
    content: object;
    offset: number;
    limit: number;
    query?: {
      keyphrase: string;
    };
  };
}
