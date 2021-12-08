import * as styles from './favorites-amount-indicator.styles';

interface IFavoritesAmountIndicatorProps {
  label: string;
  value: number;
}

const FavoritesAmountIndicator: React.FC<IFavoritesAmountIndicatorProps> = ({ label, value }) => {
  return (
    <styles.Container>
      <div className="amount-value">
        <span role="note" aria-label={label}>{ value }</span>
      </div>
      <div className="label">
        { label }
      </div>
    </styles.Container>
  );
}

export default FavoritesAmountIndicator;
