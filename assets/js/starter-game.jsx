import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

export default function game_init(root) {
  ReactDOM.render(<Starter />, root);
}

class Starter extends React.Component {
    constructor(props) {
       super(props);
       this.state = {
         
         tilesObj: this.createValues(),
         tilesLeft:16,
         clickAllow: true,
         numClicks: 0,
         match: false,
         currentTitleID: -1,
   
       
       };
   
     }

//////////////
//      	//create tile values on the board.

 createValues(){
   let setValue1 = ['A','B','C','D','E','F','G','H','A','B','C','D','E','F','G','H'];
   let retArr = [];
   while(setValue1.length > 0){
    //get random value
    let getrand= setValue1[Math.floor(Math.random()*setValue1.length)];
  
 // remove the ramdomed value from the value list
    setValue1.splice(setValue1.indexOf(getrand), 1);
 
 // push value to the tile obj
   retArr.push({
          value : getrand,
          visible:false,
          complete: false
  
        });
 
 }
 return retArr;
}


   
       // Handles not matching case 
       ifNotMatching(i) {
           let t = this.state.tilesObj.slice();
   
           t[i].visible = false;
           t[this.state.currentTitleID].visible = false;
   
           window.setTimeout(() => {
               this.setState({
                   tilesObj: t,
                   clickAllow: true,
                   match: false,
                   currentTitleID: -1
               });
           }, 1200);
       }
   
   
       // Handle the clicks
       handleClick(i) {
           // Clicks is allowed and the chosed tile is not visible
           if (this.state.clickAllow && !this.state.tilesObj[i].visible && !this.state.tilesObj[i].complete) {
   
               // to render the open tile
               let temp = this.state.tilesObj.slice();
               temp[i].visible = true;
    
               this.setState({
                   tilesObj: temp,
                   numClicks: this.state.numClicks + 1,
               });
   
               // This is the guessing process
               if (this.state.match) {
   
                   // not allow click after the second tile is selected
                   this.setState({
                       clickAllow: false
                   });
                                   
                   // Successful matching
                   if (this.state.tilesObj[i].value === this.state.tilesObj[this.state.currentTitleID].value) {
                       
                       let tem = this.state.tilesObj.slice();
   
                       tem[i].complete = true;
                       tem[this.state.currentTitleID].complete = true;
   
                       window.setTimeout(() => {
                           this.setState({
                               tilesObj: tem,
                               tilesLeft: this.state.tilesLeft - 2,
                               clickAllow: true,
                               match: false,
                               currentTitleID: -1
                           });
                       }, 1200);
                   }
   
                   // Failed matching
                   else {
   
                       this.setState({
                           tilesObj: temp,
                           numClicks: this.state.numClicks + 1,
                       }, () => this.ifNotMatching(i));
                   }
               }
               else {
                   // first tile was selected
                   this.setState({
                       match: true,
                       currentTitleID: i
                   });
               }    
           }
       }
   
       // Handles the reset
       restart() {
           this.setState({
               tilesObj: this.createValues(),
               tilesLeft: 16,
               clickAllow: true,
               numClicks: 0,
               match: false,
               currentTitleID: -1
           });
       }
   
       // Renders a Tile
       renderTile(i) {
           return (
               <Tile
                   value = {this.state.tilesObj[i].value}
                   onClick = {this.handleClick.bind(this, i)}
                   visible = {this.state.tilesObj[i].visible}
               />
           );
       }
       
       // Renders the web
       render() {
   
           var status;
           var i = 0;
   
           if (this.state.tilesLeft > 0) {
               status = this.state.numClicks;
           }
           else {
               status = "Good job!";
           }
   
           return (
               <div>
                   
   
                   <button className="restart" onClick={() => this.restart()}>Restart</button>
                   <div className="row">
                       {this.renderTile(i++)}
                       {this.renderTile(i++)}
                       {this.renderTile(i++)}
                       {this.renderTile(i++)}
                   </div>
                   <div className="row">
                       {this.renderTile(i++)}
                       {this.renderTile(i++)}
                       {this.renderTile(i++)}
                       {this.renderTile(i++)}
                   </div>
                   <div className="row">
                       {this.renderTile(i++)}
                       {this.renderTile(i++)}
                       {this.renderTile(i++)}
                       {this.renderTile(i++)}
                   </div>
                   <div className="row">
                       {this.renderTile(i++)}
                       {this.renderTile(i++)}
                       {this.renderTile(i++)}
                       {this.renderTile(i++)}
                   </div>
               <div className="status"> Clicks:  {status} </div>
               </div>
           );
       }
   }
   
   
   // Represents a tile on the board
   function Tile(props) {
       let display = '';
   
       if (props.visible) {
           display = props.value;
       }
       return (
           <button className="tile" onClick={props.onClick}>
               {display}
           </button>
       );
   }