import * as styles from './favorites-amount-indicator.styles';

export default function FavoritesAmountIndicator() {
  return (
    <styles.Container>
      <div className="amount-value">
        0
      </div>
      <div className="label">
        Female fans
      </div>
    </styles.Container>
  );
}