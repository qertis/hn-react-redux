import React from 'react';
import {Link} from 'react-router';
import PropTypes from 'prop-types';

const _computeNextPage = (page) => (Number.parseInt(page || 1) + 1);

const _computePrevPage = (page) => ((Number.parseInt(page || 2) - 1) || 1);

const _computeIndex = (pageSize, page, index) => (pageSize * (page - 1) + index + 1);

class ListView extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.list.page = Number(this.props.params.id);
    this.props.onLoad();
  }

  render() {
    const {
      list,
      favourites,
      onPrev,
      onNext,
      onSaveToFavourite,
      onRemoveFromFavourite,
      pageSlice = 10,
    } = this.props;

    return (
      <div className="selectedView">
        <ul>
          {list.list.map((item, index) => {
            return (<li key={index}>
              <span className="index">{_computeIndex(pageSlice, list.page, index)}</span>
              <div className="title">
                <a href={item.url}>{item.title}</a>
                <span className="domain">({item.domain})</span>
                <div className="info">{`${item.points} points by ${item.user} ${item.time_ago}`}</div>
              </div>
              <div className="star-container">
                {
                  favourites.find(elem => elem.id === item.id)
                    ? <button className="star"
                              onClick={onRemoveFromFavourite.bind(this, item)}>★</button>
                    : <button className="star"
                              onClick={onSaveToFavourite.bind(this, item)}>☆</button>
                }
              </div>
            </li>);
          })}
        </ul>

        <div className="forwardback">
          <Link to={`/news/${_computePrevPage(list.page)}`}
                activeClassName='prev'
                onClick={onPrev}
                aria-label='Previous Page'>◀ Previous</Link>

          <span>{`Page ${list.page}`}</span>

          <Link to={`/news/${_computeNextPage(list.page)}`}
                activeClassName="next"
                onClick={onNext}
                aria-label="Next Page">Next ▶</Link>
        </div>

      </div>
    )
  }
}

ListView.propTypes = {
  list: PropTypes.object.isRequired,
  favourites: PropTypes.array.isRequired,
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onLoad: PropTypes.func.isRequired,
  onSaveToFavourite: PropTypes.func.isRequired,
  onRemoveFromFavourite: PropTypes.func.isRequired,
  pageSlice: PropTypes.number,
};

export default ListView;
