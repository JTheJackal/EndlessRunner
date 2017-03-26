/**
 * Created by Adam on 23/03/2017.
 */
var Button = function(x,y,normalImgID,hoverImgID,onClickFunc){
    this.x = x;
    this.y = y;
    this.normImg = normalImgID;
    this.hoverIMG = hoverImgID;
    this.onClickFunc = onClickFunc;
    this.img = null;
    
    this.switchToNorm = function(){
        if(this.img!=null) {
            this.img.kill();
        }
        this.img = game.add.image(this.x,this.y,this.normImg);
        this.img.anchor.setTo(0.5);
        this.img.inputEnabled = true;
        this.img.events.onInputOver.add(this.switchToHover,this);
        this.img.events.onInputDown.add(this.onClickFunc,this);

    };
    
    this.switchToHover=function(){
        if(this.img!=null) {
            this.img.kill();
        }
        this.img = game.add.image(this.x,this.y,this.hoverIMG);
        this.img.anchor.setTo(0.5);
        this.img.inputEnabled = true;
        this.img.events.onInputOut.add(this.switchToNorm,this);
        this.img.events.onInputDown.add(this.onClickFunc,this);
    };

    this.switchToNorm();
};