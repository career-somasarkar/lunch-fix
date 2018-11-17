import React from 'react';
import './VenueSearch.css';

class VenueSearch extends React.Component{
    constructor(props){
        super(props);
        this.state={
            searchVal:'',
            results:[],
            participants:[]
        }
    this.searchVenue = this.searchVenue.bind(this);
    }
    updateVote(e){
        var venueId= e.target.id;
        var url="https://api.foursquare.com/v2/venues/${venueId}/select";
        url = url.replace("${venueId}", venueId);
        fetch(url,{
            method:'POST'})
        .then(res=>res.json())
        .then(data=>{console.log(data)})
        .catch(err=>console.log(err));
    }
    updateParticipantName(e){    
        this.state.participants.map(p=>{
            if(p.id===e.target.id)
            {
                p.name = e.target.value;
            }
        })
    }
    addParticipantName(e)
    {
        console.log(e);
        this.setState({
            participants:this.state.participants.concat({name:'', id:new Date().getTime()})
        });
    }
    updateText(e){
        this.setState(
            {
                searchVal:e.target.value
            }
        );
    }
    searchVenue(e){
        console.log(this.state.searchVal);
        var url="https://api.foursquare.com/v2/venues/search?client_id=clientId&client_secret=clientSecret&query=lunch&near=${address}&v=20170801&limit=3";
        var clientId ="3G5E5H3GPVY2IXL1B4EENQTFW5RODMD4135TKVUFPZ2KNX01";
        var clientSecret="M2EEIPEKYR003LENJOFC4OLIBWBIHB3TMDCPBA1ZUJQLPW20";
        url = url.replace("clientId", clientId).replace("clientSecret",clientSecret).replace("${address}",this.state.searchVal);
        fetch(url)
        .then(res=>res.json())
        .then(data=>{this.setState({results:data.response.venues});return data;})
        .then(data=>{console.log(data)})
        .catch(error=>{console.error(error)}); 
    }
    render(){
        return(
            <div className="rootDiv">
                <div>
                    <h1 className="head">Lunch Place</h1>
                </div>
                <div  className="row">
                    <div  className="col1"><input type="text" id="txtSearch" onChange={e=>this.updateText(e)}></input></div>
                    <div  className="col2"><input type="button" value="Search" id="btnSearch" onClick={this.searchVenue}></input></div>
                </div>
                <div>                    
                    <table>
                        <thead>
                            <tr>
                                <th className="participant firstCol">Participants</th>
                                {
                                    this.state.results.map(row=>
                                        <th key={row.id}><div><a href="#">{row.name}</a></div><div>
                                            <span className="participant firstCol">{row.categories[0].name}</span>
                                            </div></th>
                                    )
                                }
                            </tr>
                        </thead>                                     
                        <tbody>  
                            {
                                this.state.participants.map(row=>
                                    <tr className="tableDataRow" key={row.id}>
                                        <td className="firstCol"><input type="text" id={row.id} onChange={e=>this.updateParticipantName}></input></td>
                                        <td className="otherCol"><input type="radio" name={row.id} id={this.state.results[0].id} onChange={e=>this.updateVote(e)}></input></td>
                                        <td className="otherCol"><input type="radio" name={row.id} id={this.state.results[1].id} onChange={e=>this.updateVote(e)}></input></td>
                                        <td className="otherCol"><input type="radio" name={row.id} id={this.state.results[2].id} onChange={e=>this.updateVote(e)}></input></td>                                           
                                    </tr>
                                )
                            }                                
                        </tbody>
                    </table>
                </div>
                <div>
                    <input type="button" value="Add Participant" onClick={e=>this.addParticipantName(e)}></input>
                </div>
            </div>
        );}
}

export default VenueSearch;