import {connect} from 'react-redux';
import {onPrev, onNext, onLoad} from '../modules/list';
import {onSaveToFavourite, onRemoveFromFavourite} from '../modules/favourite';
import List from '../components/ListView';

const mapDispatchToProps = {
  onPrev,
  onNext,
  onLoad,
  onSaveToFavourite,
  onRemoveFromFavourite,
};

const mapStateToProps = ({list, favourites}) => ({
  list,
  favourites,
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
