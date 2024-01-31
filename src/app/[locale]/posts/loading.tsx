import {faSpinnerThird} from '@fortawesome/pro-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import styles from '@/styles/styles.module.css'

export const NotionPageLoading: React.FC = () => (
  <div className={styles.container}>
    <FontAwesomeIcon icon={faSpinnerThird} />
  </div>
)
