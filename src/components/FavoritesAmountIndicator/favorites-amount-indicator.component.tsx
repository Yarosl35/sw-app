import * as styles from './favorites-amount-indicator.styles';

interface Props {
  label: string;
  value: number;
}

const FavoritesAmountIndicator: React.FC<Props> = ({ label, value }) => {
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
