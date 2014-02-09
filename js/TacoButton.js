/**
 * Created by evans mobile on 2/8/14.
 */
function TacoButton(spriteImage, spriteImage2, text) {

    this.sprite = spriteImage;
    this.text = text;
    this.positionX = 0;
    this.positionY = 0;
    this.width = spriteImage.width;
    this.height = spriteImage.height;
    if (this.text.length >= 8) {
        this.offset = (this.text.length - 8) * 5;
    } else {
        this.offset = (this.text.length + 8) * 5;
    }


    this.setPosition = function (pos, posY) {
        this.positionX = pos;
        this.positionY = posY;
    };

    this.inBounds = function (x, y) {
        return (x >= this.positionX) && (x <= this.positionX + this.width) && (y >= this.positionY) && (y <= this.positionY + this.height);
    };


    this.handleClicked = function (bool) {
        if (bool) {
            this.sprite = spriteImage2;
        } else {
            this.sprite = spriteImage;
        }
    };

    this.draw = function (g) {
        g.fillStyle = "rgb(0, 0, 0)";
        g.font = "40px Calibri";
        g.textAlign = "left";
        g.textBaseline = "top";

        g.drawImage( this.sprite, this.positionX, this.positionY );
        g.fillText(this.text, (this.positionX + this.offset), this.positionY + 20);
    };
}