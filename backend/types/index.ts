interface iData {
  _id: string;
  title: string;
  value: number;
  createdAt: string;
  updatedAt: string;
  type: string;
}

export interface iRequestQuery {
  query: {
    startDate: string;
    endDate: string;
    page?: number;
    limit?: number;
  };
}
