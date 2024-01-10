export interface SearchRequestModel {
  context: {
    page: {
      uri: string;
    };
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
    content: string;
    query: {
      keyphrase: string;
    };
  };
}
