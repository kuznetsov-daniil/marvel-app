import './charInfo.scss';
import { Component } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../resources/MarvelService';
import Skeleton from '../skeleton/Skeleton';

class CharInfo extends Component {
    
    state = {
        char: null,
        error: false,
        loading: false,
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onUpdateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.onUpdateChar();
        }
    }

    onUpdateChar = () => {
        const {charId} = this.props

        if (!charId) {
            return;
        }

        this.onCharLoading();

        this.marvelService
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    onCharLoaded = (res) => {
        this.setState({
            char: res,
            loading: false,
        })
    }

    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }
    
    render() {

        const {char, loading, error} = this.state;
        const content = !(error || !char || loading) ? <Content char={char}/> : null;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const skeleton = char || loading || error ? null : <Skeleton/>;


        return (
            <div className="char__info">
                {content}
                {errorMessage}
                {skeleton}
                {spinner}
            </div>
        )
    }
}

const Content = ({char}) => {

    const {name, description, thumbnail, wiki, homepage, comics} = char;

    const comicsAbsent = comics.length === 0 ? 'Комиксов у этого персонажа нет' : null;
    
    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'};
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
                <div className="char__descr">
                    {description}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    
                    {comicsAbsent}

                    {
                        

                        comics.map((item, i) => {
                            if (i >= 10) {
                                return;
                            }
                            return (
                                <li className="char__comics-item" key={i}>
                                    {item.name}
                                </li>
                            )
                        })
                    }
                </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;