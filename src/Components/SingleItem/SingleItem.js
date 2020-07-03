import React, {Component} from 'react';
import {Link} from "react-router-dom";
import moment from 'moment';
import GeneralStore from '../../store/GeneralStore';

import './SingleItem.scss';
import * as ActionsGeneral from "../../store/ActionsGeneral";

class singleItem extends Component {
	state = {
		data: {},
	};
	
	getData = () => {
		const data = GeneralStore.results.find(e => e.id == this.props.match.params.id) || {};
		this.setState({data});
	}
	
	componentWillMount = () => {
		if (!this.state.data || !localStorage.email) {
			this.props.history.push('/404');
		}
	}
	
	componentDidMount = () => {
		if (GeneralStore.searchString === '') {
			ActionsGeneral.getResults(localStorage.id);
		}
		this.getData();
		GeneralStore.on('change', this.getData);
	}
	
	componentWillUnmount = () => {
		GeneralStore.removeListener('change', this.getData);
	}
	
	render() {
		const {data} = this.state;
		const {artworkUrl100, previewUrl, id, trackName, artistName, artistViewUrl, trackViewUrl, collectionName, collectionViewUrl, releaseDate} = data;
		const betterPic = artworkUrl100 ? artworkUrl100.replace('100x100', '480x480') : artworkUrl100;
		const fileType = previewUrl ? previewUrl.substr(previewUrl.length - 3) : '';
		return (
			<div className="single-item">
				<img src={betterPic} alt={trackName}/>
				{artistName &&
				<div>
					Artist name -
					{artistViewUrl
						? <a href={artistViewUrl} target={'_blank'}>{artistName}</a>
						: artistName
					}
				</div>
				}
				{trackName &&
				<div>
					Track name -
					{trackViewUrl
						? <a href={trackViewUrl} target={'_blank'}>{trackName}</a>
						: trackName
					}
				</div>
				}
				{collectionName &&
				<div>
					Collection name -
					{collectionViewUrl
						? <a href={collectionViewUrl} target={'_blank'}>{collectionName}</a>
						: collectionName
					}
				</div>
				}
				{releaseDate &&
				<div>
					Release date - {moment(releaseDate).format('DD/MM/YYYY')}
				</div>
				}
				{fileType === 'm4a' &&
				<div>
					<audio controls src={previewUrl}></audio>
				</div>
				}
				{fileType === 'm4v' &&
				<div>
					<video controls src={previewUrl}></video>
				</div>
				}
			</div>
		);
	}
};

export default singleItem;
