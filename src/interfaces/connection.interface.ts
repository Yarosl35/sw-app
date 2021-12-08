import IEdge from './edge.interface';
import IPageInfo from './page-info.interface';

export default interface IConnection {
  edges: IEdge[];
  pageInfo?: IPageInfo;
  totalCount?: number;
};