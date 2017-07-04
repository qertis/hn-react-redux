import {connect} from 'react-redux';
import {prevNews, nextNews, initNews} from '../modules/list';
import {saveToFavourite, removeFromFavourite} from '../modules/favourite';
import ListView from '../components/ListView';

const mapDispatchToProps = {
  prevNews,
  nextNews,
  initNews,
  saveToFavourite,
  removeFromFavourite,
};

const mapStateToProps = ({list, favourites}) => ({
  list,
  favourites,
});

export default connect(mapStateToProps, mapDispatchToProps)(ListView);
