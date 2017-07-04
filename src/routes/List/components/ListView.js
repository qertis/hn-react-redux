import React from 'react';
import {Link} from 'react-router';
import PropTypes from 'prop-types';

const _computeNextPage = page => (Number.parseInt(page || 1) + 1);

const _computePrevPage = page => ((Number.parseInt(page || 2) - 1) || 1);

const _computeIndex = (pageSize, page, index) => (pageSize * (page - 1) + index + 1);

class ListView extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.list.page = Number(this.props.params.id);
    this.props.initNews();
  }

  onSaveToFavourite(item) {
    return this.props.saveToFavourite.bind(this, item);
  }

  onRemoveFromFavourite(item) {
    return this.props.removeFromFavourite.bind(this, item);
  }

  render() {
    const {
      list,
      favourites,
      nextNews,
      prevNews,
      pageSlice = 10,
    } = this.props;

    return (
      <div className='selectedView'>
        <ul>
          {list.list.map((item, index) => {
            return (<li key={index}>
              <span className='index'>{_computeIndex(pageSlice, list.page, index)}</span>
              <div className='title'>
                <a href={item.url}>{item.title}</a>
                <span className='domain'>({item.domain})</span>
                <div className='info'>{`${item.points} points by ${item.user} ${item.time_ago}`}</div>
              </div>
              <div className='star-container'>
                {
                  favourites.find(elem => elem.id === item.id)
                    ? <button className='star' onClick={this.onRemoveFromFavourite(item)}>★</button>
                    : <button className='star' onClick={this.onSaveToFavourite(item)}>☆</button>
                }
              </div>
            </li>);
          })}
        </ul>

        <div className='forwardback'>
          <Link to={`/news/${_computePrevPage(list.page)}`} activeClassName='prev' onClick={prevNews}>
            ◀ Previous
          </Link>

          <span>{`Page ${list.page}`}</span>

          <Link to={`/news/${_computeNextPage(list.page)}`} activeClassName='next' onClick={nextNews}>
            Next ▶
          </Link>
        </div>

      </div>
    );
  }
}
ListView.propTypes = {
  params: PropTypes.object.isRequired,
  list: PropTypes.object.isRequired,
  favourites: PropTypes.array.isRequired,
  prevNews: PropTypes.func.isRequired,
  nextNews: PropTypes.func.isRequired,
  initNews: PropTypes.func.isRequired,
  saveToFavourite: PropTypes.func.isRequired,
  removeFromFavourite: PropTypes.func.isRequired,
  pageSlice: PropTypes.number,
};

export default ListView;
